/**
 * @name: httpClient.ts
 * @author: river
 * @contact: laolei@forkway.cn
 * @description：封装自定义axios
 */
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import qs from 'qs'
import startsWith from 'lodash/startsWith'
import cloneDeep from 'lodash/cloneDeep'
import {
  ContentType,
  RequestMethod,
} from './type'
import type {
  HttpClientConfig,
  RequestOptions,
  RequestParams,
  RootResponseModel,
  UploadFileParams,
} from './type'
import { Convert, isFunction } from './tool.axios'
import { AxiosCanceler } from './cancel.axios'

export default class HttpClient {
  public readonly defaultConfig: HttpClientConfig
  private httpClient: AxiosInstance

  constructor(options: HttpClientConfig = {}) {
    this.httpClient = axios.create(options)
    this.defaultConfig = options
    this.setupInterceptors()
  }

  /**
   * @description:  Create axios instance
   */
  private createAxios(config: HttpClientConfig): void {
    this.httpClient = axios.create(config)
  }

  /**
   * @description: Reconfigure axios
   */
  configAxios(config: HttpClientConfig) {
    if (!this.httpClient)
      return

    this.createAxios(config)
  }

  /**
   * @description: Set general header
   */
  setHeader(headers: any): void {
    if (!this.httpClient)
      return

    Object.assign(this.httpClient.defaults.headers, headers)
  }

  /**
   * @description: 封装请求类
   * @param {RequestMethod} method 请求方式
   * @param {path} path 请求路径
   * @param {RequestParams} params 参数
   * @param {ContentType} contentType http配置
   * @param {RequestOptions} optionsSource
   * @return {*}
   */

  async requests<T>(
    path = '',
    method: RequestMethod = RequestMethod.GET,
    params?: RequestParams,
    contentType: ContentType = ContentType.JSON,
    optionsSource?: HttpClientConfig,
  ) {
    const options: HttpClientConfig = Object.assign({}, this.defaultConfig, optionsSource)
    const { headers } = options
    headers!['Content-type'] = contentType
    const allParams = Object.assign({}, this.defaultConfig.defaultParams, params)

    const requestConfig: HttpClientConfig = {
      url: `${path}`,
      method,
      headers,
    }
    if (method === RequestMethod.GET)
      requestConfig.params = allParams

    else if (contentType === ContentType.FORM)
      requestConfig.data = qs.stringify(allParams)

    else
      requestConfig.data = JSON.stringify(allParams)

    return this.httpClient
      .request(requestConfig)
      .then((res) => {
        const data: string = JSON.stringify(res.data)
        const status = res.status.toString()
        if (startsWith(status, '20'))
          return Convert.jsonToModel(data) as T

        return Promise.reject(data)
      })
      .catch(async (error) => {
        return Promise.reject(error)
      })
  }

  private getTransform() {
    const { transform } = this.defaultConfig
    return transform
  }

  private setupInterceptors() {
    const transform = this.getTransform()
    if (!transform)
      return null

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform
    const axiosCanceler = new AxiosCanceler()

    // Request interceptor configuration processing
    this.httpClient.interceptors.request.use((config: AxiosRequestConfig) => {
      // If cancel repeat request is turned on, then cancel repeat request is prohibited
      const {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        headers: { ignoreCancelToken },
      } = config
      const ignoreCancel
        = ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.defaultConfig.requestOptions?.ignoreCancelToken
      ignoreCancel && axiosCanceler.addPending(config)
      if (requestInterceptors && isFunction(requestInterceptors))
        config = requestInterceptors(config, this.defaultConfig)

      return config
    }, undefined)

    // Request interceptor error capture
    requestInterceptorsCatch
      && isFunction(requestInterceptorsCatch)
      && this.httpClient.interceptors.request.use(undefined, requestInterceptorsCatch)

    // Response result interceptor processing
    this.httpClient.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config)
      if (responseInterceptors && isFunction(responseInterceptors))
        res = responseInterceptors(res)

      return res
    }, undefined)

    // Response result interceptor error capture
    responseInterceptorsCatch
      && isFunction(responseInterceptorsCatch)
      && this.httpClient.interceptors.response.use(undefined, responseInterceptorsCatch)
  }

  /**
   * @description: add support for FormData
   */
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.defaultConfig.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type']

    if (
      contentType !== ContentType.FORM
      || !Reflect.has(config, 'data')
      || config.method?.toUpperCase() === RequestMethod.GET
    )
      return config

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    }
  }

  /**
   * @description:  File Upload
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData()
    const customFilename = params.name || 'file'

    if (params.filename)
      formData.append(customFilename, params.file, params.filename)

    else
      formData.append(customFilename, params.file)

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key]
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item)
          })
          return
        }

        formData.append(key, params.data![key])
      })
    }

    return this.httpClient.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentType.FORM,
        'ignoreCancelToken': true,
      },
    })
  }

  /*
   * 通用的 request 请求
   */
  async request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: HttpClientConfig = cloneDeep(config)
    const transform = this.getTransform()

    const { requestOptions } = this.defaultConfig

    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    const { beforeRequestHook, transformFailResponseHook, transformSuccessResponseHook }
      = transform || {}
    if (beforeRequestHook && isFunction(beforeRequestHook))
      conf = await beforeRequestHook(conf, opt)

    conf.requestOptions = opt

    conf = this.supportFormData(conf)
    // request 的类型不需要从 root 写起
    return new Promise((resolve, reject) => {
      this.httpClient
        .request<any, AxiosResponse<RootResponseModel>>(conf)
        .then((res: AxiosResponse<RootResponseModel>) => {
          if (transformSuccessResponseHook && isFunction(transformSuccessResponseHook)) {
            try {
              const ret = transformSuccessResponseHook(res, opt)
              resolve(ret)
            }
            catch (err) {
              reject(err || new Error('request error!'))
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          if (transformFailResponseHook && isFunction(transformFailResponseHook)) {
            reject(transformFailResponseHook(e as AxiosError, opt))
            return
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e)
        })
    })
  }

  /*
   *下面单独暴露方法，避免重复调用
   */
  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  patch<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PATCH' }, options)
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }

  download<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request(
      { ...config, method: 'GET', responseType: 'blob' },
      { ...options, isTransformResponse: false },
    )
  }
}
