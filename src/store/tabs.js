// store/tabs.js
import { reactive } from 'vue';

export const tabsStore = reactive({
    openTabs: [], // Массив объектов { id, name, path, type, dirty }
    activeTabId: null,

    addTab(file) {
        const existing = this.openTabs.find(t => t.id === file.id);
        if (!existing) {
            this.openTabs.push({
                id: file.id,
                name: file.name,
                type: file.type, // 'page' или 'cabinet'
                path: file.fullPath, // Ссылка для роутера
                dirty: false // Был ли изменен
            });
        }
        this.activeTabId = file.id;
    },

    closeTab(id) {
        this.openTabs = this.openTabs.filter(t => t.id !== id);
        if (this.activeTabId === id && this.openTabs.length > 0) {
            this.activeTabId = this.openTabs[this.openTabs.length - 1].id;
        }
    }
});
