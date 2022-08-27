import { http } from '../axios'
import type { FindRoomRequest, FindRoomResponse, ifOngameResponse, ifRoomIdAccessibleResponse } from './together.dto'

enum ETogtherApi {
  goRoom = '/Multiplayer',
  onGame = '/Multiplayer/on-game',
  roomAccess = '/Multiplayer/access',
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

export const roomAccess = (roomId: string, uuid: string) => {
  return http.post<ifRoomIdAccessibleResponse>({
    url: ETogtherApi.roomAccess,
    data: {
      roomId,
      uuid,
    },
  })
}
