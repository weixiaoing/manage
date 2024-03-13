import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  persist: true,
  state: () => {
    return {
      token: '',
      isAdmin: undefined
    }
  }
})
