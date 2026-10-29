import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import './styles/builder.css';
import './styles/admin.css';
import './styles/invitation.css';

createApp(App).use(router).mount('#app');
