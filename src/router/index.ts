import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import EditorPage from '@/views/EditorPage.vue';

const routes = [
    { path: '/login', name: 'Login', component: Login },

    // единый «рабочий» урл – без branch/contextId в строке
    {
        path: '/app',
        component: MainLayout,
        children: [
            {
                path: 'file/:fileId/:tool?',
                name: 'FileEditor',
                component: EditorPage,
                props: true          // fileId, tool
            }
        ]
    },

    // по-умолчанию
    { path: '/', redirect: '/login' },
    { path: '/:pathMatch(.*)*', redirect: '/login' }
];

export default createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});
