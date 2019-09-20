<template>
  <div class="login-index">
    <div class="masking">
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
          <el-form-item prop="mobile" class="temp">
            <el-input class="a" v-model="formData.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="formData.code" style="width:70%" placeholder="请输入验证码"></el-input>
            <el-button style="float:right;width:28%">发送验证码</el-button>
          </el-form-item>
          <el-form-item prop="agree">
            <el-checkbox v-model="formData.agree"></el-checkbox>
            <span>&nbsp;&nbsp;我已阅读并同意</span>
            <a>用户协议</a>
            <span>和</span>
            <a>隐私条款</a>
          </el-form-item>
          <el-form-item>
            <el-button @click="loginForm()" type="primary" style="width:100%">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <!--
      autoplay 自动播放
      loop 循环播放
      muted 静音
    -->
    <video autoplay loop muted>
      <source src="../../assets/video/beach.mp4" type="video/mp4" />浏览器不支持 video 标签，建议升级浏览器。
    </video>
    <!--
       preload="load" //页面加载完之后播放
       autoplay //自动播放
       loop   //循环播放
       controls  //显示控制音乐控件
    -->
    <audio preload="load" autoplay loop src="http://music.163.com/song/media/outer/url?id=476987525.mp3">你的浏览器不支持audio标签</audio>
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
          })
            .then(res => {
              window.localStorage.setItem('user-token', res.data.token)
              this.$router.push('/home')
            })
        }
      })
    }
  }
}
</script>

<style>
.el-form-item__error {
  font-size: 14px !important;
  color: yellow !important;
}
</style>
<style lang='less' scoped>
.login-index {
  // background: url('../../assets/img/login_bg.jpg');
  /* 相当于高度100% */
  /* 自适应高度 */
  // background-size: cover;
  position: relative;
  z-index: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  .masking {
    position: absolute;
    z-index: 1;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    .box-card {
      position: absolute;
      background-color: rgba(255, 255, 255, 0.2);
      width: 576px;
      height: 358px;
      z-index: 2;
      .title {
        text-align: center;
        img {
          height: 70px;
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
}
</style>
