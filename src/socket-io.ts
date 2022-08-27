export const NAMESPACE = '/together'
export const ROOM_PREFIX = 'CaiciRoom'

// 服务端接收客户端消息
// 动词开头为发送给客户端数据，名词开头为接收客户端数据
export const MsgDefault = 'message' // don't change !
export const RoomJoinIn = 'ri' // no need
export const RoomLeaveOut = 'ro'
export const NicknameChange = 'nnc'
export const PlayerIntroduce = 'pi'
export const PlayerChangeInfo = 'pci'
export const RoomGameModeChange = 'rgmc'
export const RoomGameTopicChange = 'rgtc'
export const RoomGameStart = 'rgs'

// 服务端发送给客户端的事件
// p 对个人发送 r 对房间广播
export const CheckRoomInit = 'p:cri' // 返回当前房间信息
export const CheckRoomUpdate = 'r:cru' // 更新当前房间信息
export const WelcomeNewPlayer = 'r:wnp' // 新人加入房间
export const ByeOldPlayer = 'r:btp' // 离开房间
export const BroadcastChangeName = 'r:bcn' // 修改昵称
export const BroadcastChangeMaster = 'r:bcm' // 修改房主
export const BroadcashStartGame = 'r:bsg' // 开始游戏
