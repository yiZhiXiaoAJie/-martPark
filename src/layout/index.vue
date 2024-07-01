<script lang="ts" setup>
import { ref, reactive } from 'vue'
import AppAside from './aside/Aside.vue'
import AppHead from './head/Head.vue'
import AppMain from './main/Main.vue'
</script>

<template>
  <el-container>
    <app-aside class="aside"></app-aside>
    <el-container direction="vertical">
      <AppHead class="head"></AppHead>
      <AppMain></AppMain>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.aside {
  height: 100vh;
  background-color: #fff;
}
.head {
  background-color: #f4f6f8;
}

</style>
