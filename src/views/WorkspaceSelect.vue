<template>
  <div class="workspace-container">
    <div class="header">
      <h1>Select Environment</h1>
      <p>Choose your working context to mount necessary modules</p>
    </div>

    <div class="cards-grid">
      <!-- Передаем параметры ветки и контекста в метод select -->
      <div class="ws-card typical" @click="select('typical', 'ROOT_LIBS')">
        <div class="card-icon">📚</div>
        <h2>Proto Development</h2>
        <p>пока не реализовано</p>
        <div class="action-hint">Open Libraries →</div>
      </div>

      <div class="ws-card project" @click="select('project', 'project-1')">
        <div class="card-icon">🏗️</div>
        <h2>Project Workspace</h2>
        <p>Кликнем, и сразу попадем в project-1</p>
        <div class="action-hint">Enter Project 1 →</div>
      </div>
    </div>

    <button class="logout-link" @click="$router.push('/login')">
      Logout from system
    </button>
  </div>
</template>

<script>
export default {
  name: 'WorkspaceSelect',

  // В данном компоненте нет локального состояния (data),
  // так как он выполняет только функцию навигации.

  methods: {
    /**
     * Осуществляет переход в рабочую область.
     * @param {string} branch - Тип ветки (typical/project)
     * @param {string} contextId - ID корневого контекста
     */
    select(branch, contextId) {
      // Переход в MainLayout с выбранными параметрами через динамический путь
      // В Options API используем встроенный this.$router
      this.$router.push(`/workspace/${branch}/${contextId}`);
    }
  }
};
</script>

<style scoped>
.workspace-container {
  height: 100vh;
  background: #f4f7f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
}
.header { text-align: center; margin-bottom: 50px; }
.header h1 { color: #2c3e50; font-size: 32px; margin-bottom: 10px; }
.header p { color: #7f8c8d; }
.cards-grid { display: flex; gap: 30px; max-width: 900px; }
.ws-card {
  flex: 1; background: white; padding: 40px; border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05); cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid transparent; text-align: center;
}
.ws-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 20px 40px rgba(52, 152, 219, 0.15);
  border-color: #3498db;
}
.card-icon { font-size: 50px; margin-bottom: 20px; }
.ws-card h2 { color: #2c3e50; margin-bottom: 15px; }
.ws-card p { color: #95a5a6; line-height: 1.6; margin-bottom: 25px; }
.action-hint { color: #3498db; font-weight: bold; font-size: 14px; opacity: 0; transition: 0.3s; }
.ws-card:hover .action-hint { opacity: 1; }
.logout-link {
  margin-top: 50px; background: none; border: none; color: #95a5a6;
  text-decoration: underline; cursor: pointer;
}
</style>
