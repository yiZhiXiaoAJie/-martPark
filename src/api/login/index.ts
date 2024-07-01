import request from '@/utils/request'
import type { LoginParams, LoginToken } from './type'

// 登录

export const getLogin = (data:LoginParams) => {
  return request<LoginToken>({
    url: '/park/login',
    method: 'post',
    data
  })
}
