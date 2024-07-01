<script lang="ts" setup></script>

<template>
  <el-scrollbar>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-scrollbar>
</template>

<style lang="scss">
.el-main {
   height: 85vh;
  background-color: #f4f6f8;
}
::-webkit-scrollbar {
    display: none;
}
</style>
