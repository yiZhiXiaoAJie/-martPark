<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { getUserInfo } from '@/api/common/index'
import { type UserInfo } from '@/api/common/types'
import router from '@/router'

const userInfo = ref<UserInfo>()

const getUser = () => {
  getUserInfo().then((res) => {
    userInfo.value = res.data
  })
}
getUser()

const handelExit = () => {
  localStorage.removeItem('token')
  router.replace('/')
}
const handelRun = () => {
  window.open('/bigscreen/home', '_blank');

}
</script>

<template>
  <el-header>
    <div>
      <el-button @click="handelRun">可视化大屏</el-button>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          {{ userInfo?.name }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handelExit">退出登录</el-dropdown-item>
            <el-dropdown-item command="e" divided>修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: end;
  align-items: center;
  .el-button {
    margin-right: 15px;
  }
  .el-dropdown {
    margin-top: 8px;
    .el-dropdown-link {
      font-weight: 600;
    }
  }
}
</style>
