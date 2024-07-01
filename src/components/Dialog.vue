<script lang="ts" setup>
import { ref, reactive } from 'vue'

const dialogVisible = defineModel('dialogVisible')
defineProps<{
  title: string
}>()

const handleClose = () => {
  dialogVisible.value = false
}
</script>

<template>
  <div></div>
  <el-dialog v-model="dialogVisible" :title="title" width="500" :before-close="handleClose">
    <slot></slot>
    <template #footer>
      <div class="dialog-footer">
        <el-row justify="end">
          <el-col>
            <slot name="btn" />
          </el-col>
        </el-row>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.el-dialog {
  padding: 10px;
}
.dialog-footer {
  height: 50px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
