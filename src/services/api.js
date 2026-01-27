import axios from 'axios';

const client = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' }
});

export default {
    // Навигация по дереву
    async getChildren(parentId, page = 1, limit = 50) {
        const { data } = await client.get(`/fs/folder/${parentId}/children`, {
            params: { page, limit }
        });
        return data; // { items: [], meta: { hasMore: true, nextPage: 2 } }
    },

    // Поиск по плоскому списку (pages или sources)
    async search(query, type, contextId) {
        const { data } = await client.get('/fs/search', {
            params: { q: query, type, contextId }
        });
        return data; // Возвращает плоский массив найденных объектов
    },

    // Получение контента файла
    async getFile(fileId) {
        const { data } = await client.get(`/fs/file/${fileId}`);
        return data;
    },

    // Авторизация
    async login(credentials) {
        const { data } = await client.post('/auth/login', credentials);
        return data;
    }
};
