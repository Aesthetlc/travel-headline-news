<template>
  <div class="login-index">
    <el-card class="box-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 表单验证：
        1.只需要通过 rules 属性传入约定的验证规则，
        2.将 Form-Item 的 prop 属性设置为需校验的字段名即可。
      -->
      <!--
          :model ===>表单数据对象
          :rules===>验证规则
      -->
      <el-form class="content" :model="formData" :rules="loginrules" ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="formData.code" style="width:70%" placeholder="请输入验证码"></el-input>
          <el-button style="float:right;width:28%">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="formData.agree">
            我已阅读并同意
            <a>用户协议</a>和
            <a>隐私条款</a>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="loginForm()" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callback) {
    //   if (value) {
    //     callback()
    //   } else {
    //     callback(new Error('请勾选相关条款'))
    //   }
      value ? callback() : callback(new Error('请勾选相关条款'))
    }
    return {
      formData: {
        mobile: '',
        code: '',
        agree: false
      },
      loginrules: {
        mobile: [
          // 1.required 为true 表示不能为空，为必填项
          // 2.required 只校验null，undefined 空字符串，不会校验true/false
          { required: true, message: '❀小马提醒您：请输入手机号' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '❀小马提醒您：请输入合法的手机号'
          }
        ],
        code: [
          { required: true, message: '❀小马提醒您：请输入验证码' },
          {
            pattern: /^\d{6}$/,
            message: '❀小马提醒您：请输入2至6位的纯数字验证码'
          }
        ],
        // 这里是否勾选 以上的判断规则已经无法判断，现在引入新的方式
        // validator 是一个函数, 其中有三个参数
        // rule (当前规则), value (当前值), callback(回调函数)
        agree: [{ validator }]
      }
    }
  },
  methods: {
    loginForm () {
      // validate是一个方法
      // 方法中传入的一个函数
      // 两个校验参数  是否校验成功/未校验成功的字段
      this.$refs.loginForm.validate(isOk => {
        if (isOk) {
          this.$http({
            url: '/authorizations',
            method: 'post',
            data: this.formData
          }).then(res => {
            console.log(res)
            window.localStorage.setItem('user-token', res.data.data.token)
            this.$router.push('/home')
          }).catch(() => {
            this.$message({
              message: '您的手机号或者验证码有误哦',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-index {
  background: url("../../assets/img/login_bg.jpg");
  /* 相当于高度100% */
  height: 100vh;
  /* 自适应高度 */
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 576px;
    height: 358px;
    .title {
      text-align: center;
      img {
        height: 50px;
      }
    }
    .content {
      margin: 20px 20px;
      a {
        color: rgb(50, 150, 250);
      }
    }
  }
}
</style>
