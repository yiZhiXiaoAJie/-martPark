import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getLogin } from '@/api/login/index'
import type { LoginParams } from '@/api/login/type'
import router from '@/router'

export const useToken = defineStore(
  'token',
  () => {
    const token = ref<string | null>('')

    const getToken = async (auth: LoginParams) => {
      try {
        const res = await getLogin(auth)
        if (res.code === 10000) {
          token.value = res.data.token

          console.log(res)
          router.push('/admin')
        } else {
          console.error('Login failed with code:', res.code)
        }
      } catch (error) {
        console.error('Login failed:', error)
      }
    }

    return { token, getToken }
  },
  {
    persist: {
      paths: ['token']
    }
  }
)
