<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form>
      <el-form-item label="文章状态：">
       <el-radio-group v-model="formData.status">
            <!-- 全部这个5是默认的,在传参的时候判断一下 是不是5 如果是5 就传个null-->
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表：">
        <el-select  placeholder="请选择" value  v-model='formData.channel_id'>
          <el-option v-for='item in channels' :key='item.id' :label="item.name" :value='item.id'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择：">
        <el-date-picker
          v-model="formData.dateChoose"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
     <el-row class='total'>
        <span>共找到{{page.total}}条符合条件的内容</span>
    </el-row>
    <!-- 循环的模板 -->
    <el-row  v-for="(item,index) in list" :key="index" class='article-item' type='flex' justify="space-between">
        <!-- 左侧 -->
       <el-col :span="14">
           <el-row type='flex'>
              <img :src="item.cover.images.length?item.cover.images[0]:defaultsImg" alt="">
              <div class='info'>
                <span>{{item.title}}</span>
                <el-tag class='tag'>{{item.status}}</el-tag>
                <span class='date'>{{item.pubdate}}</span>
              </div>
           </el-row>
       </el-col>
       <!-- 右侧 -->
       <el-col :span="6">
           <el-row class='right' type='flex' justify="end">
               <span><i class="el-icon-edit"></i>修改</span>
               <span><i class="el-icon-delete"></i> 删除</span>
           </el-row>
       </el-col>
    </el-row>
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
  name: 'Content',
  data () {
    return {
      formData: {
        status: 1,
        channel_id: null,
        dateChoose: ''
      },
      channels: [],
      list: [],
      defaultsImg: require('../../assets/img/admire.png'),
      page: {
        currentPage: 1,
        per_page: 10,
        total: 0
      }
    }
  },
  methods: {
    changeCondition () {
      this.page.currentPage = 1
      this.getContentCondtions()
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getContentCondtions()
    },
    getContentCondtions () {
      const params = {
        page: this.page.currentPage,
        per_page: this.page.per_page,
        status: this.formData.status,
        channel_id: this.formData.channel_id,
        begin_pubdate: this.formData.dateChoose[0],
        end_pubdate: this.formData.dateChoose[1]
      }
      this.getContentList(params)
    },
    getContentList (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    getChannels () {
      this.$axios({
        url: '/channels',
        method: 'GET'
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannels()
    this.getContentList({ page: 1, per_page: 10 })
  }
}
</script>

<style  lang='less' scoped>
    /deep/ .el-card__body{
      margin-top: 30px;
      margin-left:30px;
      // margin-bottom:50px;
    }
     .total {
      margin-top:60px;
      height: 30px;
      border-bottom: 1px dashed #ccc;
  }
  .article-item {
      // margin: 20px 0;
      padding: 20px 0;
      border-bottom: 1px solid #f2f3f5;
      img {
          width: 180px;
          height: 100px;
          margin-right: 10px;
          border-radius: 4px;
      }
      .info {
          height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .tag {
              max-width:60px;
          }
          .date {
              color: #999;
              font-size:12px;
          }
      }
      .right {
          span {
              margin-left:8px;
              font-size: 14px;
              cursor: pointer;
          }
      }
  }
</style>
