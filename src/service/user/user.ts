import type { IUser } from '@/type'
import myRequest from '..'

export function userLogin(userInfo: IUser) {
  return myRequest.post({
    url: '/api/user/login',
    data: userInfo
  })
}

export function userRegister(registerInfo: IUser) {
  return myRequest.post({
    url: '/api/user/register',
    data: registerInfo
  })
}

export function getCurrentUser() {
  return myRequest.get({
    url: '/api/user/current'
  })
}

export function userLoginOut() {
  return myRequest.post({
    url: '/api/user/logout'
  })
}

export function userSearch(username: string = '') {
  return myRequest.get({
    url: `/api/user/search?username=${username}`
  })
}

export function deleteUser(id: number) {
  return myRequest.post({
    url: `/api/user/delete?id=${id}`
  })
}
