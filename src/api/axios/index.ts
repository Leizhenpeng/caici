/**
 * @name: index
 * @author: river
 * @date: 2022/3/21 11:52 下午
 * @contact: laolei@forkway.cn
 * @description：axios 接口导出文件
 */

import { netConfig } from './config.axios'
import { customTransform } from './hook.axios'
import HttpClient from './httpClient.axios'
import { ContentType } from './type'

function httpClient() {
  return new HttpClient({
    timeout: 10 * 1000,
    headers: { 'Content-Type': ContentType.JSON },
    transform: customTransform,
    requestOptions: {
      // 接口地址
      apiUrl: netConfig.apiBase,
      // 自定义token头
      authenticationScheme: 'Bearer',
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性,注意同时在 get 接口处修改返回值的类型
      isReturnNativeResponse: false,
      // 需要对返回数据进行处理 //false ,直接返回 rawResp.data
      isTransformResponse: false,
      // 对返回错误处理
      isTransformFailResponse: true,
      // post请求的时候添加参数到url,后端 query 接受
      joinParamsToUrl: false,
      // 格式化提交参数时间
      formatDate: true,
      // 消息提示类型
      errorMessageMode: 'message',
      // 默认将prefix 添加到url
      joinPrefix: true,
      // 接口拼接地址：/v1
      urlPrefix: netConfig.apiUrlPrefix,
      //  是否加入时间戳
      joinTime: true,
      // 忽略重复请求,true则会忽略重复性请求
      // 如果需要关闭,在 header 中携带ignoreCancelToken:false即可.
      ignoreCancelToken: true,
      // 默认是否携带token, just default behavior.
      withToken: true,
      // log res for develop
      authSchemaAdmin: true,
      log: false, // false 就不会打印很多调试内容
      msgTip: false, // 不填就是不会给 msg tip 信息,false
      ifAutoRefresh: true, // 账户 login 的接口就不能先 refresh
    },
  })
}
const http = httpClient()
export { http }
