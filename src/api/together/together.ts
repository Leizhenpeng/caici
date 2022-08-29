import { http } from '../axios'
import type { FindRoomRequest, FindRoomResponse, ifOngameResponse, ifRoomIdAccessibleResponse, roomBaseInfoResponse } from './together.dto'

enum ETogtherApi {
  goRoom = '/Multiplayer',
  onGame = '/Multiplayer/on-game',
  roomAccess = '/Multiplayer/access',
  roomInfo = '/Multiplayer/room-info',
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

export const roomAccess = (roomId: string, uuid: string, socketId: string) => {
  return http.post<ifRoomIdAccessibleResponse>({
    url: ETogtherApi.roomAccess,
    data: {
      roomId,
      uuid,
      socketId,
    },
  })
}

export const roomInfo = (roomId: string, uuid: string, socketId: string) => {
  return http.post<roomBaseInfoResponse>({
    url: ETogtherApi.roomInfo,
    data: {
      roomId,
      uuid,
      socketId,
    },
  })
}
