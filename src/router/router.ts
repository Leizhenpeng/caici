import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import { LeftRoute, RootRoute, SingleRoute, TogetherRoute } from './router-define'

export const router = createRouter({
  history: createWebHistory(),
  routes: [RootRoute, SingleRoute, TogetherRoute, LeftRoute] as unknown as RouteRecordRaw[],
})

// config router
export function setupRouter(app: App<Element>) {
  app.use(router)
}
