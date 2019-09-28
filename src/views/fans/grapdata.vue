<template>
  <el-card>
    <bread-crumb slot="header">
      <span slot="title">图文信息</span>
    </bread-crumb>
    <el-row type="flex" justify="space-around">
      <!-- 图标一 -->
      <div class="chartWork" ref="chartWork"></div>
      <!-- 图标二 -->
      <div class="chartStudy" ref="chartStudy"></div>
    </el-row>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      // 定义数据
      workdata: [820, 932, 901, 934, 1290, 1330, 1320],
      studydata: [10, 52, 200, 334, 390, 330, 220]
    }
  },
  // 监控数据的改变，一但改变立即执行
  watch: {
    workdata (newValue) {
      // 重新的setoption
      this.workSetoption()
    },
    studydata (newValue) {
      this.studySetoption()
    }
  },
  // 实例创建完毕之后就执行
  created () {
    setInterval(() => {
      this.updateData()
    }, 1000)
  },
  // 页面渲染后执行
  mounted () {
    this.workChart = echarts.init(this.$refs.chartWork)
    this.studyChart = echarts.init(this.$refs.chartStudy)
    this.workSetoption()
    this.studySetoption()
  },
  methods: {
    updateData () {
      this.workdata = this.workdata.map(item => {
        return item * (Math.random() + 1)
      })
      this.studydata = this.studydata.map(item => {
        return item * (Math.random() + 1)
      })
    },
    workSetoption () {
      this.workChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.workdata,
            type: 'line'
          }
        ]
      })
    },
    studySetoption () {
      this.studyChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: this.studydata
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.chartWork,
.chartStudy {
  height: 600px;
  width: 600px;
}
</style>
