<template>
  <el-card>
    <bread-crumb slot="header">
      <span slot="title">粉丝概况</span>
    </bread-crumb>
    <fans-general></fans-general>
    <div class="general">
      <div class="left">
        <div class="roundness"></div>
        <div class="fansNum">
          <span>30个</span>
          <span>粉丝数</span>
        </div>
      </div>
      <div class="center">
        <div class="roundness"></div>
        <div class="fansNum">
          <span>22%</span>
          <span>粉丝累计阅读量</span>
        </div>
      </div>
      <div class="right">
        <div class="roundness"></div>
        <div class="fansNum">
          <span>1.2元</span>
          <span>粉丝收益</span>
        </div>
      </div>
    </div>
    <p>粉丝分布曲线：</p>
    <div class="fansCurve" ref="fansCurve"></div>
    <p>数据列表: </p>
    <div class="fansTable">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
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
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  components: {
    'fans-general': fans
  },
  methods: {
    fansSetoption () {
      this.fansChart.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      })
    }
  },
  // 页面选然后执行
  mounted () {
    this.fansChart = echarts.init(this.$refs.fansCurve)
    this.fansSetoption()
  },
  created () {}
}
</script>

<style lang="less" scoped>
.general {
  display: flex;
  .left,
  .center,
  .right {
    background-color: rgb(248, 248, 248);
    height: 92px;
    width: 514px;
    margin: 30px 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .roundness {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background-color: red;
      margin-right: 20px;
    }
    .fansNum {
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      span:nth-child(1) {
        font-size: 20px;
      }
      span:nth-child(2) {
        font-size: 14px;
      }
    }
  }
}
.fansCurve {
  height: 500px;
  width: 1500px;
}
.fansTable {
  position: relative;
  left: 140px;
  height: 300px;
  width: 1000px;
}
</style>
