/* eslint-disable no-console */
/**
 * @author: river
 * @contact: laolei@forkway.cn
 * @description：拦截操作的抽象类
 */
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { checkStatus } from './status.axios'
import { formatRequestDate, isString, joinTimestamp, setObjToUrlParams } from './tool.axios'
import type { HttpClientConfig, Recordable, RequestOptions, RootResponseModel } from './type'
import { RequestMethod, ResultCode } from './type'
// 本地自动刷新 token 的时间周期
// 这个值一定要比后端的短一些
// const tokenTimeOut = 10 * 60 * 1000

// 定义一个flag 判断是否刷新Token中
// const isRefreshing = false
// 保存需要重新发起请求的队列
// const retryRequests = []

export abstract class AxiosTransform {
  /**
   * @description: 处理 httpClient 的config
   */
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions
  ) => Promise<AxiosRequestConfig>

  /**
   * @description: 请求成功之后处理
   */
  transformSuccessResponseHook?: (
    res: AxiosResponse<RootResponseModel>,
    options: RequestOptions
  ) => any

  /**
   * @description: 请求失败处理
   */
  transformFailResponseHook?: (e: AxiosError, options: RequestOptions) => any

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: HttpClientConfig
  ) => AxiosRequestConfig

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: Error) => void
}

export const customTransform: AxiosTransform = {
  /*
   *请求之前处理config,利用 get/post/等函数实例的配置
   */
  beforeRequestHook: async (config, options) => {
    const {
      apiUrl,
      joinPrefix,
      joinParamsToUrl,
      formatDate,
      joinTime = true,
      urlPrefix,
      // msgTip,
      log,
      // ifAutoRefresh,
    } = options
    // const permissionsStore = usePermissionsStore()
    // const ifNeedRefreshToken = permissionsStore.judgeIfNeedRefreshToken()
    // if (ifAutoRefresh && ifNeedRefreshToken && !isRefreshing) {
    //   isRefreshing = true
    //   await permissionsStore
    //     .refreshFromBackendToken()
    //     .then((res: any) => {
    //       if (res)
    //         console.log('刷新token成功')

    //       else
    //         console.log('刷新token失败')
    //     })
    //     .finally(() => {
    //       isRefreshing = false
    //     })
    // }
    log && console.log('beforeRequestHook')
    // if (msgTip)
    //   antMsg.loading({ content: `${msgTip}...`, duration: 2, key: msgTip as string })

    if (joinPrefix)
      config.url = `${urlPrefix}${config.url}`

    if (apiUrl && isString(apiUrl))
      config.url = `${apiUrl}${config.url}`

    const params = config.params || {}
    const data = config.data || false
    formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === RequestMethod.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      }
      else {
        // 兼容restful风格
        config.url = `${config.url + params}${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    }
    else if (!isString(params)) {
      formatDate && formatRequestDate(params)
      if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
        config.data = data
        config.params = params
      }
      else {
        // 非GET请求如果没有提供data，则将params视为data
        config.data = params
        config.params = undefined
      }
      if (joinParamsToUrl) {
        config.url = setObjToUrlParams(
          config.url as string,
          Object.assign({}, config.params, config.data),
        )
      }
    }
    else {
      // 兼容restful风格
      config.url = config.url + params
      config.params = undefined
    }
    return config
  },

  /**
   * @description: 处理成功请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformSuccessResponseHook: (
    res: AxiosResponse<RootResponseModel>,
    options: RequestOptions,
  ) => {
    // const { msgTip } = options

    // options.log && console.log(res) && console.log('transformRequestHook')
    // if (msgTip)
    //   antMsg.success({ content: msgTip + $t('api.success'), duration: 2, key: msgTip as string })

    // const { t } = i18n.global
    const { isTransformResponse, isReturnNativeResponse } = options
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse)
      return res

    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse)
      return res.data

    // 错误的时候返回

    const { data } = res

    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error('sys.api.apiRequestFailed')
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, data: result } = data

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = data && Reflect.has(data, 'code') && ResultCode.SUCCESS.includes(code)
    if (hasSuccess)
      return result

    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    // const permissionsStore = usePermissionsStore()
    const timeoutMsg = 'error'
    // switch (code) {
    //   case ResultCode.TIMEOUT:
    //     permissionsStore.logout()
    //     break
    //   default:
    //     if (message)
    //       timeoutMsg = message
    // }
    // todo 抽出 model
    // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    // if (options.errorMessageMode === 'modal') {
    //   createErrorModal({ title: t('sys.api.errorTip'), content: timeoutMsg })
    // } else if (options.errorMessageMode === 'message') {
    //   createMessage.error(timeoutMsg)
    // }

    throw new Error(timeoutMsg)
  },

  /**
   * @description:处理失败请求服务器的数据
   */
  transformFailResponseHook: (e: AxiosError, options: RequestOptions) => {
    options.log && console.log('transformFailResponseHook')
    options.log && console.log(e.response)
    options.log && console.log(e)
    const { isTransformFailResponse } = options
    // if (msgTip) {
    // 我们设置了报错代码对应的信息提醒,所以移到 responseInterceptorsCatch 的 hook
    //   antMsg.warn({ content: msgTip + '失败', duration: 1, key: msgTip as string })
    // }
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformFailResponse)
      return e

    return e.response?.data
    // 错误的时候返回
  },
  /**
   * @description: 请求拦截器处理,基于默认的类配置
   */
  requestInterceptors: (config, options) => {
    options.requestOptions?.log && console.log('requestInterceptors')
    const requestOptions = (config as Recordable)?.requestOptions
    const { withToken, authSchemaAdmin } = requestOptions
    if (withToken !== false) {
      // 请求之前处理config
      // const permissionsStore = usePermissionsStore()
      // const token = permissionsStore.getJwtToken
      // if (token) {
      //   // jwt token
      //   const authSchema = (config as Recordable)?.requestOptions?.authenticationScheme
      //     ; (config as Recordable).headers.Authorization = authSchema
      //     ? `${authSchema} ${token}`
      //     : token
      // }
    }
    if (authSchemaAdmin !== false)
      (config as Recordable).headers['x-auth-schema'] = 'ADMIN'

    return config
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    // options.log && console.log('responseInterceptors')

    return res
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    // const { t } = i18n.global
    // const errorLogStore = useErrorLogStoreWithOut()
    // errorLogStore.addAjaxErrorInfo(error)
    const { response, code, message, config } = error || {}
    // console.log(error.response)
    const ifLog = config?.requestOptions.log as boolean
    ifLog && console.log('responseInterceptorsCatch')
    // const msgTip = response.config.requestOptions.msgTip
    const customExceptionCode = response?.data?.code
    const customExceptionData = response?.data?.data
    /* 能找到报错信息的,就精准报错,找不多的,直接说失败 */
    // const ExceptionItem = R.find(R.propEq('error', `${customExceptionCode}`))(
    //   ExceptionList.value,
    // ) as ExceptionItem
    // const ExceptionTip = ExceptionItem?.Message
    // if (msgTip) {
    //   antMsg.warn({
    //     content: ExceptionTip ?? msgTip + $t('api.fail'),
    //     duration: 1,
    //     key: msgTip as string,
    //   })
    // }
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
    // const msg: string = response?.data?.data?.error?.message ?? ''
    const err: string = error?.toString?.() ?? ''

    // local network error
    let errMessage = ''
    try {
      if (code === 'ECONNABORTED' && message.includes('timeout'))
        errMessage = 'sys.api.apiTimeoutMessage'

      if (err?.includes('Network Error'))
        errMessage = 'sys.api.networkExceptionMsg'
        // antMsg.error('Network Error')

      if (errMessage) {
        ifLog && console.log(errMessage)
        // if (errorMessageMode === 'modal') {
        //   createErrorModal({ title: t('sys.api.errorTip'), content: errMessage })
        // } else if (errorMessageMode === 'message') {
        //   createMessage.error(errMessage)
        // }
        return Promise.reject(error)
      }
    }
    catch (error) {
      throw new Error(error as unknown as string)
    }
    checkStatus(customExceptionCode, customExceptionData, errorMessageMode)
    return Promise.reject(error)
  },
}
