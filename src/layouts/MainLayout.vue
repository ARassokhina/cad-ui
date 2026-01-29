<template>
  <div class="main-layout">
    <!-- ====== Sidebar ====== -->
    <aside class="sidebar">

      <!-- 2. простой поиск (без radio-фильтров) -->
      <div class="search-box">
        <input
            v-model="searchQuery"
            @keyup.enter="performSearch"
            placeholder="Search…"
        >
      </div>

      <!-- 3. дерево файлов -->
      <div class="tree-container">
        <file-tree
            :parent-id="rootFolderId"
            :context-id="contextId"
            @open-file="handleOpenFile"
        />
      </div>

      <!-- 4. открытые табы -->
      <div class="sidebar-tabs">
        <h4>Open Files</h4>
        <div
            v-for="tab in tabsStore.openTabs"
            :key="tab.id"
            class="tab-item"
            :class="{ active: tabsStore.activeTabId === tab.id }"
            @click="activateTab(tab)"
        >
          <span class="icon">{{ tab.type === 'page' ? '📄' : '🗄' }}</span>
          <span class="name">{{ tab.name }}</span>
          <span class="close" @click.stop="tabsStore.closeTab(tab.id)">×</span>
        </div>
      </div>
    </aside>

    <!-- ====== Content Area ====== -->
    <main class="content-area">
      <header v-if="tabsStore.activeTabId" class="top-toolbar">
        <div class="tools">
          <button :class="{ active: currentTool === 'fp' }" @click="switchTool('fp')">FP Editor</button>
          <button :class="{ active: currentTool === 'debug' }" @click="switchTool('debug')">Debug</button>
          <button :class="{ active: currentTool === 'model' }" @click="switchTool('model')">Modeling</button>
        </div>
      </header>

      <div class="viewport">
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
  components: { FileTree },
  data() {
    return {
      searchQuery: '',
      tabsStore
    };
  },
  computed: {
    // какую «ветку» показывать в дереве
    rootFolderId() {
      return 'root';
    },
    contextId() {
      // FileTree тоже использует contextId; пусть это будет то же самое
      return this.rootFolderId;
    },
    currentTool() {
      return this.$route.params.tool || 'fp';
    }
  },
  methods: {
    handleOpenFile(file) {
      this.tabsStore.addTab(file);
      this.$router.push({
        name: 'FileEditor',
        params: { fileId: file.id, tool: 'fp' }
      });
    },
    activateTab(tab) {
      this.tabsStore.activeTabId = tab.id;
      this.$router.push({
        name: 'FileEditor',
        params: { fileId: tab.id, tool: this.currentTool }
      });
    },
    switchTool(toolName) {
      if (!this.tabsStore.activeTabId) return;
      this.$router.push({
        name: 'FileEditor',
        params: { ...this.$route.params, tool: toolName }
      });
    },
    performSearch() {
      console.log(`Search: ${this.searchQuery}`);
      // здесь можно вызвать api.search(this.searchQuery, null, this.contextId)
    }
  }
};
</script>

<style scoped>
.main-layout { display: flex; height: 100vh; }
.sidebar { width: 300px; background: #2b2b2b; color: #fff; display: flex; flex-direction: column; border-right: 1px solid #444; }
/* верх: выбор ветви */
.branch-chooser { display: flex; padding: 12px; gap: 8px; }
.branch-chooser button { flex: 1; padding: 8px; border: 1px solid #555; background: #373737; color: #ccc; border-radius: 6px; cursor: pointer; }
.branch-chooser button.active { background: #007bff; color: #fff; border-color: #007bff; }

.search-box { padding: 10px 12px; border-top: 1px solid #555; }
.search-box input { width: 100%; padding: 6px 8px; background: #333; color: #fff; border: 1px solid #555; border-radius: 4px; }

.tree-container { flex: 1; overflow-y: auto; padding: 10px; }
.sidebar-tabs { height: 200px; border-top: 1px solid #555; overflow-y: auto; background: #222; }
.tab-item { padding: 8px 15px; cursor: pointer; display: flex; justify-content: space-between; border-bottom: 1px solid #333; }
.tab-item.active { background: #007bff; }

.content-area { flex: 1; display: flex; flex-direction: column; background: #f0f2f5; }
.top-toolbar { height: 50px; background: #fff; border-bottom: 1px solid #ddd; display: flex; align-items: center; padding: 0 20px; }
.viewport { flex: 1; position: relative; overflow: hidden; }
</style>
