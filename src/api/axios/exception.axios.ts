/**
 * @author: river
 * @contact: laolei@forkway.cn
 * @description：配合后端存储报错类型
 */

import type { ComputedRef } from 'vue'
import { computed } from 'vue'
export interface ExceptionItem {
  error: string
  name: string
  httpCode: string
  Message: string
}

export const ExceptionList: ComputedRef<ExceptionItem[]> = computed(() => {
  return []
})
