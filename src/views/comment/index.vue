<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list" v-loading='loading'>
      <el-table-column prop="title" label="标题" width="400"></el-table-column>
      <el-table-column :formatter="formatter_comment" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button type="text">修改</el-button>
          <el-button
            type="text"
            @click="openOrClose(obj.row)"
          >{{obj.row.comment_status? '关闭评论' : '打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  name: 'comment',
  data () {
    return {
      loading: false,
      list: [],
      page: {
        currentPage: 1,
        per_page: 10,
        total: 0
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    openOrClose (row) {
      const mess = row.comment_status ? '关闭评论' : '打开评论'
      this.$confirm(`你确定要${mess}吗`).then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'PUT',
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getComment()
        })
      })
    },
    getComment () {
      this.loading = true
      this.$axios({
        url: '/articles',
        method: 'GET',
        params: {
          page: this.page.currentPage,
          per_page: this.page.per_page,
          response_type: 'comment'
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
      })
    },
    formatter_comment (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
