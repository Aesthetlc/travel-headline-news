<template>
  <!-- 面包屑 -->
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <span slot="title">素材管理</span>
    </bread-crumb>
    <el-upload action="" :http-request="uploadImg" class="upload-button" :show-file-list="false">
      <el-button  type="primary" >上传素材</el-button>
    </el-upload>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
        <el-card class="img-card" v-for="item in imglist" :key="item.id">
          <img :src="item.url" alt />
          <div class="operate">
            <i @click="collectAndNoCollect(item)" :style='{ color:item.is_collected?"red":"#000"}' class="el-icon-star-on"></i>
            <i @click="delImg(item.id)" class="el-icon-delete-solid"></i>
          </div>
        </el-card>
      </div>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
        <el-card class="img-card" v-for="item in imglist" :key="item.id">
          <img :src="item.url" alt />
        </el-card>
      </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 分页 -->
    <el-row type="flex" justify="center" style="margin:20px 0">
      <el-pagination
        @size-change="changeNum"
        @current-change="changeNum"
        :page-size="pages.per_page"
        :current-page.sync="pages.page"
        layout="prev, pager, next, jumper"
        :total="pages.total_count"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
import { collectAndNoCollect, delImg, uploadImg, getImg } from '../../api/material'
export default {
  data () {
    return {
      activeName: 'all', // 默认显示全部图片
      imglist: [],
      pages: {
        per_page: 20, // 每页数量
        page: 1, // 当前页数
        total_count: 0 // 总条数
      },
      loading: false
    }
  },
  methods: {
    // 取消收藏与收藏的方法
    async collectAndNoCollect (item) {
      let status = item.is_collected ? '取消收藏' : '添加收藏'
      await this.$confirm(`您要${status}此素材么？`)
      await collectAndNoCollect(item)
      this.$message({ message: `${status}成功`, type: 'success' })
      this.getImg()
    },
    // 删除图片素材的方法
    // 删除是没有返回值的，这里会报错实际上已经删除了，
    // 解决方法就是在axios.config.js文件上处理bigNumber大数据的时候增加一个为空的判断
    async delImg (id) {
      await this.$confirm('您确定要删除此素材么?')
      await delImg(id)
      this.$message({ message: `素材删除成功`, type: 'success' })
      this.getImg()
    },
    // 上传图片的方法
    async uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      await uploadImg(data)
      this.$message({ message: '上传成功', type: 'success' })
      this.getImg()
    },
    // 分页点击切换的时候的方法
    changeNum (newPage) {
      this.pages.page = newPage
      this.getImg()
    },
    // 切换tabs的时候的方法
    handleClick () {
      // 切换的时候需要将当前页变为1页码
      this.pages.page = 1
      this.getImg()
    },
    // 获取素材图片的方法
    async getImg () {
      this.loading = true
      // this.activeName === 'collect' ==>true====>显示全部图片
      // this.activeName === 'collect' ==>false====>显示收藏图片
      let result = await getImg(this.pages, this.activeName)
      this.imglist = result.data.results
      this.pages.total_count = result.data.total_count
      this.loading = false
    }
  },
  created () {
    this.getImg()
  }
}
</script>

<style lang="less" scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .img-card {
    width: 220px;
    height: 200px;
    border-radius: 6px;
    margin: 30px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      background-color: #f4f5f6;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .el-icon-star-on,
      .el-icon-delete-solid {
        font-size: 22px;
        cursor: pointer;
      }
    }
  }
  /deep/ .el-card__body {
    padding: 0;
  }
}
.upload-button{
  position:absolute;
  right: 0;
  margin-right: 80px;
  margin-top: -10px;
  z-index: 1;
}
</style>
