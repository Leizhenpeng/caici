// register vue composition api globally
import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import { customMotion } from './motion'
import SocketIO from './plugins/io'
import { setupRouter } from './router'

const app = createApp(App)

// socket.io
app.use(
  SocketIO, {
    connection: import.meta.env.VITE_SOCKET_URL,
    options: {
      path: '/socket.io',
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

// router setup
setupRouter(app)

app.mount('#app')
