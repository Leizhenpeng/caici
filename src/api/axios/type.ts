/**
 * @name: type.ts
 * @author: river
 * @contact: laolei@forkway.cn
 * @description：axions 有关的类型定义
 */

import type { AxiosRequestConfig } from 'axios'
import type { AxiosTransform } from './hook.axios'

/*
 *请求类型
 */
export enum ContentType {
  FORM = 'application/x-www-form-urlencoded;charset=UTF-8',
  JSON = 'application/json; charset=utf-8;charset=UTF-8',
  MULTIPART = 'multipart/form-data;charset=UTF-8',
}

/*
 *request result
 */
export const ResultCode = {
  SUCCESS: [200, 201],
  ERROR: 1,
  TIMEOUT: 401,
  TYPE: 'success',
}

/*
 *请求方法
 */
export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

/**
 * 网络请求参数
 */
export interface RequestParams {
  [key: string]: any
}

/*
 * 报错模式
 */
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

/*
 * 基本的 response 结果
 */
export interface RootResponseModel<T = any> {
  code: number
  message: string
  data: T
}

export interface UploadFileParams {
  // Other parameters
  data?: Recordable
  // File parameter interface field name
  name?: string
  // file name
  file: File | Blob
  // file name
  filename?: string
  [key: string]: any
}

/*
 *自定义配置
 */
export interface RequestOptions {
  // 自定义token头
  authenticationScheme?: string
  // Splicing request parameters to url
  joinParamsToUrl?: boolean
  // Format request parameter time
  formatDate?: boolean
  // Whether to process the request result
  isTransformResponse?: boolean
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean
  // 对返回错误处理
  isTransformFailResponse?: boolean
  // Whether to join url
  joinPrefix?: boolean
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string
  // 请求拼接路径
  urlPrefix?: string
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode
  // Whether to add a timestamp
  joinTime?: boolean
  ignoreCancelToken?: boolean
  // Whether to send token in header
  withToken?: boolean
  // x-auth-schema default set ADMIN
  authSchemaAdmin?: boolean
  // 是否开启打印
  log?: boolean
  // 是否开启 message 加载进度提醒,留空或者不传为不提醒,或者直接传入需要提醒的内容
  msgTip?: boolean | string
  // 是否在请求前根据上一次请求的时间,自动取 refresh token
  ifAutoRefresh?: boolean
}

/*
 *配置汇总
 */
export interface HttpClientConfig extends AxiosRequestConfig {
  defaultParams?: RequestParams
  // 自定义请求配置
  requestOptions?: RequestOptions
  // 需要实现的拦截器
  transform?: AxiosTransform
}

export type Recordable<T = any> = Record<string, T>

