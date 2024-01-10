import { BASE_URL, TIME_OUT } from './config'
import MyRequest from './request'

const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 跨域请求是否提供凭据信息
  withCredentials: true
})

export default myRequest
