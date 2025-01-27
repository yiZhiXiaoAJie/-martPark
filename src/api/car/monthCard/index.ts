import request from '@/utils/request'
import type {
  CheckData,
  MonthCarList,
  MonthCarParams,
  Proportion,
  addMonthCardParams,
  renewMonthCardQuery
} from './type'

// 获取月卡列表
export const getMonthCardList = (data: MonthCarParams) => {
  return request<MonthCarList>({
    url: '/parking/card/list',
    method: 'get',
    data
  })
}

// 获取月卡占有率
export const getMonthCardRate = () => {
  return request<Proportion>({
    url: '/parking/card/proportion',
    method: 'get'
  })
}

// 添加月卡
export const addMonthCard = (data: addMonthCardParams) => {
  return request({
    url: '/parking/card',
    method: 'post',
    data
  })
}

// 查看月卡详情
export const getMonthCardDetail = (Id: { Id: number | string }) => {
  return request<CheckData>({
    url: `/parking/card/${Id.Id}`,
    method: 'get'
  })
}

// 月卡续费
export const renewMonthCard = (data: renewMonthCardQuery) => {
  return request({
    url: '/parking/card/recharge',
    method: 'post',
    data
  })
}

// 删除月卡
export const deleteMonthCard = (ids: { ids: number | string | string[] }) => {
  return request({
    url: `/parking/card/${ids.ids}`,
    method: 'delete'
  })
}

// 编辑月卡
export const editMonthCard = (data: addMonthCardParams) => {
  return request({
    url:'/parking/card/edit',
    method:'put',
    data
  })
}