import type { RouteRecordRaw } from 'vue-router'
import { EPagePath } from '../enum'

export const RootRoute: RouteRecordRaw = {
  path: EPagePath.Home,
  name: 'Root',
  redirect: EPagePath.SinglePlayer,
  meta: {
  },
}

export const SingleRoute: RouteRecordRaw = {
  path: EPagePath.SinglePlayer,
  name: 'Single',
  component: () => import('../../page/singlePlayer.vue'),
  meta: {
    mode: 'solo',
  },

}
