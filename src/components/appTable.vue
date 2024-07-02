<script lang="ts" setup>
import { defineProps,ref } from 'vue'
import { type Row } from '@/api/park/enterprise/type'
import type { TableConfig, TableSonConfig } from '@/views/park/enterprise/config/type'
const prop = withDefaults(
  defineProps<{
    enterpriseList?: any[]
    tableConfig?: TableConfig[]
    tableSonConfig?: TableSonConfig[]
    expand?: string
    border?: boolean
    selection?: string
  }>(),
  {
    border: false
  }
)
const emit =  defineEmits(['getIds'])
const ids = ref<string []>([])
const handelSelectionChange = (val: any) => {
  // console.log(val);
  
  ids.value = []
  val.forEach((item:any) => {
    ids.value.push(item.id)
  })
  emit('getIds',ids.value)
}

</script>

<template>
  <el-table
    :data="enterpriseList"
    style="width: 100%"
    :border="border"
    :header-cell-style="{
      background: '#f4f6f8',
      fontWeight: 400,
      color: '#000',
      height: '50px',
      'text-align': 'center'
    }"
    :cell-style="{ textAlign: 'center' }"
    @select="handelSelectionChange"
  >
    <template v-if="expand">
      <el-table-column type="expand">
        <template #default="{ row }">
          <el-table
            :data="row[tableSonConfig]"
            :header-cell-style="{
              background: '#f4f6f8',
              fontWeight: 400,
              color: '#000',
              height: '50px',
              'text-align': 'center'
            }"
            :cell-style="{ textAlign: 'center' }"
          >
            <el-table-column v-for="(son, inx) in tableSonConfig" :key="inx" :label="son.label">
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </template>
    <template v-if="selection">
      <el-table-column type="selection" width="55" />
    </template>

    <template v-for="(item, index) in tableConfig" :key="index">
      <template v-if="!item.slot">
        <el-table-column
          v-if="item.type === 'index'"
          type="index"
          :label="item.label"
          :width="item.width"
        />
        <el-table-column v-else :prop="item.prop" :label="item.label" />
      </template>
      <template v-else>
        <el-table-column v-if="item.slot" :prop="item.prop" :label="item.label">
          <template #default="{ row }">
            <slot :name="item.slot" :row="row"></slot>
          </template>
        </el-table-column>
      </template>
    </template>
  </el-table>
</template>

<style lang="scss" scoped></style>
