<template>
  <div>
    <!-- 面包屑 -->
    <el-card class="first-div">
      <bread-crumb slot="header">
        <span slot="title" style="font-weight:700;color:black">内容列表</span>
      </bread-crumb>

      <el-form class="form-style">
        <el-form-item label="文章状态：">
          <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 -->
          <el-radio-group @change="changeCondition" v-model="formData.status">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表：">
          <el-select @change="changeCondition" v-model="formData.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelsList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
          <el-date-picker
            v-model="formData.date"
            @change="changeCondition"
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div></div>
    </el-card>
    <el-card class="second-div" style="margin-top:20px">
      <div class="content-title">共找到{{ pages.total_count }}条符合条件的内容</div>
      <div class="content" v-for="item in list" :key="item.id.toString()">
        <div class="left-content">
          <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt />
          <div class="info">
            <span class="title">{{item.title}}</span>
            <el-tag :type="item.status|changeType" class="status">{{item.status | changeStatus }}</el-tag>
            <span class="pubdate">{{item.pubdate}}</span>
          </div>
        </div>
        <div class="right-content">
          <i class="el-icon-edit">修改</i>
          <i @click="delMsg(item.id)" class="el-icon-delete">删除</i>
        </div>
      </div>
    </el-card>
    <!-- 分页 -->
    <el-row type="flex" justify="center" style="margin:20px 0">
      <el-pagination
        @size-change="changeNum"
        @current-change="changeNum"
        :page-size="pages.perPage"
        :current-page.sync="pages.currentPage"
        layout="prev, pager, next, jumper"
        :total="pages.total_count"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 空字符和null的区别
      // 空字符串有值 但是值是空字符串
      // null  => 空对象
      formData: {
        status: 5, // 默认选中全部 5代表全部
        channel_id: null, // 频道列表 默认为空
        date: [] // 时间
      },
      list: [], // 总数据
      defaultImg: require('../../assets/img/avatar.jpg'), // 默认图像
      pages: {
        total: 0, // 总条数
        perPage: 10, // 每页显示几条 默认10条
        currentPage: 1// 当前第几页 默认第一页

      }, // 页数相关
      channelsList: [] // 存放频道
    }
  },
  methods: {
    changeNum (newPage) {
      this.pages.currentPage = newPage
      this.getScreenMsg()
    },
    // 删除文章
    delMsg (id) {
      this.$confirm('您确定要删除此文章么？').then(() => {
        this.$http({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(() => {
          this.$message({ message: '删除成功', type: 'success' })
          this.getScreenMsg()
        })
      })
    },
    // 获得文章总数据
    getArticles (params) {
      this.$http({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results
        this.pages.total_count = result.data.total_count
      })
    },
    // 获得筛选之后的数据
    changeCondition () {
      this.pages.currentPage = 1
      this.getScreenMsg()
    },
    // 待条件查询的
    getScreenMsg () {
      // status 等于5 什么也不传 相当于查询全部
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channel_id,
        begin_pubdate: this.formData.date ? this.formData.date[0] : null,
        end_pubdate:
          this.formData.date.length > 1 ? this.formData.date[1] : null,
        page: this.pages.currentPage,
        per_page: this.pages.perPage
      }
      this.getArticles(params)
    },
    // 查询频道
    getChannelMsg () {
      this.$http({
        url: '/channels'
      }).then(result => {
        this.channelsList = result.data.channels
      })
    }
  },
  created () {
    this.getArticles()
    this.getChannelMsg()
  },
  // 过滤器
  // 过滤 status为01234等情况对应的状态以及样式
  filters: {
    changeStatus (status) {
      // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
      switch (status) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已审核'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    changeType (status) {
      switch (status) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'primary'
        case 3:
          return 'warning'
        case 4:
          return 'info'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.first-div {
  .form-style {
    margin-left: 100px;
  }
}
.second-div {
  .content-title {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px dashed #ccc;
  }
  .content {
    padding: 20px 0px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    .left-content {
      display: flex;
      img {
        width: 150px;
        height: 100px;
      }
      .info {
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 20px;
        .title {
          font-size: 14px;
        }
        .status {
          width: 60px;
          text-align: center;
        }
        .pubdate {
          font-size: 12px;
          color: #999;
        }
      }
    }
    .right-content {
      i {
        margin-right: 20px;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
}
</style>
