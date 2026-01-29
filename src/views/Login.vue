<template>
  <div class="auth-container">
    <div class="login-card" @keypress.enter="handleLogin">
      <!-- Логотип и заголовок -->
      <div class="logo-section">
        <div class="brand">
          <img src="@/assets/image/png/logo_fizpribor.png" alt="Fizpribor" class="main-logo" />
        </div>
        <div class="divider"></div>
        <h2>Вход в систему <span>FIMATIC-CAD</span></h2>
      </div>

      <form @submit.prevent="handleLogin">
        <!-- Поле Логина -->
        <div class="input-group">
          <label>Идентификатор</label>
          <input
              v-model="username"
              ref="login_input"
              type="text"
              placeholder="Введите логин"
              required
              :disabled="loading"
          />
        </div>

        <!-- Поле Пароля -->
        <div class="input-group">
          <label>Пароль</label>
          <input
              v-model="password"
              ref="password_input"
              type="password"
              placeholder="••••••••"
              required
              :disabled="loading"
          />
        </div>

        <!-- Ошибки -->
        <Transition name="fade">
          <div v-if="alertVisible" class="error-alert" @click="alertVisible = false">
            <span class="error-icon">⚠️</span>
            <p>{{ alertMessage }}</p>
          </div>
        </Transition>

        <!-- Кнопка входа с использованием корпоративного цвета -->
        <button
            type="submit"
            class="login-btn"
            :disabled="loading"
        >
          <span v-if="!loading">Войти в систему</span>
          <span v-else class="loader"></span>
        </button>
      </form>

      <div class="footer-note">
        Engineering OS • Модуль проектирования
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'SignIn',
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      alertVisible: false,
      alertMessage: 'Ошибка запроса',
      dismissSecs: 5
    };
  },
  methods: {

    async handleLogin() {
      if (this.loading) return;
      this.loading = true;
      this.alertVisible = false;

      try {

        await axios.post( 'http://192.168.4.116'  + ':' + 9000 + '/sec/login', { username: this.username, password: this.password });
        this.$router.push('/app');
      } catch (error) {
        this.alertMessage = (error.length < 150) ? error : 'Ошибка запроса. Свяжитесь с поддержкой.';
        this.alertVisible = true;
        setTimeout(() => { this.alertVisible = false; }, this.dismissSecs * 1000);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    if (this.$refs.login_input) this.$refs.login_input.focus();
  }
};
</script>

<style scoped>
/* Основной контейнер использует темные переменные из base.css для фона */
.auth-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Используем Indigo как базу для градиента */
  background: radial-gradient(circle at top right, var(--vt-c-indigo), #000);
  /* Наследование шрифта из body */
  font-family: inherit;
}

/* Стеклянная карточка */
.login-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  padding: 50px 40px;
  border-radius: 20px;
  border: 1px solid var(--vt-c-divider-dark-2);
  width: 400px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.logo-section { margin-bottom: 40px; }
.main-logo { width: 240px; filter: brightness(0) invert(1); opacity: 0.85; margin-bottom: 25px; }
.divider { height: 1px; background: var(--vt-c-divider-dark-1); margin: 0 auto 20px auto; width: 80%; }

.logo-section h2 { color: var(--vt-c-text-dark-1); font-weight: 300; font-size: 16px; letter-spacing: 0.5px; }
/* Подсветка SAPR цветом */
.logo-section h2 span { font-weight: 700; color: var(--sapr-color); }

.input-group { margin-bottom: 25px; text-align: left; }
.input-group label { display: block; color: var(--vt-c-text-dark-2); font-size: 11px; margin-bottom: 8px; text-transform: uppercase; }

.input-group input {
  width: 100%;
  background: var(--vt-c-black-mute);
  border: 1px solid var(--vt-c-divider-dark-2);
  padding: 14px 16px;
  border-radius: 8px;
  color: var(--vt-c-text-dark-1);
  font-family: 'Fira Mono', monospace; /* Соответствие системному шрифту */
  font-size: 14px;
  outline: none;
  transition: all 0.25s ease;
  box-sizing: border-box;
}

/* Фокус с использованием SAPR цвета */
.input-group input:focus {
  border-color: var(--sapr-color);
  background: var(--vt-c-black-soft);
  box-shadow: 0 0 10px rgba(0, 128, 139, 0.2);
}

.error-alert {
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.3);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.error-alert p { color: #ff7675; font-size: 12px; margin: 0; text-align: left; }

/* Кнопка с централизованным цветом SAPR */
.login-btn {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 8px;
  background: var(--sapr-color);
  color: white;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover:not(:disabled) {
  /* Немного осветляем корпоративный цвет при наведении */
  filter: brightness(1.1);
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(0, 128, 139, 0.4);
}

.login-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.footer-note { margin-top: 30px; color: var(--vt-c-text-dark-2); font-size: 11px; opacity: 0.5; }

/* Лоадер */
.loader {
  display: inline-block; width: 18px; height: 18px;
  border: 2px solid rgba(255,255,255,0.3); border-radius: 50%;
  border-top-color: #fff; animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
