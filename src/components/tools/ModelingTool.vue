<template>
  <div class="modeling-tool">
    <aside class="modeling-sidebar">
      <h4>Simulation Controls</h4>
      <div class="controls">
        <label>
          Steps:
          <input type="number" v-model.number="steps" min="1" />
        </label>
        <label>
          Δt:
          <input type="number" v-model.number="deltaT" step="0.1" />
        </label>
        <button @click="runSimulation">Run</button>
      </div>
    </aside>

    <section class="modeling-main">
      <h4>Variables over time</h4>
      <table class="table">
        <thead>
        <tr>
          <th>t</th>
          <th v-for="varId in usedVarIds" :key="varId">
            {{ varId }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, idx) in timeline" :key="idx">
          <td>{{ row.t.toFixed(2) }}</td>
          <td
              v-for="varId in usedVarIds"
              :key="varId"
          >
            {{ row.values[varId] ?? '—' }}
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ModelingTool',
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
      steps: 10,
      deltaT: 1,
      timeline: []   // [{ t, values: { varId: value } }]
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
  methods: {
    runSimulation() {
      const startVars = { ...this.variables };
      const result = [];
      let currentVars = { ...startVars };
      for (let i = 0; i <= this.steps; i++) {
        const t = i * this.deltaT;
        // Простейший пример эволюции значений:
        const stepValues = {};
        this.usedVarIds.forEach(varId => {
          const base = currentVars[varId] ?? 0;
          const value = base + i; // здесь вместо i может быть реальная модель
          stepValues[varId] = value;
          currentVars[varId] = value;
        });
        result.push({ t, values: stepValues });
      }
      this.timeline = result;
      // Можно при желании записать финальные значения в общие переменные:
      this.$emit('update-variables', currentVars);
    }
  }
};
</script>

<style scoped>
.modeling-tool {
  display: flex;
  height: 100%;
}
.modeling-sidebar {
  width: 220px;
  border-right: 1px solid #ddd;
  padding: 8px;
  background: #fafafa;
}
.controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.modeling-main {
  flex: 1;
  padding: 8px;
  overflow: auto;
}
.table {
  border-collapse: collapse;
  width: 100%;
}
.table th,
.table td {
  border: 1px solid #ccc;
  padding: 4px 6px;
  font-size: 0.85rem;
  text-align: right;
}
.table th:first-child,
.table td:first-child {
  text-align: left;
}
</style>
