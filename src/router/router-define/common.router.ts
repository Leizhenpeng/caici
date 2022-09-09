import type { RouteRecordRaw } from 'vue-router'
import { EPagePath } from '../enum'

export const RootRoute: RouteRecordRaw = {
  path: EPagePath.Home,
  name: 'Root',
  redirect: EPagePath.SinglePlayer,
  meta: {
    mode: 'solo',
    step: 'play',
  },
}

export const SingleRoute: RouteRecordRaw = {
  path: EPagePath.SinglePlayer,
  name: 'solo',
  component: () => import('../../page/single/single.vue'),
  meta: {
    mode: 'solo',
    step: 'play',
  },
}
export const TogetherRoute: RouteRecordRaw = {
  path: EPagePath.MultiPlayer,
  name: 'together',
  component: () => import('../../page/together/together.vue'),
  children: [
    {
      path: '',
      name: 'together-wait',
      component: () => import('../../page/together/wait.vue'),
      meta: {
        mode: 'together',
        step: 'wait',
      },
    },
    {
      path: 'room',
      name: 'room',
      component: () => import('../../page/together/room.vue'),
      meta: {
        mode: 'together',
        step: 'play',
      },
    },
    {
      path: ':pathMatch(.*)*',
      name: 'together-left',
      redirect: EPagePath.MultiPlayer,
    },
  ],
}
// export const RoomRoute: RouteRecordRaw = {
//   path: EPagePath.RoomGame,
//   name: 'room',
//   component: () => import('../../page/roomGame.vue'),
//   meta: {
//     mode: 'together',
//     step: 'play',
//   },
// }
export const LeftRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'solo',
  component: () => import('../../page/single/single.vue'),
  meta: {
    mode: 'solo',
  },
}
