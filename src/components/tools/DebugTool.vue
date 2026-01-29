<template>
  <div class="debug-tool">
    <aside class="debug-sidebar">
      <h4>Variables (varId)</h4>
      <ul>
        <li
            v-for="varId in usedVarIds"
            :key="varId"
        >
          <label>
            {{ varId }}:
            <input
                type="number"
                v-model.number="localVars[varId]"
                @change="emitVariablesUpdate"
            />
          </label>
        </li>
      </ul>
    </aside>

    <section class="debug-main">
      <h4>Page Blocks (read-only)</h4>
      <ul>
        <li
            v-for="block in page.blocks"
            :key="block.id"
        >
          {{ block.name }} (id: {{ block.id }}, varId: {{ block.varId || '—' }})
          → value: {{ localVars[block.varId] ?? '—' }}
        </li>
      </ul>

      <div class="debug-log">
        <h5>Debug Log (example)</h5>
        <pre>{{ JSON.stringify(localVars, null, 2) }}</pre>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'DebugTool',
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
  emits: ['update-variables'],
  data() {
    return {
      localVars: {}
    };
  },
  computed: {
    usedVarIds() {
      const ids = new Set();
      (this.page.blocks || []).forEach(b => {
        if (b.varId) ids.add(b.varId);
      });
      (this.page.connections || []).forEach(c => {
        if (c.varId) ids.add(c.varId);
      });
      return Array.from(ids);
    }
  },
  watch: {
    variables: {
      immediate: true,
      deep: true,
      handler(newVars) {
        this.localVars = { ...newVars };
      }
    }
  },
  methods: {
    emitVariablesUpdate() {
      this.$emit('update-variables', { ...this.localVars });
    }
  }
};
</script>

<style scoped>
.debug-tool {
  display: flex;
  height: 100%;
}
.debug-sidebar {
  width: 220px;
  border-right: 1px solid #ddd;
  padding: 8px;
  background: #fafafa;
}
.debug-main {
  flex: 1;
  padding: 8px;
  overflow: auto;
}
.debug-log {
  margin-top: 12px;
}
</style>
