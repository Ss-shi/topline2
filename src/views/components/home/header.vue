<template>
  <div class="header">
    <div class="left">
      <i class="el-icon-s-fold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </div>
    <div class="right">
        <img :src="profile.photo ? profile.photo : defaultImg" alt="">
      <!-- <img src="@/assets/img/avatar.jpg" /> -->
      <el-dropdown trigger="click"  @command="handleCommand">
          <span>{{profile.name}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="profile">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">git地址</el-dropdown-item>
            <el-dropdown-item command="lgout">退出</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-header',
  data () {
    return {
      profile: {
        // name: '',
        // photo: ''
      },
      defaultImg: require('@/assets/img/avatar.jpg')
    }
  },
  methods: {
    getInfo () {
      this.$axios({
        url: '/user/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        }
      }).then(res => {
        this.profile = res.data.data
      })
    },
    handleCommand (command) {
      if (command === 'lgout') {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (command === 'git') {
        window.localStorage.herf = ''
      }
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

<style lang='less'>
.header {
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    background-color: #fff;
  .left {
    float: left;
    i{
        font-size: 22px;
        margin:0 10px;
    }
  }
  .right {
    float: right;
    margin-right: 20px;
    img{
        height: 40px;
        width: 40px;
        border-radius: 50%;
        vertical-align: middle;
        margin:0 10px;
    }
    .el-dropdown {
      cursor: pointer;
    //   color: #409eff;
    }
  }
}
</style>
