import type { SocketRole } from '~/state'
import type { TogetherGameMode } from '~/storage'

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

  /**
   * 游戏模式
   * @example cooperation
   */
  gameMode: string | undefined
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

export class MetaRoomEntity {
  uniDoor: string | undefined
  wordRaw: string | undefined
  wordHash: string | undefined
  topicId: number | undefined
  answerId: number | undefined
  masterId: string | undefined
  status: string | undefined
  mode: TogetherGameMode | undefined
  createAt: string | undefined
  total?: number
  constructor(
    param: any,
  ) {
    Object.assign(this, param)
  }
}

export class ifOngameResponse {
  /**
   * 是否正在游戏中
   * @example true
   */
  ifOnGame: boolean
  /**
   * 房间唯一标识
   * @example ['xxxxxx']
   */
  roomId?: string
  constructor(ifOnGame: boolean, roomId?: string) {
    this.ifOnGame = ifOnGame
    this.roomId = roomId
  }
}

export class ifRoomIdAccessibleResponse {
  /**
   * 是否可访问
   * @example true
   */
  ifAccessible: boolean
  constructor(ifAccessible: boolean) {
    this.ifAccessible = ifAccessible
  }
}

export class playerInfo {
  userGenId: number
  nickName?: string

  constructor(genId: number, nickName?: string) {
    this.userGenId = genId
    this.nickName = nickName
  }
}
export class roomBaseInfoResponse {
  /**
   * 房间唯一标识
   * @example CaiciRoom-3DKBZ40k_GmXy3VorHkS0
   */
  roomId?: string

  /**
   * 房间模式
   * @example 'COOPERATION'
   */
  playMode?: TogetherGameMode | string

  /**
   * topicId
   * @example 5
   */
  topicId?: number

  /** answer
   */
  answer?: string

  /**
   * 提醒单词
   */
  hintWord?: string

  /** player info */
  playerInfos?: playerInfo[]

  constructor(
    roomId?: string,
    playMode?: TogetherGameMode | string,
    topicId?: number,
    answer?: string,
    hintWord?: string,
  ) {
    this.roomId = roomId
    this.playMode = playMode
    this.topicId = topicId
    this.answer = answer
    this.hintWord = hintWord
  }
}
