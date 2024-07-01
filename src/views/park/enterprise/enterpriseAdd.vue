<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, type FormInstance, type UploadRawFile } from 'element-plus'
import {
  getEnterpriseSelect,
  uploadEnterprise,
  addEnterprise,
  editEnterprise,
  getEnterpriseDetail
} from '@/api/park/enterprise/index'
import type {
  EnterpriseAddQuery,
  EnterpriseSelectData,
  UploadDataQuery
} from '@/api/park/enterprise/type'

const route = useRoute()
const router = useRouter()

const type = ref<'add' | 'edit'>(route.query.type as 'add' | 'edit')

const title = ref(route.query.title as string)
const id = route.query.id
const datail = ref<Object>()
const detailContent = async () => {
  const res = await getEnterpriseDetail({ id })
  datail.value = res.data
  console.log(datail.value)
}

detailContent()
const goBack = () => {
  router.back()
}

const selectData = ref<EnterpriseSelectData[]>([])
const enterpriseSelect = async () => {
  const res = await getEnterpriseSelect()
  selectData.value = res.data
}
enterpriseSelect()

const enterpriseAddQuery = reactive<EnterpriseAddQuery>({
  name: '',
  legalPerson: '',
  registeredAddress: '',
  industryCode: '',
  businessLicenseUrl: '',
  businessLicenseId: '',
  contact: '',
  contactNumber: ''
})

onMounted(() => {
  console.log(type.value)

  if (type.value === 'edit') {
    console.log(456)

    enterpriseAddQuery.name = datail.value.name
    // enterpriseAddQuery.legalPerson = datail.value.legalPerson
    // enterpriseAddQuery.registeredAddress = datail.value.registeredAddress
    // enterpriseAddQuery.industryCode = datail.value.industryCode
    // enterpriseAddQuery.businessLicenseUrl = datail.value.businessLicenseUrl
    // enterpriseAddQuery.businessLicenseId = datail.value.businessLicenseId
  }
})

const enterpriseAddButtonFormRef = ref<FormInstance | null>(null)
const enterpriseAddTopFormRef = ref<FormInstance | null>(null)

const rules = reactive({
  name: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
  legalPerson: [{ required: true, message: '请输入法人', trigger: 'blur' }],
  registeredAddress: [{ required: true, message: '请输入注册地址', trigger: 'blur' }],
  industryCode: [{ required: true, message: '请选择所在行业', trigger: 'blur' }],
  businessLicenseUrl: [{ required: true, message: '请上传营业执照', trigger: 'change' }],
  businessLicenseId: [{ required: true, message: '请输入营业执照编号', trigger: 'blur' }],
  contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
  contactNumber: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
})

const checkForm = (formInstance: FormInstance) => {
  return new Promise<boolean>((resolve, reject) => {
    formInstance.validate((valid: boolean) => {
      if (valid) {
        resolve(true)
      } else {
        reject(false)
      }
    })
  })
}

const handelSubmit = () => {
  const list = [
    checkForm(enterpriseAddButtonFormRef.value!),
    checkForm(enterpriseAddTopFormRef.value!)
  ]

  Promise.all(list)
    .then(async () => {
      if (type.value === 'add') {
        try {
          await addEnterprise(enterpriseAddQuery).then((res) => {
            if (res.code === 10000) {
              ElMessage.success('添加成功')
            }
          })
          goBack()
        } catch (error: any) {
          ElMessage.error(error.response.data.msg)
        }
      }
      if (type.value === 'edit') {
        try {
          await editEnterprise().then((res) => {
            if (res.code === 10000) {
              ElMessage.success('修改成功')
            }
          })
          goBack()
        } catch (error: any) {
          ElMessage.error(error.response.data.msg)
        }
      }
    })
    .catch(() => {
      console.log('Form validation failed.')
    })
}

const uploadQuery = reactive<UploadDataQuery>({
  file: '',
  type: '1'
})

const beforeUpload = (rawFile: UploadRawFile) => {
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/jpg'
  ) {
    ElMessage.error('图片格式必须是JPEG/JPG/PNG')
    return false
  }
  if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('图片大小不能超过5MB')
    return false
  }

  uploadQuery.file = rawFile
  uploadEnterprise(uploadQuery).then((res) => {
    enterpriseAddQuery.businessLicenseUrl = res.data.url
    enterpriseAddQuery.businessLicenseId = res.data.id
    if (res) {
      ElMessage.success('上传成功')
    } else {
      ElMessage.error('上传失败')
    }
  })
  return false
}
</script>

<template>
  <div class="enterpriseAdd">
    <el-container>
      <el-header>
        <el-page-header @back="goBack">
          <template #content>
            <span class="text-large font-600 mr-3"> {{ title }} </span>
          </template>
        </el-page-header>
        <h3>黑马管理员</h3>
      </el-header>
      <el-main>
        <div v-if="type === 'add'">
          <div class="enterpriseAdd-top">
            <p>企业信息</p>
            <el-form
              :inline="true"
              label-suffix=" : "
              :model="enterpriseAddQuery"
              :label-width="90"
              ref="enterpriseAddTopFormRef"
              :rules="rules"
            >
              <el-form-item label="企业名称" prop="name">
                <el-input v-model="enterpriseAddQuery.name"></el-input>
              </el-form-item>
              <el-form-item label="法人" prop="legalPerson">
                <el-input v-model="enterpriseAddQuery.legalPerson"></el-input>
              </el-form-item>
              <el-form-item label="注册地址" prop="registeredAddress">
                <el-input v-model="enterpriseAddQuery.registeredAddress"></el-input>
              </el-form-item>
              <el-form-item label="所在行业" prop="industryCode">
                <el-select
                  v-model="enterpriseAddQuery.industryCode"
                  style="height: 40px"
                  class="custom-select"
                >
                  <el-option
                    v-for="(item, index) in selectData"
                    :key="index"
                    :label="item.industryName"
                    :value="item.industryCode"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="营业执照" prop="businessLicenseUrl">
                <el-upload class="upload-demo" action="/" :before-upload="beforeUpload" :limit="3">
                  <el-button type="primary">上传文件</el-button>
                  <template #tip>
                    <div class="el-upload__tip">
                      支持扩展名：.png .jpg .jpeg，文件大小不得超过5M
                    </div>
                  </template>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
          <div class="enterpriseAdd-bottom">
            <p>联系人信息</p>
            <el-form
              :inline="true"
              label-suffix=" : "
              :model="enterpriseAddQuery"
              :label-width="100"
              ref="enterpriseAddButtonFormRef"
              :rules="rules"
            >
              <el-form-item label="企业联系人" prop="contact">
                <el-input v-model="enterpriseAddQuery.contact"></el-input>
              </el-form-item>
              <el-form-item label="联系人电话" prop="contactNumber">
                <el-input v-model="enterpriseAddQuery.contactNumber"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div v-if="type === 'edit' && datail.length > 0">
          <div class="enterpriseAdd-top">
            <p>企业信息</p>
            <el-form
              :inline="true"
              label-suffix=" : "
              :model="enterpriseAddQuery"
              :label-width="90"
              ref="enterpriseAddTopFormRef"
              :rules="rules"
            >
              <el-form-item label="企业名称" prop="name">
                <el-input v-model="enterpriseAddQuery.name"></el-input>
              </el-form-item>
              <el-form-item label="法人" prop="legalPerson">
                <el-input v-model="enterpriseAddQuery.legalPerson"></el-input>
              </el-form-item>
              <el-form-item label="注册地址" prop="registeredAddress">
                <el-input v-model="enterpriseAddQuery.registeredAddress"></el-input>
              </el-form-item>
              <el-form-item label="所在行业" prop="industryCode">
                <el-select
                  v-model="enterpriseAddQuery.industryCode"
                  style="height: 40px"
                  class="custom-select"
                >
                  <el-option
                    v-for="(item, index) in selectData"
                    :key="index"
                    :label="item.industryName"
                    :value="item.industryCode"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="营业执照" prop="businessLicenseUrl">
                <el-upload class="upload-demo" action="/" :before-upload="beforeUpload" :limit="3">
                  <el-button type="primary">上传文件</el-button>
                  <template #tip>
                    <div class="el-upload__tip">
                      支持扩展名：.png .jpg .jpeg，文件大小不得超过5M
                    </div>
                  </template>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
          <div class="enterpriseAdd-bottom">
            <p>联系人信息</p>
            <el-form
              :inline="true"
              label-suffix=" : "
              :model="enterpriseAddQuery"
              :label-width="100"
              ref="enterpriseAddButtonFormRef"
              :rules="rules"
            >
              <el-form-item label="企业联系人" prop="contact">
                <el-input v-model="enterpriseAddQuery.contact"></el-input>
              </el-form-item>
              <el-form-item label="联系人电话" prop="contactNumber">
                <el-input v-model="enterpriseAddQuery.contactNumber"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-main>
      <el-footer>
        <el-row justify="center">
          <el-col>
            <div style="width: 160px; margin: 23px auto">
              <el-button @click="enterpriseAddTopFormRef?.resetFields()">重置</el-button>
              <el-button type="primary" @click="handelSubmit">确定</el-button>
            </div>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
/* 样式调整 */
::-webkit-scrollbar {
  display: none;
}

.el-container {
  width: 100vw;
  height: 100vh;
  background-color: #f4f6f8;
  .el-main {
    .enterpriseAdd-top {
      height: 300px;
      padding: 20px;
      background-color: #fff;
      p {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -20px;
          display: block;
          width: 2px;
          height: 26px;
          background-color: #4770ff;
        }
      }
      .el-form {
        width: 70vw;
        margin: auto;
        margin-top: 20px;
        .el-form-item {
          .el-input {
            margin-bottom: 20px;
            width: 400px;
            height: 40px;
          }
          .el-select {
            width: 400px;
            height: 40px !important;
          }
        }
      }
    }
    .enterpriseAdd-bottom {
      margin-top: 20px;
      height: 120px;
      padding: 20px;
      background-color: #fff;
      p {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -20px;
          display: block;
          width: 2px;
          height: 26px;
          background-color: #4770ff;
        }
      }
      .el-form {
        width: 70vw;
        margin: auto;
        margin-top: 20px;
        .el-form-item {
          .el-input {
            margin-bottom: 20px;
            width: 400px;
            height: 40px;
          }
          .el-select {
            width: 400px;
            height: 40px !important;
          }
        }
      }
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > h3 {
      font-weight: 400;
    }
  }
  .el-footer {
    margin-top: 20px;
    height: 80px;
    background-color: #fff;
  }
}
</style>
