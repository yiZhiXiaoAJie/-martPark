import request from '@/utils/request'
import type { WorkbenchData } from './type'

// 获取工作台数据
export const getWorkbenchData = () => {
  return request<WorkbenchData>({
    url:'/park/statistics/info',
    method:'get',
  })
}