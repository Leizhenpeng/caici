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
      cache: {
        maxAge: 60 * 60 * 1000,
      },
    },
    {
      joinTime: false, // 取消添加时间戳,这样才能命中缓存
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
  return http.get<FindShiciInfoReponse>(
    {
      url: ECommonApi.getWorkById,
      params: {
        workId: id,
      },
      cache: {
        maxAge: 60 * 60 * 1000,
      },
    }, {
      joinTime: false,
    },
  )
}
