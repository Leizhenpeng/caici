import { http } from '../axios'
import type { RootResponseModel } from './test.dto'

enum ETestApi {
  checkHealth = '/',
}

export const checkHealth = () => {
  return http.get<RootResponseModel<string>>(
    {
      url: ETestApi.checkHealth,
    },
  )
}
