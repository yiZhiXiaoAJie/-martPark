import request from '@/utils/request'
import type {
  checkDetailData,
  EnterpriseAddQuery,
  EnterpriseListData,
  EnterpriseListQuery,
  EnterpriseSelectData,
  UploadData,
  UploadDataQuery
} from './type'

// 获取企业列表
export const getEnterpriseList = (data: EnterpriseListQuery) => {
  return request<EnterpriseListData>({
    url: '/park/enterprise',
    method: 'get',
    data
  })
}

// 下拉
export const getEnterpriseSelect = () => {
  return request<EnterpriseSelectData[]>({
    url: '/park/industry',
    method: 'get'
  })
}

// 上传

export const uploadEnterprise = (data: UploadDataQuery) => {
  return request<UploadData>({
    url: '/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 添加
export const addEnterprise = (data:EnterpriseAddQuery) => {
  return request({
    url: '/park/enterprise',
    method: 'post',
    data
  })
}

// 查看

export const getEnterpriseDetail = (data:{id:string}) => {
  return request<checkDetailData>({
    url: `/park/enterprise/${data.id}`,
    method: 'get'
})
}

// 编辑

export const editEnterprise = () => {
  return request({
  url:'/park/enterprise',
  method:'put'
})
}