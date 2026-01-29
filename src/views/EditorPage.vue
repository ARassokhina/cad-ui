<template>
  <div class="editor-page">
    <!-- Здесь можно дополнительно показывать название файла, varId и т.п. -->
    <header class="editor-header">
      <h2>Page: {{ page?.name || fileId }}</h2>
      <span class="tool-label">
        Current tool:
        {{ toolLabel }}
      </span>
    </header>

    <section v-if="isLoading" class="loading">
      Loading page...
    </section>

    <section v-else-if="page" class="tool-container">
      <!-- Переключатель инструментов по текущему :tool -->
      <component
          :is="currentToolComponent"
          :page="page"
          :variables="variables"
          @update-page="handleUpdatePage"
          @update-variables="handleUpdateVariables"
      />
    </section>

    <section v-else class="error">
      Failed to load page.
    </section>
  </div>
</template>

<script>
import api from '@/services/api';

// Инструменты (компоненты ниже)
import EditorTool from '@/components/tools/EditorTool.vue';
import DebugTool from '@/components/tools/DebugTool.vue';
import ModelingTool from '@/components/tools/ModelingTool.vue';

export default {
  name: 'EditorPage',
  props: {
    branch: {
      type: String,
      required: true
    },
    contextId: {
      type: String,
      required: true
    },
    fileId: {
      type: String,
      required: true
    },
    tool: {
      type: String,
      default: 'fp'
    }
  },
  data() {
    return {
      page: null,       // структура страницы (блоки, связи и т.п.)
      variables: {},    // значения varId по этой странице
      isLoading: false
    };
  },
  computed: {
    currentToolComponent() {
      switch (this.tool) {
        case 'debug':
          return DebugTool;
        case 'model':
          return ModelingTool;
        case 'fp':
        default:
          return EditorTool;
      }
    },
    toolLabel() {
      switch (this.tool) {
        case 'debug':
          return 'Debug';
        case 'model':
          return 'Modeling';
        case 'fp':
        default:
          return 'FP Editor';
      }
    }
  },
  watch: {
    fileId: {
      immediate: true,
      handler() {
        this.loadPage();
      }
    }
  },
  methods: {
    async loadPage() {
      this.isLoading = true;
      try {
        // Пример API‑вызова: грузим структуру страницы и начальные значения переменных
        const res = await api.getFile(this.contextId, this.fileId);
        this.page = res.page;            // blocks, connections, meta
        this.variables = res.variables || {};
      } catch (e) {
        console.error('Failed to load page', e);
        this.page = null;
      } finally {
        this.isLoading = false;
      }
    },
    handleUpdatePage(newPage) {
      // Обновляем локальный стейт страницы (редактор может менять блоки/связи)
      this.page = { ...this.page, ...newPage };
      // При необходимости можно отправлять изменения на сервер, debounce и т.п.
      // api.savePage(this.contextId, this.fileId, this.page);
    },
    handleUpdateVariables(newVars) {
      // Обновляем значения varId (отладка / моделирование)
      this.variables = { ...this.variables, ...newVars };
      // Можно отправить на сервер или просто держать в клиентском стейте
    }
  }
};
</script>

<style scoped>
.editor-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid #ddd;
  background: #fff;
}
.tool-label {
  font-size: 0.9rem;
  color: #666;
}
.tool-container {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.loading,
.error {
  padding: 20px;
}
</style>
