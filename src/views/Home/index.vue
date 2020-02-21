<template>
  <el-container>
    <el-aside width="200px">
      <left-aside />
    </el-aside>
    <el-container>
      <el-header style='padding:0'>
        <home-header />
      </el-header>
      <el-main style='padding:0'>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import leftAside from '../components/home/left-aside'
import homeHeader from '../components/home/header'

export default {
  name: 'Home',
  components: {
    leftAside,
    homeHeader
  }
}
</script>

<style>
.el-container{
  background-color: #ccc;
}
</style>
