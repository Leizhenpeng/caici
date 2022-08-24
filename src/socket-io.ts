export const NAMESPACE = '/together'
export const ROOM_PREFIX = 'CaiciRoom'

// 动词开头为发送给客户端数据，名词开头为接收客户端数据
export const MsgDefault = 'message' // don't change !
export const RoomJoinIn = 'ri' // no need
export const RoomLeaveOut = 'ro'
export const NicknameChange = 'nnc'
export const PlayerIntroduce = 'pi'
export const PlayerChangeInfo = 'pci'

// p 个人发送 r 房间广播
export const CheckRoomInit = 'p:cri' // 返回当前房间信息
export const CheckRoomUpdate = 'r:cru' // 更新当前房间信息
export const WelcomeNewPlayer = 'r:wnp' // 新人加入房间
export const ByeOldPlayer = 'r:btp' // 离开房间
export const BroadcastChangeName = 'r:bcn' // 修改昵称
export const BroadcastChangeMaster = 'r:bcm' // 修改房主
export const StartGame = 'r:sg'
