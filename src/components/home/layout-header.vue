<template>
  <el-row justify="space-between" type="flex" class="layout-header">
    <el-col :span="10">
      <i class="el-icon-star-on"></i>
      <span class="title-header" style="font-family:simhei;color:red">弘扬红色文化，打造精品旅游共享服务平台！</span>
    </el-col>
    <el-col :span="3" class="userinfo">
      <span>消息</span>
      <img :src="formData.photo? formData.photo : defaultImg" alt />
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{formData.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userinfo">个人信息</el-dropdown-item>
          <el-dropdown-item command="gitaddress">git地址</el-dropdown-item>
          <el-dropdown-item command="lgout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      formData: {},
      // 默认头像
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  created () {
    this.getUserMsg()
    // 这个位置是为了个人信息页面修改，随之这里跟着更新
    eventBus.$on('getUserInfo', () => {
      this.getUserMsg()
    })
  },
  methods: {
    getUserMsg () {
      this.$http({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    },
    handleCommand (key) {
      if (key === 'userinfo') {
      } else if (key === 'gitaddress') {
        window.location.href =
          'https://github.com/Aesthetlc/travel-headline-news.git'
      } else {
        this.$confirm('您将退出此系统?', '提示', {
          confirmButtonText: '确定退出',
          cancelButtonText: '我点错了',
          type: 'warning'
        }).then(() => {
          // 退出的时候需要将token清空
          window.localStorage.clear()
          // 点击退出之后，跳转到到login页面
          this.$router.push('/login')
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  line-height: 50px;
  .title-header,
  .el-icon-star-on {
    font-size: 20px;
  }
  .el-icon-star-on {
    margin-right: 4px;
    color: red;
  }
  .userinfo img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 4px;
    margin-left: 4px;
  }
}
</style>
