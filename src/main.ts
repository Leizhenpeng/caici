// register vue composition api globally
import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import VueSocketIOExt from 'vue-socket.io-extended'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import { customMotion } from './motion'
import SocketIO from './plugins/io'

const app = createApp(App)
app.use(
  SocketIO, {
    connection: 'http://localhost:3004/together',
  },
)

app.use(MotionPlugin, {
  directives: {
    ...customMotion,
  },
},
)
app.mount('#app')
