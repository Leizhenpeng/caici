import { http } from '../axios'
import type { RootResponseModel } from '../axios/type'
import type { AllTopicResponse } from './common.dto'

enum ECommonApi {
  checkHealth = '/',
  getAllTopic = '/Topic/all',
}

export const checkHealth = () => {
  return http.get<RootResponseModel<string>>(
    {
      url: ECommonApi.checkHealth,
    },
  )
}

export const getAllTopic = () => {
  return http.get<RootResponseModel<AllTopicResponse[]>>(
    {
      url: ECommonApi.getAllTopic,
    },
  )
}

