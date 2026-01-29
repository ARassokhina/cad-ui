<template>
  <ul class="file-tree">
    <!-- Используем либо пропсы (для рекурсии), либо локальные данные (для корня) -->
    <li v-for="node in displayNodes" :key="node.id" class="tree-node">
      <div class="node-content" @click="toggle(node)">
        <span class="icon">
           <template v-if="node.type === 'folder'">
             {{ node.isOpen ? '📂' : '📁' }}
             <span v-if="node.isReference" title="Reference Folder">🔗</span>
           </template>
           <template v-else-if="node.type === 'page'">📄</template>
           <template v-else>📦</template>
        </span>
        <span class="node-name" :class="{ reference: node.isReference }">
          {{ node.name }}
        </span>
      </div>

      <div v-if="node.isOpen && node.type === 'folder'" class="children">
        <div v-if="node.loading" class="loading">Loading...</div>

        <!-- Рекурсивный вызов: передаем детей в проп nodes -->
        <file-tree
            v-if="node.children && node.children.length"
            :nodes="node.children"
            @open-file="$emit('open-file', $event)"
        />

        <div v-if="node.hasMore" class="load-more" @click.stop="loadMore(node)">
          Show more...
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
// Импортируем API-сервис
import api from '@/services/api';

export default {
  // Имя компонента обязательно для рекурсии
  name: 'FileTree',

  props: {
    parentId: {
      type: [String, Number],
      default: null
    },
    contextId: {
      type: String,
      default: ''
    },
    // Если передан массив, используем его (для вложенных веток)
    nodes: {
      type: Array,
      default: () => []
    }
  },

  emits: ['open-file'],

  data() {
    return {
      // Локальный стейт для хранения загруженных данных на корневом уровне
      localNodes: []
    };
  },

  computed: {
    // Определяем, какие данные отображать: пришедшие сверху или загруженные локально
    displayNodes() {
      return this.nodes.length > 0 ? this.nodes : this.localNodes;
    }
  },

  methods: {
    async loadNodes(parentId, page = 1) {
      try {
        console.log(parentId)
        // Пример вызова API для корневого уровня
        const res = await api.getChildren(parentId, { page });
        this.localNodes = res.items;
      } catch (error) {
        console.error("Failed to load root nodes:", error);
      }
    },

    async toggle(node) {
      if (node.type === 'folder') {
        // Инвертируем состояние открытия
        node.isOpen = !node.isOpen;

        // Если папка открыта и дети еще не загружены
        if (node.isOpen && !node.children) {
          node.loading = true;
          try {
            const res = await api.getChildren(node.id, { page: 1 });

            // В Vue 3 реактивность работает напрямую при добавлении свойств,
            // если объект 'node' уже реактивен (был в массиве items)
            node.children = res.items;
            node.nextPage = res.meta.nextPage;
            node.hasMore = res.meta.hasMore;
          } catch (error) {
            console.error("Error loading children:", error);
          } finally {
            node.loading = false;
          }
        }
      } else {
        // Это файл - эмитим событие наверх (к родителю или MainLayout)
        this.$emit('open-file', node);
      }
    },

    async loadMore(node) {
      if (node.loading) return;

      node.loading = true;
      try {
        const res = await api.getChildren(node.id, { page: node.nextPage });

        // Добавляем новые элементы в существующий массив
        node.children.push(...res.items);
        node.nextPage = res.meta.nextPage;
        node.hasMore = res.meta.hasMore;
      } catch (error) {
        console.error("Error loading more items:", error);
      } finally {
        node.loading = false;
      }
    }
  },

  created() {
    // Если компонент является корнем (nodes пустые), инициируем загрузку
    if (this.nodes.length === 0 && this.parentId) {
      this.loadNodes(this.parentId);
    }
  }
};
</script>

<style scoped>
.file-tree { list-style: none; padding-left: 10px; margin: 0; }
.node-content { cursor: pointer; padding: 4px 0; display: flex; align-items: center; }
.node-content:hover { background: rgba(255,255,255,0.1); }
.children { padding-left: 15px; border-left: 1px solid #555; }
.reference { color: #aaa; font-style: italic; }
.load-more { cursor: pointer; color: #3498db; font-size: 0.9em; padding: 5px; }
.loading { font-size: 0.8em; color: #888; padding: 5px; }
</style>
