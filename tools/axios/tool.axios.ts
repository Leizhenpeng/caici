/**
 * @name: tool.axios.ts
 * @author: river
 * @contact: laolei@forkway.cn
 * @description：一些辅助工具函数
 */

import type { Recordable } from './type'

const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined'
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val)
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val))
    return val.length === 0

  if (val instanceof Map || val instanceof Set)
    return val.size === 0

  if (isObject(val))
    return Object.keys(val).length === 0

  return false
}

export function isDate(val: unknown): val is Date {
  return is(val, 'Date')
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val)
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val)
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number')
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp')
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}

export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window')
}

export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName
}

export function isMap(val: unknown): val is Map<any, any> {
  return is(val, 'Map')
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

export function isUrl(path: string): boolean {
  const reg
    = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

export function isMail(val: string): boolean {
  const reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
  return reg.test(val)
}

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function joinTimestamp<T extends boolean>(
  join: boolean,
  restful: T
): T extends true ? string : object

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join)
    return restful ? '' : {}

  const now = new Date().getTime()
  if (restful)
    return `?_t=${now}`

  return { _t: now }
}

/**
 * @description: Format request parameter time
 */
export function formatRequestDate(params: Recordable) {
  if (Object.prototype.toString.call(params) !== '[object Object]')
    return

  for (const key in params) {
    if (params[key] && params[key]._isAMomentObject)
      params[key] = params[key].format(DATE_TIME_FORMAT)

    if (isString(key)) {
      const value = params[key]
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value
        }
        catch (error: any) {
          throw new Error(error)
        }
      }
    }
    if (isObject(params[key]))
      formatRequestDate(params[key])
  }
}

/*
obj 放进 url 中
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj)
    parameters += `${key}=${encodeURIComponent(obj[key])}&`

  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

export class Convert {
  /**
   * @description:  json转model
   * @param {string} json
   * @return {*}
   */
  public static jsonToModel<T>(json: string): T {
    return JSON.parse(json) as T
  }

  /**
   * @description: model转json
   * @param {any} model
   * @return {*}
   */
  public static modelToJson(model: any): string {
    return JSON.stringify(model)
  }
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target)
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])

  return src
}
