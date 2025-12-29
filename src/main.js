import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// estilos globales
import '@/main.css';

createApp(App)
  .use(router)
  .mount('#app')
