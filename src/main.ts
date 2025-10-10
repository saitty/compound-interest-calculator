import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

// Import translation files
import cs from './lang/cs.json'
import en from './lang/en.json'
import de from './lang/de.json'
import pl from './lang/pl.json'
import es from './lang/es.json'
import fr from './lang/fr.json'
import it from './lang/it.json'
import ja from './lang/ja.json'
import zh from './lang/zh.json'


const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'cs',
  fallbackLocale: 'cs',
  allowComposition: true, // explicitly allow composition API usage
  messages: {
    cs,en,de,pl,es,fr,it,ja,zh
  }
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
