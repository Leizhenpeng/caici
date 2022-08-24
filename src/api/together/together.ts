import { http } from '../axios'
import type { FindRoomRequest, FindRoomResponse } from './together.dto'

enum ETogtherApi {
  goRoom = '/Multiplayer',
}

export const findAndJoinRoom = (payload: FindRoomRequest) => {
  return http.post<FindRoomResponse>({
    url: ETogtherApi.goRoom,
    data: {
      ...payload,
    },
  })
}
