// apiStub.js
import { fsNodes } from './fsStubData';

// Простая утилита пагинации
function paginate(array, page = 1, limit = 50) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const slice = array.slice(start, end);
    const hasMore = end < array.length;
    const nextPage = hasMore ? page + 1 : null;
    return {
        items: slice,
        meta: {
            hasMore,
            nextPage
        }
    };
}

export default {
    // Навигация по дереву
    async getChildren(parentId, { page = 1, limit = 50 } = {}) {
        const parent = fsNodes[parentId];

        const result = (!parent || parent.type !== 'folder')
            ? []
            : (parent.children || []).map(id => {
                const node = fsNodes[id];
                // Приводим к формату, который ожидает FileTree:
                return {
                    id: node.id,
                    name: node.name,
                    type: node.type === 'cabinet' ? 'folder' : node.type,
                    isOpen: false,
                    children: node.type === 'folder' ? null : undefined
                };
            });

        return paginate(result, page, limit);
    },

    // Поиск по плоскому списку (pages или sources)
    async search(query, type, contextId) {
        // contextId можно использовать для фильтрации по конкретному проекту,
        // здесь для простоты игнорируем.
        const q = (query || '').toLowerCase();
        const res = Object.values(fsNodes).filter(node => {
            if (type === 'page' && node.type !== 'page') return false;
            if (type === 'source' && node.type !== 'source') return false;
            if (!q) return true;
            return node.name.toLowerCase().includes(q);
        });
        return res.map(node => ({
            id: node.id,
            name: node.name,
            type: node.type
        }));
    },

    // Получение контента файла
    async getFile(fileId) {
        const node = fsNodes[fileId];
        console.log(fsNodes[fileId])
        if (!node) throw new Error('File not found');

        if (node.type === 'page') {
            // Stub контент страницы: блоки + соединения + переменные
            return {
                id: node.id,
                name: node.name,
                type: 'page',
                page: {
                    id: node.id,
                    name: node.name,
                    blocks: [
                        { id: 'b1', name: 'Input', type: 'const', varId: 'in1' },
                        { id: 'b2', name: 'Gain', type: 'mul', varId: 'mid1' },
                        { id: 'b3', name: 'Output', type: 'sum', varId: 'out1' }
                    ],
                    connections: [
                        { from: 'b1', to: 'b2', varId: 'in1' },
                        { from: 'b2', to: 'b3', varId: 'mid1' }
                    ]
                },
                variables: {
                    in1: 1,
                    mid1: 2,
                    out1: 3
                }
            };
        }

        if (node.type === 'source') {
            return {
                id: node.id,
                name: node.name,
                type: 'source',
                content: 'stub source file content'
            };
        }

        if (node.type === 'cabinet') {
            return {
                id: node.id,
                name: node.name,
                type: 'cabinet',
                meta: {
                    description: 'stub cabinet meta'
                }
            };
        }

        // fallback для папки, если вдруг запросили getFile к folder
        return {
            id: node.id,
            name: node.name,
            type: node.type
        };
    },

    // Авторизация (мок)
    async login(credentials) {
        // Можно просто вернуть фиктивный токен
        return {
            token: 'stub-token',
            user: {
                id: 'user-1',
                email: credentials.email || 'user@example.com',
                name: 'Stub User'
            }
        };
    }
};
