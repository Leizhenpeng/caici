/**
 * @author: river
 * @contact: laolei@forkway.cn
 * @description：axios有关的配置文件
 */

const netConfig = {
  apiBase: import.meta.env.VITE_API_BASEURL,
  apiUrlPrefix: import.meta.env.VITE_API_PREFIX,
  timedOut: 10 * 1000,
  cacheTime: 60 * 1000, // 默认全局缓存时间, 注意不能携带时间戳, 那个接口
}

export { netConfig }
