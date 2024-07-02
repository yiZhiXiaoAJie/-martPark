<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { ref, reactive, inject } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage, dayjs } from 'element-plus'
import {
  addMonthCard,
  getMonthCardDetail,
  renewMonthCard,
  editMonthCard
} from '@/api/car/monthCard/index'
import type {
  addMonthCardParams,
  CheckData,
  RechargeList,
  renewMonthCardQuery
} from '@/api/car/monthCard/type'
import appTable from '@/components/appTable.vue'
import router from '@/router'
import { tableConfig } from './config/index'

const getMonthCard = inject('getMonthCard') as Function
const route = useRoute()
console.log(route.params)
const checkList = ref<CheckData>()
const rechargeList = ref<RechargeList[]>([])
const formQuery = reactive<addMonthCardParams>({
  personName: '',
  phoneNumber: '',
  carNumber: '',
  carBrand: '',
  cardStartDate: '',
  cardEndDate: '',
  paymentAmount: '',
  paymentMethod: '',
  carInfoId:'',
  rechargeId:''
})
const { type, title, query } = (() => {
  console.log(route.params.query)

  const type = ref(route.params.type)
  const title = ref(route.params.title)
  const query = type.value === 'check' ? route.params.query : undefined
  if (type.value === 'check') {
    getMonthCardDetail({ Id: route.params.query }).then((res) => {
      checkList.value = res.data
      rechargeList.value = res.data.rechargeList
      console.log(res)
    })
  }
  if (type.value === 'renewal') {
    getMonthCardDetail({ Id: route.params.query }).then((res) => {
      formQuery.personName = res.data.personName
      formQuery.phoneNumber = res.data.phoneNumber
      formQuery.carNumber = res.data.carNumber
      formQuery.carBrand = res.data.carBrand
    })
  }
  if (type.value === 'edit') {
    getMonthCardDetail({ Id: route.params.query }).then((res) => {
      formQuery.personName = res.data.personName
      formQuery.phoneNumber = res.data.phoneNumber
      formQuery.carNumber = res.data.carNumber
      formQuery.carBrand = res.data.carBrand
      time.value = [res.data.rechargeList[0].cardStartDate, res.data.rechargeList[0].cardEndDate]
      formQuery.paymentAmount = res.data.rechargeList[0].paymentAmount
      formQuery.paymentMethod = res.data.rechargeList[0].paymentMethod
      formQuery.carInfoId = route.params.query 
      formQuery.rechargeId = res.data.rechargeList[0].rechargeId
    })
  }
  return {
    type: type.value,
    title: title.value,
    query: query ? query : undefined
  }
})()
console.log(type)
console.log(title)
console.log(query)

const defaultTime = ref<[Date, Date]>([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59)
])
const time = ref<string | string[]>('')

const formTopRef = ref<FormInstance>()
const formButtonRef = ref<FormInstance>()
const rules = reactive({
  personName: [{ required: true, message: '请输入车主姓名', trigger: 'blur' }],
  phoneNumber: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
  carNumber: [{ required: true, message: '请输入车牌号码', trigger: 'blur' }],
  carBrand: [{ required: true, message: '请输入车辆品牌', trigger: 'blur' }],
  cardStartDate: [{ required: true, message: '请输入有效日期', trigger: 'blur' }],
  cardEndDate: [{ required: true, message: '请输入有效日期', trigger: 'blur' }],
  paymentAmount: [{ required: true, message: '请输入缴费金额', trigger: 'blur' }],
  paymentMethod: [{ required: true, message: '请输入缴费方式', trigger: 'blur' }]
})

const handelTime = () => {
  formQuery.cardStartDate = dayjs(time.value[0]).format('YYYY-MM-DD')
  formQuery.cardEndDate = dayjs(time.value[1]).format('YYYY-MM-DD')
}
const checkForm = (formInstance: FormInstance) => {
  return new Promise<boolean>((resolve, reject) => {
    formInstance.validate((valid) => {
      if (valid) {
        resolve(true)
      } else {
        reject(false)
      }
    })
  })
}

const resetForm = () => {
  formTopRef.value?.resetFields()
  formButtonRef.value?.resetFields()
  time.value = ''
}
const checkQuery = reactive<renewMonthCardQuery>({
  cardStartDate: '',
  cardEndDate: '',
  paymentAmount: '',
  paymentMethod: '',
  carInfoId: ''
})
const handelSubmit = () => {
  const list = [checkForm(formTopRef.value!), checkForm(formButtonRef.value!)]
  Promise.all(list).then(async (res) => {
    try {
      if (type === 'add') {
        const res = await addMonthCard(formQuery)
        if (res.code === 10000) {
          ElMessage.success('添加成功')
          router.back()
          getMonthCard()
        }
      }
    } catch (error: any) {
      ElMessage.error(error.response.data.msg)
    }
    try {
      console.log(type)

      if (type === 'renewal') {
        checkQuery.cardStartDate = formQuery.cardStartDate!
        checkQuery.cardEndDate = formQuery.cardEndDate!
        checkQuery.paymentAmount = formQuery.paymentAmount!
        checkQuery.paymentMethod = formQuery.paymentMethod
        checkQuery.carInfoId = route.params.query as string

        const res = await renewMonthCard(checkQuery)
        if (res.code === 10000) {
          ElMessage.success('续费成功')
          router.back()
          getMonthCard()
        }
      }
    } catch (error: any) {
      ElMessage.error(error.response.data.msg)
    }
    try {
      if (type === 'edit') {
        const res = await editMonthCard(formQuery)
        if (res.code === 10000) {
          ElMessage.success('编辑成功')
          router.back()
          getMonthCard()
        }
      }
    } catch (error: any) {
      ElMessage.error(error.response.data.msg)
    }
  })
}
</script>

<template>
  <el-container>
    <el-header>
      <el-page-header @back="$router.back()">
        <template #content>
          <span class="text-large font-600 mr-3"> {{ title }} </span>
        </template>
      </el-page-header>
      <p>黑马管理员</p>
    </el-header>
    <el-main>
      <div v-if="type === 'check'">
        <div class="main_form_top">
          <p>车辆信息</p>
          <el-row justify="center">
            <el-col :span="6" v-if="checkList">
              <span>车主姓名：</span>
              <strong>{{ checkList?.personName }}</strong>
            </el-col>
            <el-col :span="6">
              <span>联系方式：</span>
              <strong>{{ checkList?.phoneNumber }}</strong>
            </el-col>
          </el-row>
          <el-row justify="center" v-if="checkList">
            <el-col :span="6">
              <span>车牌号码：</span>
              <strong>{{ checkList?.carNumber }}</strong>
            </el-col>
            <el-col :span="6">
              <span>车辆品牌：</span>
              <strong>{{ checkList?.carBrand }}</strong>
            </el-col>
          </el-row>
        </div>
        <div class="main_form_button">
          <p>月卡缴费记录</p>
          <div class="main_form_button_table">
            <appTable :tableConfig="tableConfig" :enterpriseList="rechargeList">
              <template #validTime="{ row }">
                <span>{{ row.cardStartDate + '-' + row.cardEndDate }}</span>
              </template>
            </appTable>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="main_form_top">
          <p>车辆信息</p>
          <el-form
            :inline="true"
            label-suffix="："
            :model="formQuery"
            ref="formTopRef"
            :rules="rules"
          >
            <el-form-item label="车主姓名" prop="personName">
              <el-input
                placeholder="请输入车主姓名"
                v-model="formQuery.personName"
                v-if="type === 'renewal'"
                disabled
              ></el-input>
              <el-input
                placeholder="请输入车主姓名"
                v-model="formQuery.personName"
                v-else
              ></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="phoneNumber">
              <el-input
                placeholder="请输入联系方式"
                v-model="formQuery.phoneNumber"
                v-if="type === 'renewal'"
                disabled
              ></el-input>
              <el-input
                placeholder="请输入联系方式"
                v-model="formQuery.phoneNumber"
                v-else
              ></el-input>
            </el-form-item>
            <el-form-item label="车牌号码" prop="carNumber">
              <el-input
                placeholder="请输入车辆号码"
                v-model="formQuery.carNumber"
                v-if="type === 'renewal'"
                disabled
              ></el-input>
              <el-input
                placeholder="请输入车辆号码"
                v-model="formQuery.carNumber"
                v-else
              ></el-input>
            </el-form-item>
            <el-form-item label="车辆品牌" prop="carBrand">
              <el-input
                placeholder="请输入车辆品牌"
                v-model="formQuery.carBrand"
                v-if="type === 'renewal'"
                disabled
              ></el-input>
              <el-input placeholder="请输入车辆品牌" v-model="formQuery.carBrand" v-else></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="main_form_button">
          <p v-if="type === 'renewal'">月卡缴费信息</p>
          <p v-else>最近一次月卡缴费信息</p>

          <el-form
            :inline="true"
            label-suffix="："
            :model="formQuery"
            ref="formButtonRef"
            :rules="rules"
          >
            <el-form-item label="有效日期" prop="cardStartDate">
              <div class="demo-date-picker">
                <div class="block">
                  <el-date-picker
                    v-model="time"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="defaultTime"
                    @change="handelTime"
                  />
                </div>
              </div>
            </el-form-item>
            <el-form-item label="支付金额" prop="paymentAmount">
              <el-input placeholder="请输入支付金额" v-model="formQuery.paymentAmount"></el-input>
            </el-form-item>
            <el-form-item label="支付方式" prop="paymentMethod">
              <el-select
                placeholder="请选择支付方式"
                clearable
                size="large"
                style="width: 320px"
                v-model="formQuery.paymentMethod"
              >
                <el-option label="支付宝" value="Alipay"></el-option>
                <el-option label="微信" value="WeChat"></el-option>
                <el-option label="现金支付" value="Cash"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-main>
    <el-footer>
      <div>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="handelSubmit">确定</el-button>
      </div>
    </el-footer>
  </el-container>
</template>

<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-main {
  height: 80vh;
  background-color: #f4f6f8;
  .main_form_top {
    width: 100%;
    height: 250px;
    background-color: #fff;
    box-sizing: border-box;
    > p {
      padding: 20px;
      border-bottom: 1px solid #ccc;
    }
    .el-form {
      width: 1200px;
      margin: auto;
      margin-top: 30px;
      .el-form-item {
        margin-bottom: 40px;
        .el-input {
          width: 400px;
          height: 40px;
        }
      }
    }
    .el-row {
      margin: 30px 0;
      .el-col {
        > span {
          color: #909399;
        }
        > strong {
          font-weight: 300;
        }
      }
    }
  }
  .main_form_button {
    margin-top: 50px;
    width: 100%;
    height: 250px;
    background-color: #fff;
    box-sizing: border-box;
    .main_form_button_table {
      padding: 0 20px;
    }
    > p {
      padding: 20px;
      border-bottom: 1px solid #ccc;
    }
    .el-form {
      width: 1200px;
      margin: auto;
      margin-top: 30px;
      .el-form-item {
        margin-bottom: 40px;
        .el-input {
          width: 400px;
          height: 40px;
        }
        ::v-deep(.el-range-editor.el-input__wrapper) {
          width: 380px !important;
          height: 40px !important;
        }
      }
    }
  }
}
.el-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  > div {
    .el-button {
      width: 100px;
      height: 40px;
      font-size: 16px;
    }
  }
}
</style>
