<script lang="ts" setup>
import { ref } from 'vue'
import { getLeftMenu } from '@/api/common/index'
import type { menusData } from '@/api/common/type'

const menuList = ref<menusData[]>([])
const getMenuList = async () => {
  const res = await getLeftMenu()
  menuList.value = res.data
}
getMenuList()
</script>

<template>
  <el-aside width="200px">
    <img src="@/assets/logo.png" alt="" class="aside-logo" />

    <el-menu
      active-text-color="#3656ff"
      background-color="#fff"
      class="el-menu-vertical-demo"
      :default-active="$route.path"
      text-color="#000"
      router
    >
      <template v-for="item in menuList" :key="item.id">
        <el-sub-menu :index="item.component" v-if="item.alwaysShow">
          <template #title>
           <img :src="item.icon" alt="" class="icon">
            <span>{{ item.title }}</span>
          </template>
         
            <el-menu-item v-for="childItem in item.children" :key="childItem.id" :index="childItem.component">{{ childItem.title }}</el-menu-item>
         
      
        </el-sub-menu>
        <el-menu-item :index="item.component" v-else>
          <img :src="item.icon" alt="" class="icon">
          <span>{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<style lang="scss" scoped>

  .icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

.aside-logo {
  width: 90%;
  height: 60px;
  margin-left: 30px;
}
.el-menu {
  border-right: none;
}
</style>
