<template>
  <div class="main-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <!-- branch и contextId приходят из props -->
        <h3>{{ branch === 'project' ? 'Project' : 'Typical' }}</h3>
        <div class="context-name">{{ contextId }}</div>
        <button @click="$router.push('/workspace-select')">Change Workspace</button>
      </div>

      <div class="search-box">
        <input
            v-model="searchQuery"
            @keyup.enter="performSearch"
            placeholder="Search pages/sources..."
        >
        <div class="search-filters">
          <label><input type="radio" v-model="searchType" value="page"> Pages</label>
          <label><input type="radio" v-model="searchType" value="source"> Sources</label>
        </div>
      </div>

      <div class="tree-container">
        <file-tree
            :parent-id="rootFolderId"
            :context-id="contextId"
            @open-file="handleOpenFile"
        />
      </div>

      <div class="sidebar-tabs">
        <h4>Open Files</h4>
        <div
            v-for="tab in tabsStore.openTabs"
            :key="tab.id"
            class="tab-item"
            :class="{ active: tabsStore.activeTabId === tab.id }"
            @click="activateTab(tab)"
        >
          <span class="icon">{{ tab.type === 'page' ? '📄' : '🗄️' }}</span>
          <span class="name">{{ tab.name }}</span>
          <span class="close" @click.stop="tabsStore.closeTab(tab.id)">×</span>
        </div>
      </div>
    </aside>

    <main class="content-area">
      <header class="top-toolbar" v-if="tabsStore.activeTabId">
        <div class="tools">
          <button :class="{ active: currentTool === 'fp' }" @click="switchTool('fp')">FP Editor</button>
          <button :class="{ active: currentTool === 'debug' }" @click="switchTool('debug')">Debug</button>
          <button :class="{ active: currentTool === 'model' }" @click="switchTool('model')">Modeling</button>
        </div>
      </header>

      <div class="viewport">
        <!-- В Vue 3 transition/keep-alive внутри router-view используется через v-slot -->
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="$route.fullPath" />
          </keep-alive>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script>
import { tabsStore } from '@/store/tabs';
import FileTree from '@/components/FileTree.vue';

export default {
  name: 'MainLayout',

  components: {
    FileTree
  },

  props: {
    branch: {
      type: String,
      required: true
    },
    contextId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      searchQuery: '',
      searchType: 'page',
      // В Vue 3 внешние объекты (как tabsStore) лучше проксировать в data
      // или использовать Pinia, чтобы сохранить реактивность в Options API
      tabsStore: tabsStore
    };
  },

  computed: {
    // ID корня равен ID проекта (логика из оригинала)
    rootFolderId() {
      return this.contextId;
    },

    // Текущий инструмент из URL (параметр :tool)
    currentTool() {
      return this.$route.params.tool || 'fp';
    }
  },

  methods: {
    handleOpenFile(file) {
      this.tabsStore.addTab(file);
      // Переход на роут файла с дефолтным инструментом
      this.$router.push({
        name: 'FileEditor',
        params: {
          branch: this.branch,
          contextId: this.contextId,
          fileId: file.id,
          tool: 'fp'
        }
      });
    },

    activateTab(tab) {
      this.tabsStore.activeTabId = tab.id;
      this.$router.push({
        name: 'FileEditor',
        params: {
          branch: this.branch,
          contextId: this.contextId,
          fileId: tab.id,
          tool: this.currentTool
        }
      });
    },

    switchTool(toolName) {
      if (!this.tabsStore.activeTabId) return;
      this.$router.push({
        name: 'FileEditor',
        params: {
          ...this.$route.params,
          tool: toolName
        }
      });
    },

    performSearch() {
      console.log(`Searching for ${this.searchQuery} in ${this.searchType}`);
    }
  }
};
</script>

<style scoped>
.main-layout { display: flex; height: 100vh; }
.sidebar { width: 300px; background: #2b2b2b; color: #fff; display: flex; flex-direction: column; border-right: 1px solid #444; }
.tree-container { flex: 1; overflow-y: auto; padding: 10px; }
.sidebar-tabs { height: 200px; border-top: 1px solid #555; overflow-y: auto; background: #222; }
.tab-item { padding: 8px 15px; cursor: pointer; display: flex; justify-content: space-between; border-bottom: 1px solid #333; }
.tab-item.active { background: #007bff; }
.content-area { flex: 1; display: flex; flex-direction: column; background: #f0f2f5; }
.top-toolbar { height: 50px; background: #fff; border-bottom: 1px solid #ddd; display: flex; align-items: center; padding: 0 20px; }
.viewport { flex: 1; position: relative; overflow: hidden; }
</style>
