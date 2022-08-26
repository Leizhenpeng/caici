import type { RouteRecordRaw } from 'vue-router'
import { EPagePath } from '../enum'

export const RootRoute: RouteRecordRaw = {
  path: EPagePath.Home,
  name: 'Root',
  redirect: EPagePath.SinglePlayer,
  meta: {
    mode: 'solo',
    step: 'paly',
  },
}

export const SingleRoute: RouteRecordRaw = {
  path: EPagePath.SinglePlayer,
  name: 'solo',
  component: () => import('../../page/singlePlayer.vue'),
  meta: {
    mode: 'solo',
    step: 'paly',
  },
}
export const TogetherRoute: RouteRecordRaw = {
  path: EPagePath.MultiPlayer,
  name: 'together',
  component: () => import('../../page/multiPlayer.vue'),
  meta: {
    mode: 'together',
    step: 'wait',
  },
}
export const RoomRoute: RouteRecordRaw = {
  path: EPagePath.RoomGame,
  name: 'room',
  component: () => import('../../page/roomGame.vue'),
  meta: {
    mode: 'together',
    step: 'play',
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
