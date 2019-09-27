<template>
  <!-- 面包屑 -->
  <el-card>
    <bread-crumb slot="header">
      <span slot="title" style="font-weight:700;color:black">发布文章</span>
    </bread-crumb>
    <el-form
      :model="formData"
      :rules="rules"
      ref="form"
      style="margin-left:100px"
      label-width="100px"
    >
      <el-form-item label="标题" prop="title">
        <el-input style="width:400px" v-model="formData.title" placeholder="文章名称"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor v-model="formData.content" style="height:400px"></quill-editor>
      </el-form-item>
      <el-form-item label="封页" style="margin-top:80px" prop="cover">
        <el-radio-group v-model="formData.cover.type" @change="changeType">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <cover-image :imagesLength="formData.cover.images" @receiveImgUrl="getSelectImgUrl"></cover-image>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id" placeholder="请选择">
          <el-option
            v-for="item in channelslist"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="publishArticle(false)" type="primary">发表</el-button>
        <el-button @click="publishArticle(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channelslist: [],
      formData: {
        channel_id: null,
        cover: {
          type: -1,
          images: []
        },
        content: '',
        title: ''
      },
      // 校验，以及正则校验
      rules: {
        title: [
          { required: true, message: '标题不能为空' },
          { min: 5, max: 30, message: '标题的长度应为5到30位' }
        ],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    // 获取从select->cover->传过来的url
    getSelectImgUrl (url, index) {
      // this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
      //   if (i === index) {
      //     return url
      //   } else {
      //     return item
      //   }
      // })
      // 以下写法是优化之后的写法
      this.formData.cover.images = this.formData.cover.images.map((item, i) =>
        i === index ? url : item
      )
    },
    // 更具点击的类型 修改数据image的长度
    changeType () {
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    // 获取从文章列表传过来的详细文章信息
    async getPublishById (articleId) {
      let result = await this.$http({
        url: `/articles/${articleId}`
      })
      this.formData = result.data
    },
    // 获取频道信息
    async getChannelMsg () {
      let result = await this.$http({
        url: '/channels'
      })
      this.channelslist = result.data.channels
    },
    // 发表文章
    publishArticle (draft) {
      this.$refs.form.validate(async isOk => {
        if (isOk) {
          let { articleId } = this.$route.params
          await this.$http({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'PUT' : 'POST',
            params: { draft }, // （true 为草稿）（false为发布）
            data: this.formData
          })
          this.$router.push('/home/articles')
        }
      })
    }
  },
  created () {
    this.getChannelMsg()
    // 获取文章id
    let { articleId } = this.$route.params
    articleId && this.getPublishById(articleId) // 如果有id执行后面的方法
  }
}
</script>

<style>
</style>
