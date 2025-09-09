/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */


// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome CSS
// import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Import Material Design Icons CSS
import 'vue-material-design-icons/styles.css';

//for v-calendar version 3.0.0
// import VCalendar from 'v-calendar';

// Composables
import { createApp } from 'vue'

const app = createApp(App)
// app.use(VCalendar, {})
registerPlugins(app)


app.mount('#app')
