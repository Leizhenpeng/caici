export class PlayerInfo {
  userGenId: number
  nickName?: string
  hintLevel?: number

  constructor(userGenId: number) {
    this.userGenId = userGenId
  }
}
