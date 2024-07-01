<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getBarData } from '@/api/bigScreen/index'
import * as echarts from 'echarts'
import VScaleScreen from 'v-scale-screen'
import { scene, camera, renderer, controls } from '@/utils/ThreeInit'
import { Application } from '@splinetool/runtime'

const barRef = ref<HTMLElement | null>(null)
const barList = ref<any[]>()
const nameList = ref<string[]>([])
const dataSource = ref<any[]>([])

const getBar = async () => {
  const res = await getBarData()
  console.log(res)
  barList.value = res.data.parkIndustry

  nameList.value = res.data.parkIncome.xMonth
  dataSource.value = res.data.parkIncome.yIncome
  const isRedList = new Array(dataSource.value.length).fill(0)
  const max = Math.max(...dataSource.value, 1)
  const getSymbolData = (datas: any) => {
    let arr = []
    for (var i = 0; i < datas.length; i++) {
      isRedList[i] = max
      arr.push({
        value: datas[i],
        symbolPosition: 'end'
      })
    }
    return arr
  }
  if (barRef.value) {
    const myChart = echarts.init(barRef.value)
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        padding: 20,
        axisPointer: {
          type: 'shadow',
          label: {
            show: true,
            backgroundColor: '#333333'
          }
        },
        backgroundColor: 'rgba(10,26,52,0.7)',
        textStyle: {
          color: '#fff'
        },
        extraCssText: 'box-shadow: 0 2px 25px #5cc0fd inset;text-align: center',
        formatter: '{b}<br />{a}:{c}'
      },
      grid: {
        left: 40,
        top: '10%',
        right: '1%',
        bottom: '15%'
      },
      xAxis: {
        data: nameList.value || [],
        type: 'category',
        axisLabel: {
          show: true,
          fontSize: 8,
          interval: 0,
          textStyle: {
            color: 'rgba(172, 201, 226, 1)'
          }
        },
        axisTick: {
          show: true
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(200, 225, 246, 1)',
            type: 'solid'
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: 'rgba(47, 248, 252, 0.1)'
          }
        }
      },
      yAxis: [
        {
          nameTextStyle: {
            color: '#EEE',
            fontSize: 8
          },
          splitNumber: 3,
          max,
          type: 'value',
          axisLabel: {
            show: true,
            showMaxLabel: true,
            fontSize: 8,
            textStyle: {
              color: 'rgba(172, 201, 226, 1)'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: 'rgba(47, 248, 252, 0.3)',
              type: 'solid'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(160, 222, 255, 1)',
              type: 'dashed',
              opacity: 0.2
            }
          }
        }
      ],
      series: [
        {
          name: '园区年度收入',
          type: 'bar',
          label: {
            position: 'top',
            distance: 2,
            color: 'rgba(0, 166, 255, 1)',
            fontWeight: 'bolder',
            fontSize: nameList.value.length > 20 ? 9 : 12
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 166, 255, 1)',
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(0, 166, 255, 0.1)'
                },
                {
                  offset: 0.5,
                  color: 'rgba(0, 166, 255, 0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(0, 166, 255, 0.5)'
                }
              ])
            }
          },
          data: dataSource.value || []
        },
        {
          type: 'pictorialBar',
          symbol: 'rect',
          symbolSize: [25, 3],
          symbolOffset: [0, -2],
          z: 12,
          itemStyle: {
            color: 'rgba(252, 194, 50, 1)',
            shadowColor: 'rgba(252, 194, 50, 1)'
          },
          data: getSymbolData(dataSource.value)
        },
        {
          type: 'bar',
          barGap: '-108%',
          data: isRedList,
          tooltip: {
            backgroundColor: 'transparent',
            formatter: ' '
          },
          itemStyle: {
            normal: {
              color: 'rgba(200,225,246,0.1)'
            }
          },
          zlevel: 7
        }
      ]
    })
  }
}

onMounted(() => {
  getBar()
})

const pieRef = ref<HTMLElement | null>(null)
const colorList = ['#ffcf54', '#00b2ff', '#2cf2ff', '#892cff', '#ff624d']
const initializePieChart = () => {
  if (pieRef.value && barList.value) {
    const myChart = echarts.init(pieRef.value)
    myChart.setOption({
      tooltip: {
        trigger: 'item',
        show: true
      },
      legend: {
        orient: 'horizontal',
        bottom: '0',
        top: 'bottom',
        textStyle: {
          color: '#fff', // 这里设置图例文字的颜色
          fontSize: 10 // 可以设置文字的大小
        },

        itemGap: 8
        // show: false,
        // clickable: false,
        // selectedMode: false,
      },
      grid: {
        top: '0px',
        left: '0px'
      },
      title: {
        x: 'center',
        y: 'center',
        textStyle: {
          rich: {
            v: { fontSize: 20, color: '#404040', fontWeight: 500, lineHeight: 22 },
            t: { fontSize: 12, color: '#404040', lineHeight: 18 },
            unit: { fontSize: 12, color: '#404040' }
          }
        }
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['50%', '60%'],
          avoidLabelOverlap: false,
          itemStyle: {
            normal: {
              color: function (params: any) {
                return colorList[params.dataIndex]
              }
            }
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: barList.value
        }
      ]
    })
  }
}

onMounted(() => {
  getBar().then(() => {
    initializePieChart()
  })
})
const ref3d = ref<HTMLCanvasElement | undefined>()
const init3D = () => {
  const spline = new Application(ref3d.value)
  // console.log(spline)
  

  

  spline.load('https://fe-hmzs.itheima.net/scene.splinecode').then((res) => {
    console.log('加载成功')
   spline.data.scene.ownerCamera.scale[0] = 0.2
   spline.data.scene.ownerCamera.scale[1] = 0.2
   spline.data.scene.ownerCamera.scale[2] = 0.2
  })
}
onMounted(() => {
  init3D()
})
</script>

<template>
  <v-scale-screen width="1920" height="1080">
    <div class="three_box">
      <div class="echarts-container">
        <div>
          <img
            class="title"
            src="https://fe-hmzs.itheima.net/big-screen/img/park-logo.48f47fe1.png"
            alt=""
          />
        </div>
        <div class="gaishu">
          <img src="/one.png" alt="" />
          <div class="gaishu_tubiao">
            <div class="box">
              <div class="tubiaoboxone">28</div>
              <div class="tubiaoboxtwo">5</div>
              <div class="tubiaoboxthree">1530</div>
              <div class="tubiaoboxfro">48</div>
            </div>
            <div class="tubiaofutitle">
              <p>楼宇总数</p>
              <p>入驻企业总数</p>
              <p>车位总数</p>
              <p>一体杆总数</p>
            </div>
            <div class="dan">
              <p>（栋）</p>
              <p>（家）</p>
              <p>（个）</p>
              <p>（个）</p>
            </div>
          </div>
        </div>
        <div class="bar">
          <img class="bar_img" src="/two.png" alt="" />
          <div ref="barRef" class="bar_item"></div>
        </div>
        <div class="pie">
          <img class="pie_img" src="/three.png" alt="" />
          <div class="pie_item" ref="pieRef"></div>
        </div>
      </div>
      <div class="three">
        <canvas class="canvas-3d" ref="ref3d"></canvas>
      </div>
    </div>

  </v-scale-screen>
</template>

<style lang="scss" scoped>
.three {
  // position: absolute;
  // top: 0;
  margin-top: -890px;
  float: right;
  z-index:1;
  .canvas-3d {
    width: 80vw;
    height: 100vh;
    z-index: 1;
  }
}
.pie {
  width: 300px;
  height: 350px;
  margin-top: 50px;

  .pie_img {
    width: 100%;
    height: 30px;
  }
  .pie_item {
    height: 350px;
    width: inherit;
    margin-top: 20px;
  }
}
.three_box {
  color: #fff;
  height: 100vh;
  background-color: #000;
  padding: 0 100px;
  .echarts-container {
    width: 300px;
    height: 100vh;
    // float: left;
    z-index: -1;
    .title {
      width: 300px;
      height: 50px;
    }
    .gaishu {
      width: 300px;
      height: 30px;
      margin-top: 30px;

      > img {
        width: 100%;
        height: 100%;
      }
      .gaishu_tubiao {
        padding: 10px 5px;
        box-sizing: border-box;
        width: inherit;

        // height: 400px;
        margin-top: 10px;
        .box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: center;
          color: #fff;
          height: 100px;
          .tubiaoboxone {
            width: 70px;
            height: 70px;
            background-size: 100%, 100%;
            background-image: url('https://fe-hmzs.itheima.net/big-screen/img/building-icon.604513ec.png');
          }
          .tubiaoboxtwo {
            width: 70px;
            height: 70px;
            background-size: 100%, 100%;
            background-image: url('https://fe-hmzs.itheima.net/big-screen/img/enterprise-icon.333dc185.png');
          }
          .tubiaoboxthree {
            width: 70px;
            height: 70px;
            background-size: 100%, 100%;
            background-image: url('https://fe-hmzs.itheima.net/big-screen/img/car-icon.17192bcf.png');
          }
          .tubiaoboxfro {
            width: 70px;
            height: 70px;
            background-size: 100%, 100%;
            background-image: url('https://fe-hmzs.itheima.net/big-screen/img/rod-icon.3c34a874.png');
          }
        }
        .tubiaofutitle {
          display: flex;
          font-size: 10px;
          justify-content: space-between;
          align-items: center;
          margin-top: -8px;
          > p {
            width: 100px;
            text-align: center;
          }
        }
        .dan {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          > p {
            width: 100px;
            text-align: center;
          }
        }
      }
    }
  }
}
.bar {
  margin-top: 200px;
  width: 300px;
  height: 300px;

  .bar_img {
    width: 300px;
    height: 30px;
  }
  .bar_item {
    height: 260px;
  }
}
</style>
