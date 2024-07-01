import request from '@/utils/request'
import type {AreaList, AreaListQuery, AreaListSelect, AreaQuery} from './type'


// 获取区域列表

export const getAreaList = (data:AreaListQuery) => {
    return request<AreaList>({
        url:'/parking/area/list',
        method:'get',
        data
    })
}

// 下拉
export const getAreaListSelect = () => {
    return request<AreaListSelect>({
        url:'/parking/rule/list',
        method:'get',
    })
}
// 添加
export const addArea = (data:AreaQuery) => {
    return request({
        url:'/parking/area',
        method:'post',
        data
})
}
//编辑
export const editArea = (data:AreaQuery) => {
    return request({
        url:'/parking/area',
        method:'put',
        data
})
}

// 删除
export const deleteArea = (data:{id:number | string}) => {
    return request({
        url:`/parking/area/${data.id}`,
        method:'delete',
        data
})
}