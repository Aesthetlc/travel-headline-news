<template>
  <el-card>
    <bread-crumb slot="header">
      <span slot="title">粉丝画像</span>
    </bread-crumb>
    <fans-fancpic></fans-fancpic>
    <div class="fans-distribution">
      <div style="float:left">粉丝性别分布</div>
      <div style="float:right">
        <span class="boy">男（50%）</span>
        <span class="girl">女（50%）</span>
      </div>
    </div>
    <el-progress :text-inside="true" :stroke-width="30" :percentage="50"></el-progress>
    <div style="height:50px;line-height:50px">头条粉丝</div>
    <div class="fans-status">
      <div class="fansEcharts" ref="fansEcharts"></div>
      <div class="fansTable">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="姓名" width="179"></el-table-column>
          <el-table-column prop="fans" label="粉丝占比" width="179"></el-table-column>
        </el-table>
      </div>
    </div>
  </el-card>
</template>

<script>
import echarts from 'echarts'
import fans from '../../components/fansnav/fansnav.vue'
export default {
  data () {
    return {
      tableData: [
        {
          name: '王小虎',
          fans: '50%'
        },
        {
          name: '王小帅',
          fans: '10%'
        },
        {
          name: '王小花',
          fans: '20%'
        },
        {
          name: '王小然',
          fans: '30%'
        }
      ]
    }
  },
  components: {
    'fans-fancpic': fans
  },
  mounted () {
    this.fansEcharts = echarts.init(this.$refs.fansEcharts)
    this.fansSetoption()
  },
  methods: {
    fansSetoption () {
      this.fansEcharts.setOption({
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
            barWidth: '30%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-progress-bar__inner {
  border-radius: 0 !important;
  background-color: #409eff !important;
}
/deep/ .el-progress-bar__outer {
  border-radius: 10px !important;
  background-color: #fa8665 !important ;
}
.fans-distribution {
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  .boy::before {
    display: inline-block;
    content: "";
    height: 10px;
    width: 10px;
    border-radius: 3px;
    background-color: #69b4ff;
    margin-right: 4px;
  }
  .girl::before {
    display: inline-block;
    content: "";
    height: 10px;
    width: 10px;
    border-radius: 3px;
    background-color: #fa8665;
    margin-right: 4px;
  }
}
.fans-status {
  display: flex;
  height: 600px;
  line-height: 50px;
  .fansEcharts {
    border: 1px solid #ccc;
    height: 500px;
    width: 1400px;
  }
  .fansTable {
    border: 1px solid #ccc;
    width: 380px;
    height: 500px;
    border-left: 0px;
  }
}
</style>
