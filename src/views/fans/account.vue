<template>
  <el-card>
    <bread-crumb slot="header">
      <span slot="title">粉丝列表</span>
    </bread-crumb>

     <!-- @tab-click="handleClick" -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="粉丝概况" name="general">粉丝概况</el-tab-pane>
      <el-tab-pane label="粉丝画像" name="portrayal">粉丝画像</el-tab-pane>
      <el-tab-pane label="粉丝列表" name="fanslist" v-loading="loading">
        <div class="fans-form">
          <div class="fans-item" v-for="(item,index) in fanslist" :key="index">
            <div class="fans-img">
              <img :src="item.photo" alt />
              <span>{{ item.name }}</span>
              <el-button type="primary">关注</el-button>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <el-row type="flex" justify="center" style="margin:20px 0">
          <el-pagination
            @size-change="changeNum"
            @current-change="changeNum"
            :page-size="pages.perSize"
            :current-page.sync="pages.currentPage"
            layout="prev, pager, next, jumper"
            :total="pages.total"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { getFans } from '../../api/fans'
export default {
  data () {
    return {
      fanslist: [],
      pages: {
        currentPage: 1, // 当前页1
        total: 0, // 总页数0
        perSize: 20 // 每页显示的条数
      },
      loading: false,
      activeName: 'fanslist'
    }
  },
  methods: {
    // 分页
    changeNum (newPage) {
      this.pages.currentPage = newPage
      this.getFans()
    },
    // 获取粉丝列表的方法
    async getFans () {
      this.loading = true
      let result = await getFans(this.pages)
      this.fanslist = result.data.results
      this.pages.total = result.data.total_count
      this.loading = false
    }
  },
  created () {
    this.getFans()
  }
}
</script>

<style lang="less" scoped>
.fans-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .fans-item {
    height: 200px;
    width: 250px;
    margin: 20px;
    border: 1px solid #ccc;
    .fans-img {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        border-radius: 50%;
        height: 70px;
        width: 70px;
        margin-top: 15px;
        margin-bottom: 15px;
      }
      span {
        display: inline-block;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
