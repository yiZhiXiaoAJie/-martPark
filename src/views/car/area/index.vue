<script lang="ts" setup>
import { ref, reactive } from 'vue'
import appTable from '@/components/appTable.vue'
import { getAreaList, getAreaListSelect, addArea, editArea, deleteArea } from '@/api/car/area/index'
import type { AreaListItem, AreaListSelectRow, AreaQuery } from '@/api/car/area/type'
import Dialog from '@/components/Dialog.vue'
const arealist = ref<AreaListItem[] | undefined>([])
const total = ref<number | undefined>(0)
import { tableConfig } from './config/index'
import { ElMessage, ElMessageBox, type FormInstance } from 'element-plus'
const areaListData = reactive({
  page: 1,
  pageSize: 10
})
const loading = ref(true)
// 获取列表数据
const getAreaListData = async () => {
  const res = await getAreaList(areaListData)
  arealist.value = res.data.rows
  total.value = res.data.total
  loading.value = false
}
getAreaListData()
const selectData = ref<AreaListSelectRow[]>([])
const getAreaListSelectData = async () => {
  const res = await getAreaListSelect()
  selectData.value = res.data.rows
}

const formQuery = reactive<AreaQuery>({
  areaName: '',
  spaceNumber: '',
  areaProportion: '',
  ruleId: '',
  remark: ''
})
const dialogVisible = ref(false)
const title = ref('')

const rules = reactive({
  areaName: [{ required: true, message: '请输入区域名称', trigger: 'blur' }],
  spaceNumber: [{ required: true, message: '请输入车位数', trigger: 'blur' }],
  areaProportion: [{ required: true, message: '请输入面积', trigger: 'blur' }],
  ruleId: [{ required: true, message: '请选择计费规则', trigger: 'blur' }],
  remark: [{ required: true, message: '请输入备注', trigger: 'blur' }]
})
const handelAdd = () => {
  dialogVisible.value = true
  title.value = '添加区域'
  getAreaListSelectData()
}
const handelEdit = (row: AreaListItem) => {
  dialogVisible.value = true
  title.value = '编辑区域'
  formQuery.areaName = row.areaName
  formQuery.spaceNumber = row.spaceNumber
  formQuery.areaProportion = row.areaProportion
  formQuery.ruleId = row.ruleId
  formQuery.remark = row.remark
  formQuery.id = row.id
  getAreaListSelectData()
}
const formRef = ref<FormInstance>()
const handelSubmit = () => {
  formRef.value?.validate(async (valid: any) => {
    if (valid) {
      if (title.value === '添加区域') {
        try {
          const res = await addArea(formQuery)
          if (res.code === 10000) {
            dialogVisible.value = false
            getAreaListData()
            ElMessage.success('添加成功')
          }
        } catch (error: any) {
          const err = JSON.parse(error.request.response)
          ElMessage.error(err.msg)
        }
      }
      if (title.value === '编辑区域') {
        try {
          const res = await editArea(formQuery)
          if (res.code === 10000) {
            dialogVisible.value = false
            getAreaListData()
            ElMessage.success('编辑成功')
          }
        } catch (error: any) {
          console.log(error)
        }
      }
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
const handelDel = (id: number) => {
  ElMessageBox.confirm(
    '是否确认删除当前区域？',

    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    deleteArea({ id }).then((res) => {
      if (res.code === 10000) {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        getAreaListData()
      }
    })
  })
  // .catch(() => {
  //   ElMessage({
  //     type: 'info',
  //     message: 'Delete canceled'
  //   })
  // })
}
</script>

<template>
  <el-card>
    <el-button class="add" @click="handelAdd">添加区域</el-button>
    <appTable :enterpriseList="arealist" :tableConfig="tableConfig" v-loading="loading">
      <template #operate="{ row }">
        <el-button link type="primary" @click="handelEdit(row)">编辑</el-button>
        <el-button link type="primary" @click="handelDel(row.id)">删除</el-button>
      </template>
    </appTable>
    <Dialog v-model:dialogVisible="dialogVisible" :title="title">
      <template #default>
        <el-form :model="formQuery" label-position="top" :rules="rules" ref="formRef">
          <el-form-item label="区域名称" prop="areaName">
            <el-input v-model="formQuery.areaName" placeholder="请输入区域名称" />
          </el-form-item>
          <el-form-item label="车位数（个）" prop="spaceNumber">
            <el-input v-model="formQuery.spaceNumber" placeholder="请输入区域编码" />
          </el-form-item>
          <el-form-item label="面积（㎡）" prop="areaProportion">
            <el-input v-model="formQuery.areaProportion" placeholder="请输入区域编码" />
          </el-form-item>
          <el-form-item label="关联计费规则" prop="ruleId">
            <el-select v-model="formQuery.ruleId" placeholder="请选择区域类型">
              <el-option
                v-for="item in selectData"
                :key="item.id"
                :label="item.ruleName"
                :value="item.id"
              />
              <el-option label="区域类型2" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="formQuery.remark" type="textarea" placeholder="请输入备注" />
          </el-form-item>
        </el-form>
      </template>
      <template #btn>
        <el-button>取消</el-button>
        <el-button type="primary" @click="handelSubmit">确定</el-button>
      </template>
    </Dialog>
  </el-card>
</template>

<style lang="scss" scoped>
.add {
  background-color: #4770ff;
  color: #fff;
  margin-bottom: 15px;
}
</style>
