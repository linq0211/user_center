import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MyRequestConfig } from './type'

// 拦截器: 蒙版Loading/token/修改配置
/**
 * 两个难点:
 * 1.拦截器进行精细控制
 * > 全局拦截器
 * > 实例拦截器
 * > 单次请求拦截器
 *
 * 2.响应结果的类型处理(泛型)
 */

class MyRequest {
  instance: AxiosInstance

  // request实例 => axios的实例
  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)

    // 跨域请求是否提供凭据信息
    // this.instance.defaults.withCredentials = true

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )
    // 针对特定的MyRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn as any,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }
  request<T = any>(config: MyRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default MyRequest
