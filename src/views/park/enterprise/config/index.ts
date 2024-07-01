import type { TableConfig } from './type'

export const tableConfig: TableConfig[] = [
  { label: '序号', type: 'index', width: '100' },
  { label: '企业名称', prop: 'name' },
  { label: '联系人', prop: 'contact' },
  { label: '联系电话', prop: 'contactNumber' },
  { label: '操作', slot: 'operate' }
]
export const tableSonConfig = [
  { label: '租赁楼宇' },
  { label: '租赁起止时间' },
  { label: '合同状态' },
  { label: '操作' }
]
