import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

// Import translation files
import cs from './lang/cs.json'
import en from './lang/en.json'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'cs',
  fallbackLocale: 'cs',
  allowComposition: true, // explicitly allow composition API usage
  messages: {
    cs,
    en
  }
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
