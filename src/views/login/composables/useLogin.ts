import { ref, reactive, type Ref } from 'vue'
import type { LoginParams } from '@/api/login/type'
import type { FormInstance } from 'element-plus'
import { useToken } from '@/stores/authToken'
interface UseLoginReturn {
  loginForm: Ref<FormInstance | null>
  loginQuery: LoginParams
  handelLogin: () => void
}
export const useLogin = (): UseLoginReturn => {
  const store = useToken()
  const loginForm = ref<FormInstance>()
  const loginQuery = reactive<LoginParams>({
    username: 'demo',
    password: 'zh@hm#23'
  })
  const handelLogin = () => {
    loginForm.value?.validate((valid) => {
      if (valid) {
        store.getToken(loginQuery)
      }
    })
  }
  return { loginForm, loginQuery, handelLogin } as UseLoginReturn
}
