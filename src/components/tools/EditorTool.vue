<template>
  <div class="fp-editor">
    <div class="fp-toolbar">
      <button @click="addBlock">+ Block</button>
      <!-- Можно добавить выбор типа блока, привязку varId и т.п. -->
    </div>

    <div class="fp-body">
      <aside class="fp-library">
        <h4>Blocks Library</h4>
        <ul>
          <li v-for="block in libraryBlocks" :key="block.type" @click="insertBlock(block)">
            {{ block.name }}
          </li>
        </ul>
      </aside>

      <section class="fp-canvas">
        <h4>Page Graph (Blocks + Connections)</h4>
        <div
            v-for="block in page.blocks"
            :key="block.id"
            class="block-item"
        >
          <div class="block-header">
            {{ block.name }} (id: {{ block.id }}, varId: {{ block.varId || '—' }})
          </div>
          <div class="block-body">
            <!-- какие-то параметры блока, например -->
            <label>
              varId:
              <input
                  v-model="localPage.blocksMap[block.id].varId"
                  @change="emitPageUpdate"
              />
            </label>
          </div>
        </div>

        <div class="connections">
          <h5>Connections</h5>
          <ul>
            <li
                v-for="(conn, idx) in page.connections"
                :key="idx"
            >
              {{ conn.from }} → {{ conn.to }} (varId: {{ conn.varId || '—' }})
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditorTool',
  props: {
    page: {
      type: Object,
      required: true
    },
    variables: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update-page'],
  data() {
    return {
      // Локальная копия page для редактирования
      localPage: {
        blocks: [],
        connections: [],
        blocksMap: {}
      },
      // Примитивная библиотека блоков (для примера)
      libraryBlocks: [
        { type: 'const', name: 'Constant' },
        { type: 'sum', name: 'Sum' },
        { type: 'mul', name: 'Multiply' }
      ]
    };
  },
  watch: {
    page: {
      immediate: true,
      deep: true,
      handler(newPage) {
        this.initLocalPage(newPage);
      }
    }
  },
  methods: {
    initLocalPage(page) {
      const blocks = page.blocks || [];
      const connections = page.connections || [];
      const blocksMap = {};
      blocks.forEach(b => {
        blocksMap[b.id] = { ...b };
      });
      this.localPage = { blocks, connections, blocksMap };
    },
    emitPageUpdate() {
      // Преобразуем map обратно в массив
      const blocks = Object.values(this.localPage.blocksMap);
      const newPage = {
        ...this.page,
        blocks,
        connections: this.localPage.connections
      };
      this.$emit('update-page', newPage);
    },
    addBlock() {
      const newId = 'b' + (this.localPage.blocks.length + 1);
      const newBlock = {
        id: newId,
        name: 'New Block ' + newId,
        type: 'custom',
        varId: ''
      };
      this.localPage.blocksMap[newId] = newBlock;
      this.localPage.blocks.push(newBlock);
      this.emitPageUpdate();
    },
    insertBlock(blockType) {
      const newId = 'b' + (this.localPage.blocks.length + 1);
      const newBlock = {
        id: newId,
        name: blockType.name,
        type: blockType.type,
        varId: ''
      };
      this.localPage.blocksMap[newId] = newBlock;
      this.localPage.blocks.push(newBlock);
      this.emitPageUpdate();
    }
  }
};
</script>

<style scoped>
.fp-editor {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.fp-toolbar {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  background: #f7f7f7;
}
.fp-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}
.fp-library {
  width: 200px;
  border-right: 1px solid #ddd;
  padding: 8px;
  background: #fafafa;
}
.fp-canvas {
  flex: 1;
  padding: 8px;
  overflow: auto;
}
.block-item {
  border: 1px solid #ccc;
  margin-bottom: 6px;
  padding: 6px;
  background: #fff;
}
.block-header {
  font-weight: bold;
  margin-bottom: 4px;
}
.connections {
  margin-top: 10px;
}
</style>
