<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { getEnterpriseList } from '@/api/park/enterprise/index'
import appTable from '@/components/appTable.vue'
import type { EnterpriseListQuery, Row } from '@/api/park/enterprise/type'
import { tableConfig, tableSonConfig } from './config/index'
import { useRouter } from 'vue-router'
const router = useRouter()

const enterpriseForm = reactive<EnterpriseListQuery>({
  page: 1,
  pageSize: 10,
  name: ''
})
const loading = ref(true)

const enterpriseList = ref<Row[]>()
const total = ref<number>(0)
const getList = async () => {
  const res = await getEnterpriseList(enterpriseForm)
  enterpriseList.value = res.data.rows
  total.value = res.data.total
  loading.value = false
  console.log(res)
}

const expand = ref<string>('expand')
getList()

const handelCheck = (id: number) => {
  router.push({
    path: '/check',
    query: {
      id
    }
  })
}
const handelAdd = () => {
  router.push({
    path: '/add',
    query: {
      type: 'add',
      title: '添加企业'
    }
  })
}

const handelEdit = (id: number) => {
  router.push({
    path: '/add',
    query: {
      type: 'edit',
      title: '编辑企业',
      id: id
    }
  })
}
</script>

<template>
  <el-card>
    <div class="search-box">
      楼宇名称：
      <el-input placeholder="请输入企业名称" v-model="enterpriseForm.name"></el-input>
      <el-button class="bgccyan" @click="getList">查询</el-button>
    </div>

    <el-button type="primary" class="bgccyan" @click="handelAdd">添加企业</el-button>
    <div>
      <appTable
        :enterpriseList="enterpriseList || []"
        :tableConfig="tableConfig"
        :tableSonConfig="tableSonConfig"
        :expand="expand"
        v-loading="loading"
      >
        <template #operate="{ row }">
          <el-button type="primary" size="small" link>添加合同</el-button>
          <el-button type="primary" size="small" link @click="handelCheck(row.id)">查看</el-button>
          <el-button type="primary" size="small" link @click="handelEdit(row.id)"> 编辑 </el-button>
          <el-button type="danger" size="small" link>删除</el-button>
        </template>
      </appTable>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.edit {
  color: #409efe;
  text-decoration: none;
}
.bgccyan {
  background-color: #4770ff;
  color: #fff;
  margin: 20px 0;
  .content {
    text-decoration: none;
    color: #fff;
  }
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
