import { http } from '../axios'
import type { FindRoomRequest } from './together.dto'

enum ETogtherApi {
  goRoom = '/Multiplayer',
}

export const findAndJoinRoom = (payload: FindRoomRequest) => {
  return http.post<string>({
    url: ETogtherApi.goRoom,
    data: {
      ...payload,
    },
  })
}
