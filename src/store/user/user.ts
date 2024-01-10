import {
  deleteUser,
  getCurrentUser,
  userLogin,
  userLoginOut,
  userRegister,
  userSearch
} from '@/service/user/user'
import { defineStore } from 'pinia'
import type { IUser } from '@/type'
import router from '@/router'
// import Cookies from 'js-cookie'

interface userState {
  userData: any
  searchData: any
  userRole: number
}

const useUserStore = defineStore('login', {
  state: (): userState => ({
    userData: {},
    searchData: [],
    userRole: -1
  }),
  actions: {
    async fetchUserLogin(userInfo: IUser) {
      const res = await userLogin(userInfo)
      if (res.data) {
        router.push('/main')
      }
    },
    async fetchUserRegister(registerInfo: IUser) {
      const res = await userRegister(registerInfo)
      if (res.code === 0) {
        router.back()
      }
    },
    async fetchCurrentUser() {
      const res = await getCurrentUser()
      if (res.data) {
        this.userData = res.data
        this.userRole = res.data.userRole
        this.fetchUserSearch()
      }
    },
    async fetchUserLoginOut() {
      const res = await userLoginOut()
      if (res.code === 0) {
        router.push('/login')
      }
    },
    async fetchUserSearch(username?: string) {
      const res = await userSearch(username)
      if (res.data) {
        this.searchData = res.data
      }
    },
    async fetchDeleteUser(id: number) {
      const res = await deleteUser(id)
      if (res.code === 0) {
        this.fetchUserSearch()
      }
    }
  }
})

export default useUserStore
