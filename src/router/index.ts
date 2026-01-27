import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/views/Login.vue';
import WorkspaceSelect from '@/views/WorkspaceSelect.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import EditorPage from '@/views/EditorPage.vue';
const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        redirect: '/login'
    },
    // Экран выбора ветки (Typical / Project)
    {
        path: '/workspace-select',
        name: 'WorkspaceSelect',
        component: WorkspaceSelect
    },
    // Основной лейаут (Sidebar + Tabs + Editor)
    {
        path: '/workspace/:branch/:contextId',
        component: MainLayout,
        props: true,
        children: [
            // Роут для конкретного открытого файла
            // :fileId - ID страницы/шкафа
            // :tool - текущий инструмент (fp, debug, model)
            {
                path: 'file/:fileId/:tool?',
                name: 'FileEditor',
                component: EditorPage,
                props: true
            }
        ]
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});
export default router;
