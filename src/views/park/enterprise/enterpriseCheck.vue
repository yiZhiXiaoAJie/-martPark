<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getEnterpriseDetail } from '@/api/park/enterprise/index'
import type { checkDetailData, Rent } from '@/api/park/enterprise/type'
import { tableConfig } from './checkConfig/index'
import appTabal from '@/components/appTable.vue'
const route = useRoute()
const datailData = ref<checkDetailData | null>(null)
const id: any = route.query.id
const rend = ref<Rent[]>([])
const getDetail = async () => {
  const res = await getEnterpriseDetail({ id })
  datailData.value = res.data
  rend.value = res.data.rent
  console.log(res)
}
getDetail()
</script>

<template>
  <el-container>
    <el-header>
      <el-page-header @back="$router.back()">
        <template #content>
          <span class="text-large font-600 mr-3"> 查看企业 </span>
        </template>
      </el-page-header>
      <h3>黑马管理员</h3>
    </el-header>
    <el-main>
      <div class="enterpriseCheckTop">
        <div class="enterpriseCheckTop_left">
          <p>企业信息</p>
        </div>
        <div class="enterpriseCheckTop_content" v-if="datailData">
          <el-row :gutter="20">
            <el-col :span="12">
              <span>企业名称：</span>
              <strong>{{ datailData.name }}</strong>
            </el-col>
            <el-col :span="12">
              <span>法人：</span>
              <strong>{{ datailData.legalPerson }}</strong>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <span>注册地址：</span>
              <strong>{{ datailData.registeredAddress }}</strong>
            </el-col>
            <el-col :span="12">
              <span>所在行业：</span>
              <strong>{{ datailData.industryName }}</strong>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span>营业执照：</span>
              <img :src="datailData.businessLicenseUrl" alt="" />
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="enterpriseCheckTop enterpriseCheckCenter">
        <div class="enterpriseCheckTop_left">
          <p>企业联系人</p>
        </div>
        <div class="enterpriseCheckTop_content" v-if="datailData">
          <el-row :gutter="20">
            <el-col :span="12">
              <span>企业联系人：</span>
              <strong>{{ datailData.contact }}</strong>
            </el-col>
            <el-col :span="12">
              <span>联系电话：</span>
              <strong>{{ datailData.contactNumber }}</strong>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="enterpriseCheckTop">
        <div class="enterpriseCheckTop_left">
          <p>租赁记录</p>
          <div class="paddingBorder">
            <appTabal :tableConfig="tableConfig" :enterpriseList="rend" :border="true">
              <template #operate>
                <span>合同下载</span>
              </template>
              <template #status="{ row }">
                <el-tag size="large">{{
                  row.status === 1
                    ? '生效中'
                    : row.status === 2
                      ? '已到期'
                      : row.status === 3
                        ? '已退租'
                        : '待生效'
                }}</el-tag>
              </template>
            </appTabal>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
.paddingBorder {
  padding: 20px;
}
.el-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  h3 {
    font-weight: 400;
    font-size: 18px;
  }
}
.el-main {
  height: 100vh;
  background-color: #f4f6f8;
  .enterpriseCheckTop {
    background-color: #fff;
    height: 300px;
    margin-bottom: 20px;
    .enterpriseCheckTop_content {
      margin-top: 20px;
      width: 1000px;
      margin: auto;
      .el-row {
        margin-bottom: 30px;

        span {
          color: #909399;
        }
        img {
          width: 100px;
          height: 100px;
          vertical-align: middle;
        }
      }
    }
  }
  .enterpriseCheckCenter {
    height: 150px;
  }
  .enterpriseCheckTop_left {
    padding-top: 20px;
    > p {
      width: 100px;
      text-align: center;
      height: 20px;
      border-left: 2px solid #4770ff;
    }
  }
}
</style>
