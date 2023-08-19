// Import our custom CSS
import './assets/styles.scss'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import { createApp } from 'vue'
import { Quasar } from 'quasar'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(Quasar, {
  config: {
    // dark: true
  },
  plugins: {}
})

app.mount('#app')
