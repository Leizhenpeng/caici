import { http } from '../axios'
import type { FindRoomRequest, FindRoomResponse, ifOngameResponse } from './together.dto'

enum ETogtherApi {
  goRoom = '/Multiplayer',
  onGame = '/Multiplayer/on-game',
}

export const findAndJoinRoom = (payload: FindRoomRequest) => {
  return http.post<FindRoomResponse>({
    url: ETogtherApi.goRoom,
    data: {
      ...payload,
    },
  })
}

export const ifOnGame = (uuid: string) => {
  return http.post<ifOngameResponse>({
    url: ETogtherApi.onGame,
    data: {
      uuid,
    },
  })
}
