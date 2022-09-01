// register vue composition api globally
import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import fpjsPlugin from '@fingerprintjs/fingerprintjs-pro-vue-v3'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import { customMotion } from './motion'
import SocketIO from './plugins/io'
import { isDevPro } from './state'
import { setupRouter } from './router'

const app = createApp(App)

// socket.io
app.use(
  SocketIO, {
    connection: import.meta.env.VITE_SOCKET_URL,
    options: {
      autoConnect: false,
    },
  },
)

// motion plugin
app.use(MotionPlugin, {
  directives: {
    ...customMotion,
  },
},
)
app.use(fpjsPlugin, { loadOptions: { apiKey: import.meta.env.VITE_FINGERPRINT_KEY } })

// router setup
setupRouter(app)

app.mount('#app')
