import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import 'vue-sonner/style.css';
import './styles/shadcn.css';
import './styles/builder.css';
import './styles/invitation.css';

createApp(App).use(router).mount('#app');
