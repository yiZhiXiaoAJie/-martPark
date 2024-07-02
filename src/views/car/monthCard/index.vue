<script lang="ts" setup>
import { ref, reactive, provide } from 'vue'
import appTable from '@/components/appTable.vue'
import Pagination from '@/components/Pagination.vue'
import { TableConfig } from './config/index'
import { getMonthCardList, getMonthCardRate, deleteMonthCard } from '@/api/car/monthCard/index'
import type { MonthCarItem, MonthCarParams, Proportion } from '@/api/car/monthCard/type'
import router from '@/router'
import { ElMessage } from 'element-plus'

const monthCarQuery = reactive<MonthCarParams>({
  page: 1,
  pageSize: 10,
  carNumber: '',
  personName: '',
  cardStatus: ''
})

const monthCardList = ref<MonthCarItem[]>([])
const total = ref<number>()
const getMonthCard = async () => {
  const res = await getMonthCardList(monthCarQuery)
  monthCardList.value = res.data.rows
  total.value = res.data.total
}
getMonthCard()
const proportion = ref<Proportion>()
const getMonthCardRateDate = async () => {
  const res = await getMonthCardRate()
  proportion.value = res.data
}
getMonthCardRateDate()

const handelAddMonthCard = (type: { type: string; title: string }) => {
  router.push({
    name: 'MonthCardCom',
    params: type
  })
}

const handelCheck = (type: { type: string; title: string; id: string | number }) => {
  router.push({
    name: 'MonthCardCom',
    params: {
      type: type.type,
      title: type.title,
      query: type.id
    }
  })
}
const handelRenewal = (type: { type: string; title: string; id: string | number }) => {
  router.push({
    name: 'MonthCardCom',
    params: {
      type: type.type,
      title: type.title,
      query: type.id
    }
  })
}
const handleSizeChange = (val: number) => {
  monthCarQuery.pageSize = val
  getMonthCard()
}
const handleCurrentChange = (val: number) => {
  monthCarQuery.page = val
  getMonthCard()
}
const ids = ref<string[]>([])
const getIds = (val: any) => {
  ids.value = val
  console.log(ids.value)
}
const handelAllDel = async () => {
  const res = await deleteMonthCard({ ids: ids.value.toString() })
  if (res.code === 10000) {
    ElMessage.success('删除成功')
    getMonthCard()
  }
}
const handelDel = async (ids: number | string) => {
  const res = await deleteMonthCard({ ids })
  if (res.code === 10000) {
    ElMessage.success('删除成功')
    getMonthCard()
  }
}
const handelEdit = (type: { type: string; title: string; id: string | number }) => {
  router.push({
    name:'MonthCardCom',
    params: {
      type:type.type,
      title:type.title,
      query:type.id
    }
  })
}
provide('getMonthCard', getMonthCard)
</script>

<template>
  <el-card>
    <el-form :inline="true" label-suffix="：">
      <el-form-item label="车牌号码">
        <el-input placeholder="请输入车牌号码" v-model="monthCarQuery.carNumber"></el-input>
      </el-form-item>
      <el-form-item label="车牌姓名">
        <el-input placeholder="请输入车主姓名" v-model="monthCarQuery.personName"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select placeholder="未选择" v-model="monthCarQuery.cardStatus">
          <el-option label="全部" value="" />
          <el-option label="可用" value="0" />
          <el-option label="已过期" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" @click="getMonthCard">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="monthCard_btn">
      <div>
        <el-button class="btn" @click="handelAddMonthCard({ type: 'add', title: '添加月卡' })"
          >添加月卡</el-button
        >
        <el-button class="btn" @click="handelAllDel">批量删除</el-button>
      </div>
      <el-tag type="primary" v-if="proportion"
        >本园区共计 {{ proportion.spaceNumber }} 个车位，月卡用户 0 人，车位占有率
        {{ proportion.proportion }}</el-tag
      >
    </div>
    <appTable
      :tableConfig="TableConfig"
      selection="selection"
      :enterpriseList="monthCardList"
      @getIds="getIds"
    >
      <template #operate="{ row }">
        <el-button
          link
          type="primary"
          @click="handelRenewal({ type: 'renewal', title: '续费', id: row.id })"
          >续费</el-button
        >
        <el-button
          link
          type="primary"
          @click="handelCheck({ type: 'check', title: '查看月卡', id: row.id })"
          >查看</el-button
        >
        <el-button
          link
          type="primary"
          @click="handelEdit({ type: 'edit', title: '编辑月卡', id: row.id })"
          >编辑</el-button
        >
        <el-button link type="primary" @click="handelDel(row.id)">删除</el-button>
      </template>
      <template #status="{ row }">
        <span>{{ row.cardStatus === 1 ? '已过期' : '可用' }}</span>
      </template>
    </appTable>

    <Pagination
      :page="monthCarQuery.page"
      :pageSize="monthCarQuery.pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></Pagination>
  </el-card>
</template>

<style lang="scss" scoped>
.btn {
  background-color: #4770ff;
  color: #fff;
}
.monthCard_btn {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .el-tag {
    padding: 20px;
    font-size: 18px;
  }
}
.el-form {
  border-bottom: 1px solid #eee;
  .el-form-item {
    .el-select {
      width: 200px;
    }
  }
}
</style>
