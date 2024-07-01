export const TableConfig = [
    {label:'序号',type:'index',width:100},
    {label:'车主名称',prop:'personName'},
    {label:'联系方式',prop:'phoneNumber'},
    {label:'车牌号码',prop:'carNumber'},
    {label:'剩余有效天数',prop:'totalEffectiveDate'},
    {label:'状态',prop:'cardStatus',slot:'status'},
    {label:'操作',slot:'operate'},
]