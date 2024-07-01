<script lang="ts" setup>
import { ref, reactive, inject } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { getAddBuilding, getEditBuilding } from '@/api/park/building/index'
import type { BuildingRows, BuildingAddAndEditQuery } from '@/api/park/building/type'
const getBuildingListData = inject<() => Promise<void>>('getBuildingListData')

const dialogVisible = ref(false)
const buildingRef = ref<FormInstance>()
const handleClose = () => {
  dialogVisible.value = false
}
const dialoginType = ref<string>()
const dialoginTitle = ref<string>()
const handelOpen = (type: string, title: string, row?: BuildingRows) => {
  dialogVisible.value = true
  dialoginType.value = type
  dialoginTitle.value = title
  if (type === 'edit') {
    buildingQuery.id = row?.id
    buildingQuery.name = row?.name as string
    buildingQuery.floors = row?.floors as number
    buildingQuery.area = row?.area as number
    buildingQuery.propertyFeePrice = row?.propertyFeePrice as number
  }
}
defineExpose({
  handelOpen
})

const buildingQuery = reactive<BuildingAddAndEditQuery>({
  id: 0,
  name: '',
  floors: '',
  area: '',
  propertyFeePrice: ''
})
const handelSure = () => {
  buildingRef.value?.validate(async (valid) => {
    if (valid) {
      if (dialoginType.value === 'add') {
        const res = await getAddBuilding(buildingQuery)
        if (res.code === 10000) {
          dialogVisible.value = false
          if (getBuildingListData) {
            await getBuildingListData()
          }
          ElMessage.success('添加成功')
        }
      }
      if(dialoginType.value === 'edit') {
        const res = await getEditBuilding(buildingQuery)
        if (res.code === 10000) {
          dialogVisible.value = false
          if (getBuildingListData) {
            await getBuildingListData()
          }
          ElMessage.success('修改成功')
        }
      }
    } else {
      console.log('error submit!')
    }
  })
}

const rules = reactive({
  name: [{ required: true, message: '请输入楼宇名称', trigger: 'blur' }],
  floors: [
    { required: true, message: '请输入楼宇层数', trigger: 'blur' },
    {
      validator: (rule:any, value: any, callback: any) => {
        const regex = /^(1[0-9]?|20|[1-9])$/
        if (Number(regex.test(value))) {
          callback()
        } else {
          callback(new Error('楼宇层数必须为1-20层'))
        }
      },
      trigger: 'blur'
    }
  ],
  area: [{ required: true, message: '请输入在管面积', trigger: 'blur' }],
  propertyFeePrice: [{ required: true, message: '请输入物业费', trigger: 'blur' }]
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialoginTitle"
    width="500"
    :before-close="handleClose"
    style="border-radius: 8px"
  >
    <el-form
      label-position="top"
      :label-width="50"
      :model="buildingQuery"
      ref="buildingRef"
      :rules="rules"
    >
      <el-form-item label="楼宇名称" prop="name">
        <el-input v-model="buildingQuery.name"></el-input>
      </el-form-item>
      <el-form-item label="楼宇层数" prop="floors">
        <el-input v-model.number="buildingQuery.floors"></el-input>
      </el-form-item>
      <el-form-item label="在管面积" prop="area">
        <el-input v-model="buildingQuery.area">
          <template #append>m²</template>
        </el-input>
      </el-form-item>
      <el-form-item label="物业费" prop="propertyFeePrice">
        <el-input v-model="buildingQuery.propertyFeePrice">
          <template #append>元/m²</template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose"> 取消 </el-button>
        <el-button type="primary" @click="handelSure">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.el-form {
  width: 300px;
  margin: auto;
  .el-form-item {
    :deep(.el-form-item__label) {
      text-align: left;
    }
    .el-input {
      width: 300px;
      margin: auto;
    }
  }
}
</style>
