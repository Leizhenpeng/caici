import { http } from '../axios'
import type { RootResponseModel } from '../axios/type'

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

