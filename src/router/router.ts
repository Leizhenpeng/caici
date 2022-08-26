import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import { LeftRoute, RoomRoute, RootRoute, SingleRoute, TogetherRoute } from './router-define'

export const router = createRouter({
  history: createWebHistory(),
  routes: [RootRoute, SingleRoute, TogetherRoute, RoomRoute, LeftRoute] as unknown as RouteRecordRaw[],
})

// config router
export function setupRouter(app: App<Element>) {
  app.use(router)
}
