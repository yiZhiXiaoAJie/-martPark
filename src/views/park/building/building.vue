<script lang="ts" setup>
import { ref, reactive,provide } from 'vue'
import { getBuildingList,getDeleteBuilding} from '@/api/park/building/index'
import { type BuildingQuery, type BuildingRows } from '@/api/park/building/types'

import dialogin  from './components/dialogin.vue'
import pagination from './components/pagination.vue'
import { ElMessage } from 'element-plus';

const buildingQuery = reactive<BuildingQuery>({
  name: '',
  page: '1',
  pageSize: '10'
})
const loading = ref<boolean>(true)
const buildingList = ref<BuildingRows[]>([])
const total = ref<number>(0)
const getBuildingListData = async () => {
  const res = await getBuildingList(buildingQuery)
  console.log(res)
  buildingList.value = res.data.rows
  if (buildingList.value) {
    loading.value = false
  }
  total.value = res.data.total
}
getBuildingListData()
const dialoginRef = ref()
const handelAdd = (type:string,title:string) => {
  dialoginRef.value.handelOpen(type,title)
}
const handeEdit = (type:string,title:string,row?:BuildingRows) => {
  dialoginRef.value.handelOpen(type,title,row)
}
const handeldel = async(id:number) => {
  const res = await getDeleteBuilding({id})
  console.log(res)
  if(res.code === 10000){
    getBuildingListData()
    ElMessage.success('删除成功')
  }
}
provide('getBuildingListData', getBuildingListData);
const handleBuildingQueryUpdate = (newQuery: BuildingQuery) => {
  buildingQuery.page = newQuery.page;
  buildingQuery.pageSize = newQuery.pageSize;
  getBuildingListData()
};
</script>

<template>
  <el-card>
    <div class="search-box">
      楼宇名称：
      <el-input placeholder="请输入楼宇名称" v-model="buildingQuery.name"></el-input>
      <el-button class="bgccyan" @click="getBuildingListData">查询</el-button>
    </div>

    <el-button type="primary" class="bgccyan" @click="handelAdd('add','添加楼宇')">添加楼宇</el-button>
    <div>
      <el-table
        v-loading="loading"
        :data="buildingList"
        style="width: 100%"
        :header-cell-style="{
          background: '#f4f6f8',
          fontWeight: 400,
          color: '#000',
          height: '50px',
          'text-align': 'center'
        }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="name" label="楼宇名称" />
        <el-table-column prop="floors" label="层数" />
        <el-table-column prop="area" label="在管面积(m²)" />
        <el-table-column prop="propertyFeePrice" label="物业费(元/m²)" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">{{
              row.status === 1 ? '租赁中' : '空闲中'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" link @click="handeEdit('edit','编辑楼宇',row)">编辑</el-button>
            <el-button type="primary" link @click="handeldel(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination :buildingQuery="buildingQuery" :total="total" @update:buildingQuery="handleBuildingQueryUpdate"></pagination>
  </el-card>
 <dialogin ref="dialoginRef"></dialogin>
</template>

<style lang="scss" scoped>
.bgccyan {
  background-color: #4770ff;
  color: #fff;
  margin: 20px 0;
}
.el-card {
  .search-box {
    border-bottom: 1px solid #ccc;
    padding-bottom: 15px;
    margin-bottom: 20px;
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
    .el-button {
      margin-right: 10px;
    }
  }
}
</style>
