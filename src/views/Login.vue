<template>
  <div class="auth-container">
    <div class="login-card">
      <div class="logo">
        <div class="logo-box">SYS</div>
        <h2>Engineering<span>OS</span></h2>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label>Username</label>
          <input
              v-model="form.username"
              type="text"
              placeholder="Enter your ID"
              required
          />
        </div>
        <div class="input-group">
          <label>Password</label>
          <input
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              required
          />
        </div>
        <button type="submit" :disabled="loading" class="login-btn">
          {{ loading ? 'Authenticating...' : 'Sign In' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',

  data() {
    return {
      // Состояние загрузки
      loading: false,
      // Данные формы
      form: {
        username: '',
        password: ''
      }
    };
  },

  methods: {
    async handleLogin() {
      this.loading = true;

      // Имитация задержки сети (1 секунда)
      setTimeout(() => {
        // Переход на страницу выбора воркспейса
        // В Options API используем this.$router
        this.$router.push('/workspace-select');
        this.loading = false;
      }, 1000);
    }
  }
};
</script>

<style scoped>
.auth-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top right, #2c3e50, #000);
}
.login-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 360px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}
.logo { text-align: center; margin-bottom: 30px; }
.logo-box {
  display: inline-block; background: #3498db; color: white;
  padding: 5px 10px; font-weight: bold; border-radius: 4px; margin-bottom: 10px;
}
.logo h2 { color: white; font-weight: 300; margin: 0; }
.logo h2 span { font-weight: 700; color: #3498db; }
.input-group { margin-bottom: 20px; text-align: left; }
.input-group label { display: block; color: #999; font-size: 12px; margin-bottom: 5px; text-transform: uppercase; }
.input-group input {
  width: 100%; background: rgba(255,255,255,0.05); border: 1px solid #444;
  padding: 12px; border-radius: 8px; color: white; outline: none; transition: 0.3s;
}
.input-group input:focus { border-color: #3498db; background: rgba(255,255,255,0.1); }
.login-btn {
  width: 100%; padding: 14px; border: none; border-radius: 8px;
  background: #3498db; color: white; font-weight: bold; cursor: pointer; transition: 0.3s;
}
.login-btn:hover { background: #2980b9; transform: translateY(-2px); }
.login-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
</style>
