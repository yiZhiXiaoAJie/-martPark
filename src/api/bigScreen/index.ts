import request from '@/utils/request'
import type { BarList } from './type'

/* 柱状图数据 */

export const getBarData = () => {
  return request<BarList>({
    url: '/park/statistics/info',
    method:'get'
  })
}
