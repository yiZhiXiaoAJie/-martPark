<script lang="ts" setup>
import {useLogin} from './composables/useLogin'
const {loginQuery, handelLogin,loginForm} = useLogin()
</script>

<template>
  <div class="login">
    <div class="login_img">
      <img src="https://fe-hmzs.itheima.net/assets/login-bg-e4ea539c.svg" alt="" />
    </div>
    <div class="login_form">
      <div class="login_form_box">
        <h3>智慧园-登录</h3>
        <el-form label-position="top" ref="loginForm" :model="loginQuery">
          <el-form-item prop="username" label="账号">
            <el-input v-model="loginQuery.username"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input v-model="loginQuery.password" type="password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked1">记住我</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handelLogin" class="login_btn">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  .login_img {
    flex: 2;
    overflow: hidden;
  }
  .login_form {
    flex: 1;
    display: flex;
    align-items: center;
    .login_form_box {
      margin: auto;
      > h3 {
        font-size: 25px;
        font-weight: 400;
        margin-bottom: 30px;
      }
      .el-form-item {
        margin-bottom: 30px;
        .el-input {
          width: 300px;
        }
        .login_btn {
          width: 100%;
          height: 40px;
        }
      }
    }
  }
}
</style>
