export const tableConfig = [
  {
    label: '序号',
    type: 'index',
    width:'100'
  },
  {
    label: '区域名称',
    prop:'areaName'

  },
  {
    label:'车位数（个）',
    prop:'spaceNumber'
  },
  {
    label:'	面积（㎡）',
    prop:'areaProportion'
  },
  {
    label:'计费规则',
    prop:'ruleName'
  },
  {
    label:'备注',
    prop:'remark'
  },
  {
    label:'操作',
    slot:'operate'
  }
]
