import type { RouteRecordRaw } from 'vue-router'
import { EPagePath } from '../enum'

export const RootRoute: RouteRecordRaw = {
  path: EPagePath.Home,
  name: 'Root',
  redirect: EPagePath.SinglePlayer,
  meta: {
    mode: 'solo',
  },
}

export const SingleRoute: RouteRecordRaw = {
  path: EPagePath.SinglePlayer,
  name: 'solo',
  component: () => import('../../page/singlePlayer.vue'),
  meta: {
    mode: 'solo',
  },
}
export const TogetherRoute: RouteRecordRaw = {
  path: EPagePath.MultiPlayer,
  name: 'together',
  component: () => import('../../page/multiPlayer.vue'),
  meta: {
    mode: 'together',
  },
}
export const LeftRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'solo',
  component: () => import('../../page/singlePlayer.vue'),
  meta: {
    mode: 'solo',
  },
}
