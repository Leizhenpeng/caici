/**
 * @name: status.axios.ts
 * @author: river
 * @date: 2022/3/22 8:20 上午
 * @contact: laolei@forkway.cn
 * @description：
 */
import find from 'lodash/find'
// import type { ErrorMessageMode } from './type'
import { ExceptionList } from './exception.axios'

// const { createMessage, createErrorModal } = useMessage()
// const error = createMessage.error!
// const stp = projectSetting.sessionTimeoutProcessing

export function checkStatus(
  status: number,
  msg: string,
  // errorMessageMode: ErrorMessageMode = 'message',
  ifLog: boolean,
): void {
  // const { t } = i18n.global
  // const permissionsStore = usePermissionsStore()

  // log exception Name
  const exceptionOut = find(ExceptionList, ['error', `${status}`])
  // eslint-disable-next-line no-console
  ifLog && console.log(exceptionOut)

  // special func about code
  switch (status) {
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 10117:
      // permissionsStore.setJwtToken('')
      // permissionsStore.logout()

      break
    default:
  }
  // if (errMessage) {
  //   if (errorMessageMode === 'modal') {
  //     createErrorModal({ title: t('sys.api.errorTip'), content: errMessage })
  //   } else if (errorMessageMode === 'message') {
  //     error({ content: errMessage, key: `global_error_message_status_${status}` })
  //   }
  // }
}
