<template>
  <div class="login">
    <el-card class="login-card">
      <div class='login-img'>
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <el-form :model="myForm" :rules="rules" ref='form'>
        <el-form-item prop="mobile">
          <el-input v-model='myForm.mobile' placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model='myForm.code' style="width:60%;margin-right:5%;" placeholder="验证码"></el-input>
          <el-button>获取验证码</el-button>
        </el-form-item>
        <el-form-item prop="tip">
          <el-checkbox v-model="myForm.tip" label="我已阅读并同意用户协议和隐私条款" name="type"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style='width:100%' type="primary" @click='submitForm'>登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    const validator = function (rules, value, callback) {
      value ? callback() : callback(new Error('请仔细阅读以上协议'))
    }
    return {
      myForm: {
        mobile: '',
        code: '',
        tip: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '输入错误' }
        ],
        tip: [
          { validator }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$axios({
            url: 'authorizations',
            method: 'POST',
            data: this.myForm
          }).then(result => {
            window.localStorage.setItem('user-token', result.data.token)
            this.$router.push('/')
          })
          // .catch(() => {
          //   this.$message({
          //     type: 'warning',
          //     message: '手机号或密码错误'
          //   })
          // })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
  .login{
    background-image:url('../../assets/img/login_bg.jpg');
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content:center;
    align-items: center;
    .login-card{
      width: 400px;
      height: 340px;
      padding:0 15px;
      box-sizing:border-box;
      .login-img{
        text-align: center;
        margin: 10px 0 18px;
        img{
          width:160px;
        }
      }
    }
  }
</style>
