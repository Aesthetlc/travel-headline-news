<template>
  <!-- 面包屑 -->
  <el-card>
    <bread-crumb slot="header">
      <span slot="title" style="font-weight:700;color:black">发布文章</span>
    </bread-crumb>
    <el-form :model="formData" :rules="rules" ref="form" style="margin-left:100px" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input style="width:400px" v-model="formData.title" placeholder="文章名称"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor v-model="formData.content" style="height:400px"></quill-editor>
      </el-form-item>
      <el-form-item label="封页" style="margin-top:80px" prop="cover">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
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
      rules: {
        title: [
          { required: true, message: '标题不能为空' },
          { min: 5, max: 30, message: '标题的长度应为5到30位' }
        ],
        channel_id: [
          { required: true, message: '频道不能为空' }
        ]
      }
    }
  },
  methods: {
    // 获取从文章列表传过来的详细文章信息
    getPublishById (articleId) {
      this.$http({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
      })
    },
    // 获取频道信息
    getChannelMsg () {
      this.$http({
        url: '/channels'
      }).then(result => {
        this.channelslist = result.data.channels
      })
    },
    // 发表文章
    publishArticle (draft) {
      this.$refs.form.validate(isOk => {
        let { articleId } = this.$route.params
        this.$http({
          url: articleId ? `/articles/${articleId}` : '/articles',
          method: articleId ? 'PUT' : 'POST',
          params: { draft }, // （true 为草稿）（false为发布）
          data: this.formData
        }).then(result => {
          this.$router.push('/home/articles')
        })
      })
    }
  },
  created () {
    this.getChannelMsg()
    // 获取文章id
    let { articleId } = this.$route.params
    articleId && this.getPublishById(articleId)// 如果有id执行后面的方法
  }
}
</script>

<style>
</style>
