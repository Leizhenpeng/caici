export class DeviceIdResponse {
  constructor(deviceId: string, generateId: number) {
    Object.assign(this, { deviceId, generateId })
  }

  deviceId: string | undefined
  generateId: number | undefined
}
