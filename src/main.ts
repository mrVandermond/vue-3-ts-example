import { createApp } from 'vue';
import Main from '@/components/Main.vue';
import router from '@/router';
import { store, key } from '@/store';
import 'assets/css/style.scss';

const app = createApp(Main);

app.use(router);
app.use(store, key);
app.mount('#app');
