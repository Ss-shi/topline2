<template>
  <div class="leftAside">
    <div class="img">
      <img src="@/assets/img/logo_admin.png" alt />
    </div>
    <el-menu
      router
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#353b4e"
      text-color=" #adafb5"
      active-text-color="#ffd04b"
    >
      <el-menu-item>
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/content">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="/home/picture">图文数据</el-menu-item>
        <el-menu-item index="/home/info">粉丝概况</el-menu-item>
        <el-menu-item index="/home/photo">粉丝画像</el-menu-item>
        <el-menu-item index="/home/list">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item>
        <i class="el-icon-setting"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'left-aside'
}
</script>

<style lang='less' scoped>
.leftAside {
  height: 100vh;
  background-color: #323745;
  .el-menu {
    border-right: none;
  }
  .img {
    text-align: center;
    background-color: #2e2f32;
    padding: 10px 0;
    img {
      height: 35px;
    }
  }
}
</style>
