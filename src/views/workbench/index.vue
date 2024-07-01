<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import { getWorkbenchData } from '@/api/workbench/index'
import type { WorkbenchData } from '@/api/workbench/type'
import * as echarts from 'echarts'

const barData = ref<WorkbenchData>()
const barRef = ref<HTMLElement | null>()

const getList = async () => {
  const res = await getWorkbenchData()
  barData.value = res.data
  console.log(barData.value, 'bbbb')

  // Wait for the DOM to be updated
  await nextTick()

  // Initialize ECharts after data is loaded and DOM is updated
  if (barRef.value) {
    const myChart = echarts.init(barRef.value)
    myChart.setOption({
      xAxis: {
        type: 'category',
        data: barData.value?.parkIncome.xMonth
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: barData.value?.parkIncome.yIncome,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    })
  }
}
onMounted(() => {
  getList()
})
</script>

<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" :lg="16" :sm="24">
        <div class="grid-content ep-bg-purple">
          <div>园区数据</div>
          <div class="parkData">
            <div>
              <p>年度累计收费（元）</p>
              <p>56153.03</p>
            </div>
            <div>
              <p>入驻企业总数（个）</p>
              <p>6</p>
            </div>
            <div>
              <p>月卡车辆总数（辆）</p>
              <p>5</p>
            </div>
            <div>
              <p>一体杆总数（台）</p>
              <p>48</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6" :lg="8" :sm="24">
        <div class="grid-content ep-bg-purple">
          <div>快捷入口</div>
          <div class="quick">
            <div>
              <img src="../../assets/image/one.png" alt="" />
              <p>添加企业</p>
            </div>
            <div>
              <img src="../../assets/image/two.png" alt="" />
              <p>员工管理</p>
            </div>
            <div>
              <img src="../../assets/image/tree.png" alt="" />
              <p>添加菜单</p>
            </div>
            <div>
              <img src="../../assets/image/fis.png" alt="" />
              <p>数据大屏</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="echarts ep-bg-purple">
          <div>年入统计</div>
          <div style="height: 350px; width: 100%" ref="barRef"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="equipment ep-bg-purple">
          <div>设备告警派单</div>
          <div>
            <el-empty description />
            <el-button type="primary" round class="btnRound">更多 <i-ep-ArrowRight></i-ep-ArrowRight> </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="echarts ep-bg-purple">
          <div>临期合同提醒</div>
          <el-empty description />
        </div>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.el-row {
  .el-col {
    .grid-content {
      background-color: #fff;
      height: 130px;
      margin-bottom: 10px;
      padding: 20px;
      .quick {
        margin-top: 25px;
        display: flex;
        justify-content: space-between;
        > div {
          > img {
            width: 44px;
            height: 44px;
          }
          > p {
            font-size: 12px;
          }
        }
      }
      .parkData {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        p {
          &:first-of-type {
            color: #909399;
          }
          &:last-of-type {
            font-weight: 600;
            font-size: 24px;
          }
        }
      }
    }
    .echarts {
      margin-top: 25px;
      height: 382px;
      background-color: #fff;
      padding: 20px;
    }
    .equipment {
      margin-top: 25px;
      height: 320px;
      background-color: #fff;
      padding: 20px;
      .btnRound {
        width: 90%;
        font-size: 16px;
        letter-spacing: 2px;
        height: 40px;
        margin-top: -30px;
        margin-left: 20px;
        background-color: #4770ff;
      }
    }
  }
}
</style>
