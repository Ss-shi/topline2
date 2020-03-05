<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-row type='flex' justify="end">
      <el-upload action="https://jsonplaceholder.typicode.com/posts/" :show-file-list='false'
      :http-request="uploadImg">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-row>
    <el-tabs v-model='activeName' type='card' @tab-click='changeTab' v-loading='loading'>
      <el-tab-pane label="全部" name='all' >
        <div class="img-list">
          <el-card class='img-card' v-for="item in materialList" :key='item.id'>
            <img  :src="item.url" alt="">
            <el-row class='operate' type='flex' align="middle" justify="space-around" >
                <i class='el-icon-star-on'></i>
                <i class='el-icon-delete-solid'></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏" name='collect'>
        <div class="img-list">
          <el-card class='img-card' v-for="item in materialList" :key='item.id'>
            <img :src="item.url" alt="">
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-pagination
    background
    @current-change="changePage"
    :page-size="page.per_page"
    :current-page="page.currentPage"
    :total="page.total"></el-pagination>
  </el-card>
</template>

<script>
export default {
  name: 'material',
  data () {
    return {
      activeName: 'all',
      materialList: [],
      page: {
        per_page: 8,
        currentPage: 1,
        total: 0
      },
      loading: false
    }
  },
  methods: {
    uploadImg (params) {
      this.loading = true
      const imgForm = new FormData()
      imgForm.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'POST',
        data: imgForm
      }).then(() => {
        this.getMaterialList()
        this.loading = false
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterialList()
    },
    changeTab () {
      this.page.currentPage = 1
      this.getMaterialList()
    },
    getMaterialList () {
      this.loading = true
      this.$axios({
        url: '/user/images',
        get: 'GET',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.per_page
        }
      }).then(res => {
        this.materialList = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
      })
    }
  },
  created () {
    this.getMaterialList()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-card {
    width: 200px;
    height: 230px;
    margin: 30px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      background-color: #f4f5f6;
    }
  }
}
</style>
