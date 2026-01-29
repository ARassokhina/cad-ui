// fsStubData.js
export const fsNodes = {
    // ===== ROOT LEVELS =====
    'root': {
        id: 'root',
        type: 'folder',
        name: 'Root',
        children: ['typical-root', 'project-root']
    },

    'typical-root': {
        id: 'typical-root',
        type: 'folder',
        name: 'Typical workspace',
        children: []
    },

    'project-root': {
        id: 'project-root',
        type: 'folder',
        name: 'Projects',
        children: ['project-1', 'project-2', 'project-3']
    },

    // ===== PROJECTS =====
    'project-1': {
        id: 'project-1',
        type: 'folder',
        name: 'Project 1',
        children: ['project-1-pages', 'project-1-cabinets', 'project-1-sources']
    },
    'project-2': {
        id: 'project-2',
        type: 'folder',
        name: 'Project 2',
        children: ['project-2-pages', 'project-2-cabinets', 'project-2-sources']
    },
    'project-3': {
        id: 'project-3',
        type: 'folder',
        name: 'Project 3',
        children: ['project-3-pages', 'project-3-cabinets', 'project-3-sources']
    },

    // ===== PROJECT 1 SUBFOLDERS =====
    'project-1-pages': {
        id: 'project-1-pages',
        type: 'folder',
        name: 'Pages',
        children: ['p1-page-1', 'p1-page-2', 'p1-page-3']
    },
    'project-1-cabinets': {
        id: 'project-1-cabinets',
        type: 'folder',
        name: 'Cabinets',
        children: ['p1-cab-1', 'p1-cab-2', 'p1-cab-3']
    },
    'project-1-sources': {
        id: 'project-1-sources',
        type: 'folder',
        name: 'Sources',
        children: ['p1-src-1', 'p1-src-2', 'p1-src-3']
    },

    // ===== PROJECT 2 SUBFOLDERS =====
    'project-2-pages': {
        id: 'project-2-pages',
        type: 'folder',
        name: 'Pages',
        children: ['p2-page-1', 'p2-page-2', 'p2-page-3']
    },
    'project-2-cabinets': {
        id: 'project-2-cabinets',
        type: 'folder',
        name: 'Cabinets',
        children: ['p2-cab-1', 'p2-cab-2', 'p2-cab-3']
    },
    'project-2-sources': {
        id: 'project-2-sources',
        type: 'folder',
        name: 'Sources',
        children: ['p2-src-1', 'p2-src-2', 'p2-src-3']
    },

    // ===== PROJECT 3 SUBFOLDERS =====
    'project-3-pages': {
        id: 'project-3-pages',
        type: 'folder',
        name: 'Pages',
        children: ['p3-page-1', 'p3-page-2', 'p3-page-3']
    },
    'project-3-cabinets': {
        id: 'project-3-cabinets',
        type: 'folder',
        name: 'Cabinets',
        children: ['p3-cab-1', 'p3-cab-2', 'p3-cab-3']
    },
    'project-3-sources': {
        id: 'project-3-sources',
        type: 'folder',
        name: 'Sources',
        children: ['p3-src-1', 'p3-src-2', 'p3-src-3']
    },

    // ===== PAGES: PROJECT 1 =====
    'p1-page-1': {
        id: 'p1-page-1',
        type: 'page',
        name: 'P1 · Page 1'
    },
    'p1-page-2': {
        id: 'p1-page-2',
        type: 'page',
        name: 'P1 · Page 2'
    },
    'p1-page-3': {
        id: 'p1-page-3',
        type: 'page',
        name: 'P1 · Page 3'
    },

    // ===== CABINETS: PROJECT 1 =====
    'p1-cab-1': {
        id: 'p1-cab-1',
        type: 'cabinet',
        name: 'P1 · Cabinet 1'
    },
    'p1-cab-2': {
        id: 'p1-cab-2',
        type: 'cabinet',
        name: 'P1 · Cabinet 2'
    },
    'p1-cab-3': {
        id: 'p1-cab-3',
        type: 'cabinet',
        name: 'P1 · Cabinet 3'
    },

    // ===== SOURCES: PROJECT 1 =====
    'p1-src-1': {
        id: 'p1-src-1',
        type: 'source',
        name: 'P1 · Source 1'
    },
    'p1-src-2': {
        id: 'p1-src-2',
        type: 'source',
        name: 'P1 · Source 2'
    },
    'p1-src-3': {
        id: 'p1-src-3',
        type: 'source',
        name: 'P1 · Source 3'
    },

    // ===== PAGES: PROJECT 2 =====
    'p2-page-1': {
        id: 'p2-page-1',
        type: 'page',
        name: 'P2 · Page 1'
    },
    'p2-page-2': {
        id: 'p2-page-2',
        type: 'page',
        name: 'P2 · Page 2'
    },
    'p2-page-3': {
        id: 'p2-page-3',
        type: 'page',
        name: 'P2 · Page 3'
    },

    // ===== CABINETS: PROJECT 2 =====
    'p2-cab-1': {
        id: 'p2-cab-1',
        type: 'cabinet',
        name: 'P2 · Cabinet 1'
    },
    'p2-cab-2': {
        id: 'p2-cab-2',
        type: 'cabinet',
        name: 'P2 · Cabinet 2'
    },
    'p2-cab-3': {
        id: 'p2-cab-3',
        type: 'cabinet',
        name: 'P2 · Cabinet 3'
    },

    // ===== SOURCES: PROJECT 2 =====
    'p2-src-1': {
        id: 'p2-src-1',
        type: 'source',
        name: 'P2 · Source 1'
    },
    'p2-src-2': {
        id: 'p2-src-2',
        type: 'source',
        name: 'P2 · Source 2'
    },
    'p2-src-3': {
        id: 'p2-src-3',
        type: 'source',
        name: 'P2 · Source 3'
    },

    // ===== PAGES: PROJECT 3 =====
    'p3-page-1': {
        id: 'p3-page-1',
        type: 'page',
        name: 'P3 · Page 1'
    },
    'p3-page-2': {
        id: 'p3-page-2',
        type: 'page',
        name: 'P3 · Page 2'
    },
    'p3-page-3': {
        id: 'p3-page-3',
        type: 'page',
        name: 'P3 · Page 3'
    },

    // ===== CABINETS: PROJECT 3 =====
    'p3-cab-1': {
        id: 'p3-cab-1',
        type: 'cabinet',
        name: 'P3 · Cabinet 1'
    },
    'p3-cab-2': {
        id: 'p3-cab-2',
        type: 'cabinet',
        name: 'P3 · Cabinet 2'
    },
    'p3-cab-3': {
        id: 'p3-cab-3',
        type: 'cabinet',
        name: 'P3 · Cabinet 3'
    },

    // ===== SOURCES: PROJECT 3 =====
    'p3-src-1': {
        id: 'p3-src-1',
        type: 'source',
        name: 'P3 · Source 1'
    },
    'p3-src-2': {
        id: 'p3-src-2',
        type: 'source',
        name: 'P3 · Source 2'
    },
    'p3-src-3': {
        id: 'p3-src-3',
        type: 'source',
        name: 'P3 · Source 3'
    }
};
