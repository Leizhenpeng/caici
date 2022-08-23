import { http } from '../axios'
import type { DeviceIdResponse } from './user.dto'

enum EUserApi {
  lookUp = '/users/device',
}

export const SignUpDeviceId = (fingerprint: string) => {
  return http.post<DeviceIdResponse>({
    url: EUserApi.lookUp,
    data: { deviceId: fingerprint },
  })
}
