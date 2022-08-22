/**
 * @author: river
 * @contact: laolei@forkway.cn
 * @description：axios有关的配置文件
 */

const netConfig = {
  apiBase: import.meta.env.VITE_API_BASEURL,
  apiUrlPrefix: import.meta.env.VITE_API_PREFIX,
  timedOut: 10 * 1000,
}

export { netConfig }
