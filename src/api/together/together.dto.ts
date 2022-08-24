import type { SocketRole } from '~/state'

export class FindRoomRequest {
  /**
     * userId or deviceId
     * @example FP_kL6bjdiiTTHHO7fTmvwv
     */
  uuid: string | undefined

  /**
     * socketId
     * @example Pc8t1G7BcmvCVGrbAAAF
     */

  socketId: string | undefined

  /**
     * 房间进入成语(4个字)
     * @example '指点江山'
     */
  words: string | undefined

  /**
     * topicId
     * @example 1
     */
  topicId: number | undefined

  /**
    * nickName
    * @example 山北杨
    */
  nickName: string | undefined
}

export class FindRoomResponse {
  /**
    * 房间唯一标识
    * @example ['xxxxxx']
    */
  roomId: string
  /**
    * 房间身份
    * @example Master
    */
  role: SocketRole
  constructor(roomId: string, role: SocketRole) {
    this.roomId = roomId
    this.role = role
  }
}
