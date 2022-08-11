// register vue composition api globally
import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import { customMotion } from './motion'

const app = createApp(App)
app.use(MotionPlugin, {
  directives: {
    ...customMotion,
  },
},
)
app.mount('#app')
