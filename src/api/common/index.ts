import request from '@/utils/request'
import type { UserInfo, menusData } from './type'

// 获取左侧菜单
export const getLeftMenu = () => {
    return request<menusData[]>({
        url: '/park/user/router',
        method: 'get'
    })
}

/* 获取用户 */

export const getUserInfo = () => {
 return request<UserInfo>({
        url: '/park/user/profile',
        method: 'get'
 })
}