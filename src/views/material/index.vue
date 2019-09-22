<template>
  <!-- 面包屑 -->
  <el-card>
    <bread-crumb slot="header">
      <span slot="title">素材管理</span>
    </bread-crumb>
    <el-upload action="" :http-request="uploadImg" class="upload-button" :show-file-list="false">
      <el-button  type="primary" >上传素材</el-button>
    </el-upload>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部素材" name="all"></el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect"></el-tab-pane>
      <div class="img-list">
        <el-card class="img-card" v-for="item in imglist" :key="item.id">
          <img :src="item.url" alt />
          <div class="operate">
            <i :style='{ color:item.is_collected?"red":"#000"}' class="el-icon-star-on"></i>
            <i class="el-icon-delete-solid"></i>
          </div>
        </el-card>
      </div>
    </el-tabs>

    <!-- 分页 -->
    <el-row type="flex" justify="center" style="margin:20px 0">
      <el-pagination
        @size-change="changeNum"
        @current-change="changeNum"
        :page-size="pages.per_page"
        layout="prev, pager, next, jumper"
        :total="pages.total_count"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认显示全部图片
      imglist: [],
      pages: {
        per_page: 20, // 每页数量
        page: 1, // 当前页数
        total_count: 0 // 总条数
      }
    }
  },
  methods: {
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$http({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        this.$message({ message: '上传成功', type: 'success' })
        this.getImg()
      })
    },
    changeNum (newPage) {
      this.pages.page = newPage
      this.getImg()
    },
    handleClick () {
      // 切换的时候需要将当前页变为1页码
      this.pages.page = 1
      this.getImg()
    },
    getImg () {
      // this.activeName === 'collect' ==>true====>显示全部图片
      // this.activeName === 'collect' ==>false====>显示收藏图片
      this.$http({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.pages.page,
          per_page: this.pages.per_page
        }
      }).then(result => {
        this.imglist = result.data.results
        this.pages.total_count = result.data.total_count
      })
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
