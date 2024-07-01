<script lang="ts" setup>
import { ref, reactive,useAttrs } from "vue";

const attrs = useAttrs();
const currentPage = ref(attrs.page);
const pageSize = ref(attrs.pageSize);
const emit =  defineEmits(['handleSizeChange','handleCurrentChange'])
const handleSizeChange = (val:number) => {
   emit('handleCurrentChange',val)
}
const handleCurrentChange = (val:number) => {
   emit('handleSizeChange',val)
}
</script>

<template>
    <div></div>
<el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="attrs.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
</template>

<style lang="scss" scoped>
.el-pagination {
    padding: 20px;
    margin-top: 20px;
    float:right;
}
</style>