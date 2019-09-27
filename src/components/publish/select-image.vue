<template>
  <el-tabs>
    <el-tab-pane label="全部素材">
      <div class="select-image">
        <div class="select-image-item" v-for="(item,index) in imglist" :key="index">
          <img @click="sendImgUrl(item.url)" :src="item.url" />
        </div>
      </div>

      <el-row type="flex" justify="center" style="margin-top:20px">
        <el-pagination
          @size-change="changeNumber"
          @current-change="changeNumber"
          :current-page.sync="page.currentPage"
          :page-size="page.page_size"
          layout="prev, pager, next, jumper"
          :total="page.total"
        ></el-pagination>
      </el-row>

    </el-tab-pane>
    <el-tab-pane label="上传素材">
      <el-upload action :http-request="uploadImg" :show-file-list="false">
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { getImg, uploadImg } from '../../api/material'
export default {
  data () {
    return {
      imglist: [],
      page: {
        currentPage: 1,
        page_size: 10,
        total: 0
      }// 分页数据
    }
  },
  methods: {
    // 改变页码
    changeNumber (newPage) {
      this.page.currentPage = newPage
      this.getImage()
    },
    // 上传图片
    async uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      let result = await uploadImg(data)
      this.$emit('getImgUrl', result.data.url)
    },
    // 给父级传递图片url
    sendImgUrl (url) {
      this.$emit('getImgUrl', url)
    },
    // 获取素材
    async  getImage () {
      let result = await getImg(this.page, 'all')
      this.imglist = result.data.results
      this.page.total = result.data.total_count
    }
  },
  created () {
    this.getImage()
  }
}
</script>

<style lang="less" scoped>
.select-image {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .select-image-item {
    height: 160px;
    width: 160px;
    margin-top: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.avatar-uploader-icon {
  height: 300px;
  width: 300px;
  border: 1px solid #ccc;
  line-height: 300px;
  font-size: 50px;
}
</style>
