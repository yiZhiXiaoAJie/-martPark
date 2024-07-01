<script lang="ts" setup>
import type { BuildingQuery } from '@/api/park/building/type'
import { reactive, watch } from 'vue'
const props = defineProps<{
  buildingQuery: BuildingQuery
  total: number
}>()
const emit = defineEmits(['update:buildingQuery'])

const localBuildingQuery = reactive<BuildingQuery>({ ...props.buildingQuery })

const handleSizeChange = (newSize: number) => {
  localBuildingQuery.pageSize = newSize.toString()
  emit('update:buildingQuery', { ...localBuildingQuery })
}

const handleCurrentChange = (newPage: number) => {
  localBuildingQuery.page = newPage.toString()
  emit('update:buildingQuery', { ...localBuildingQuery })
}

watch(
  () => props.buildingQuery,
  (newQuery) => {
    localBuildingQuery.page = newQuery.page
    localBuildingQuery.pageSize = newQuery.pageSize
  },
  { deep: true }
)
</script>

<template>
  <div class="pagination">
    <el-pagination
      v-model:current-page="buildingQuery!.page"
      v-model:page-size="buildingQuery!.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: end;
}
.el-pagination {
  margin-top: 10px;
}
</style>
