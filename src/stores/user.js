// 全局存储变量pinia
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  persist: true,
  state: () => {
    return {
      // 存储用户token和是否是管理员变量
      token: '',
      isAdmin: undefined
    }
  }
})
