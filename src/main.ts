// main.js
import '@/assets/main.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Импорт вашего обновленного роутера
const app = createApp(App);
app.use(router); // Подключение роутера
app.mount('#app');
