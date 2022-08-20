import type { ManagerOptions, SocketOptions } from 'socket.io-client'
import io from 'socket.io-client'
import type { App } from 'vue'
export default {
  install: (app: App,
    { connection, options }: { connection: string; options: Partial<ManagerOptions & SocketOptions> }) => {
    const socket = io(connection, options)
    app.config.globalProperties.$socket = socket
    app.provide('socket', socket)
  },
}
