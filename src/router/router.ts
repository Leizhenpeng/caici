import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import { RootRoute, SingleRoute } from './router-define'

export const router = createRouter({
  history: createWebHistory(),
  routes: [RootRoute, SingleRoute] as unknown as RouteRecordRaw[],
})

// config router
export function setupRouter(app: App<Element>) {
  app.use(router)
}
