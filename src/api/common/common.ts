import { http } from '../axios'
import type { RootResponseModel } from '../axios/type'
import type { AllTopicResponse, FindShiciInfoReponse, fetchShiciMetaResponse } from './common.dto'

enum ECommonApi {
  checkHealth = '/',
  getAllTopic = '/Topic/all',
  getWorkIdByAnswer = '/answer/shici/find-id',
  getWorkById = '/answer/shici/detail',
}

export const checkHealth = () => {
  return http.get<RootResponseModel<string>>(
    {
      url: ECommonApi.checkHealth,
    },
  )
}

export const getAllTopic = () => {
  return http.get<AllTopicResponse[]>(
    {
      url: ECommonApi.getAllTopic,
    },
  )
}

export const getWorkId = (answer: string) => {
  return http.post<fetchShiciMetaResponse>(
    {
      url: ECommonApi.getWorkIdByAnswer,
      data: {
        sentence: answer,
        wordNum: answer.length,
      },
    },
  )
}

export const findWorkById = (id: string) => {
  return http.post<FindShiciInfoReponse>(
    {
      url: ECommonApi.getWorkById,
      data: {
        workId: id,
      },
    },
  )
}
