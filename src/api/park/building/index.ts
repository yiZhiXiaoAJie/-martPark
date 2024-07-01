import request from '@/utils/request'
import type { BuildingAddAndEditQuery, BuildingData, BuildingQuery } from './type'

// 获取楼宇列表
export const getBuildingList = (data: BuildingQuery) => {
  return request<BuildingData>({
    url:'/park/building',
    method:'get',
    data
  })
}
// 新增楼宇
export const getAddBuilding = (data:BuildingAddAndEditQuery) => {
  return request({
    url:'/park/building',
    method:'post',
    data
  })
}

// 修改楼宇

export const getEditBuilding = (data:BuildingAddAndEditQuery) => {
  return request({
    url:'/park/building',
    method:'put',
    data
  })
}

// 删除楼宇

export const getDeleteBuilding = (data:{id:number}) => {
  return request({
    url:`/park/building/${data.id}`,
    method:'delete',
    data
  })
}