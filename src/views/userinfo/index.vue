<template>
  <!-- 个人信息面包屑 -->
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <span slot="title">个人信息</span>
    </bread-crumb>
    <!-- prop表单域 model 字段 -->
    <el-form
      :model="formData"
      ref="form"
      :rules="rules"
      style="margin-left:700px;"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="name">
        <el-input style="width:400px" v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input style="width:400px" v-model="formData.intro"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input style="width:400px" v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input disabled style="width:400px" v-model="formData.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="editUserInfo()" style="width:400px" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
    <el-upload action="" :show-file-list="false" :http-request="uploadImg">
      <div class="userPhoto">
        <img :src="formData.photo?formData.photo: defaultImg" alt />
        <span>更换头像</span>
      </div>
    </el-upload>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
import { getUserInfo, editUserInfo, uploadImg } from '../../api/userinfo'
export default {
  data () {
    return {
      loading: false, // 实现加载效果
      formData: {},
      defaultImg: require('../../assets/img/avatar.jpg'), // 默认头像
      // 验证信息 以及正则验证
      rules: {
        name: [
          { required: 'true', message: '用户名不能为空' },
          { min: 2, max: 7, message: '用户名的长度应为2到7位' }
        ],
        email: [
          { required: 'true', message: '邮箱不能为空' },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '邮箱格式不正确'
          }
        ]
      }
    }
  },
  methods: {
    // 上传用户头像
    async uploadImg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      let result = await uploadImg(data)
      eventBus.$emit('getUserInfo')
      this.$message({ message: '头像上传成功', type: 'success' })
      this.formData.photo = result.data.photo
    },
    // 获取用户信息
    async getUserInfo () {
      this.loading = true
      let result = await getUserInfo()
      this.formData = result.data
      this.loading = false
    },
    // 编辑用户信息
    editUserInfo () {
      this.$refs.form.validate(async isOk => {
        if (isOk) {
          await editUserInfo(this.formData)
          eventBus.$emit('getUserInfo')
          this.$message({ message: '更新成功', type: 'success' })
        }
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.userPhoto {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 150px;
  left: 450px;
  width: 250px;
  height: 250px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    margin-bottom: 20px;
  }
  span {
    color: #409eff;
  }
}
</style>
