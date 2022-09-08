import { http } from '../axios'
import type { DeviceIdResponse } from './user.dto'

enum EUserApi {
  DeviceSignUp = '/users/device',
  GenRandomNickname = '/users/nickname',
  GenRandomTip = '/users/tip',
}

export const SignUpDeviceId = (fingerprint: string) => {
  return http.post<DeviceIdResponse>({
    url: EUserApi.DeviceSignUp,
    data: { deviceId: fingerprint },
  })
}

export const genRandomNickname = () => {
  return http.get<string>({
    url: EUserApi.GenRandomNickname,
  })
}

export const getRandomTip = (type = 'HINT') => {
  return http.get<string>({
    url: EUserApi.GenRandomTip,
    params: { type },
    headers: { ignoreCancelToken: false },
  }, {
    joinTime: false,
  })
}

