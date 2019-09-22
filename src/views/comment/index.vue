<template>
  <!-- 面包屑区域 -->
  <el-card  v-loading="loading">
    <!-- header 是card的插槽 -->
    <bread-crumb slot="header">
      <!-- title 是自己定义的全局面包屑的插槽 -->
      <span slot="title" style="font-weight:700;color:black">评论列表</span>
    </bread-crumb>

    <!-- 表格区域 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="title" label="标题" width="500"></el-table-column>
      <el-table-column :formatter="changeStatus" align="center" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column align="center" prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column align="center" prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column align="center" prop label="操作">
        <!-- 作用域插槽 -->
        <!-- 自定义列模板 -->
        <!-- 通过 Scoped slot 可以获取到
        //row, column, $index , store的数据，-->
        <template slot-scope="obj">
          <el-button type="text" size="small">修改</el-button>
          <el-button
            :style="{color:obj.row.comment_status?'#409EFF':'#F56C6C'}"
            @click="changeComment(obj.row)"
            type="text"
            size="small"
          >
            {{
            obj.row.comment_status ? "关闭评论":"打开评论"
            }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格区域 -->
    <!-- 分页显示 -->
    <el-row type="flex" justify="center" style="margin:20px 0">
        <el-pagination
          @size-change="changeNum"
          @current-change="changeNum"
          :page-size="pages.per_page"
          layout="prev, pager, next, jumper"
          :total="pages.total_count"
        ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      pages: {
        per_page: 10, // 每页数量
        page: 1, // 当前页数
        total_count: 0 // 总条数
      },
      loading: false // 是否显示加载
    }
  },
  methods: {
    handleSizeChange (newPage) {
      this.pages.page = newPage
      this.getComment()
    },
    changeNum (newPage) {
      this.pages.page = newPage
      this.getComment()
    },
    // 获取评论数据
    getComment () {
      this.loading = true
      this.$http({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.pages.page,
          per_page: this.pages.per_page
        }
      }).then(result => {
        this.tableData = result.data.results
        this.pages.total_count = result.data.total_count // 总数
        this.loading = false
      })
    },
    // 这个位置是为了将返回的boolean值的评论状态改为打开或者关闭
    // row为行数据
    // column为列数据
    // 当前单元格的值
    // index下标，索引
    changeStatus (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    // 修改文章评论状态
    changeComment (row) {
      let status = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${status}么?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(reult => {
        this.$http({
          url: '/comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(result => {
          this.$message({ message: `成功${status}评论`, type: 'success' })
          this.getComment()
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
