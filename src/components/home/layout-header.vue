<template>
  <el-row class="layout-header">
    <el-col :span="22">
      <i class="el-icon-document"></i>
      <span class="title-header">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="2" class="userinfo">
      <img src="../../assets/img/avatar.jpg" alt />
      <span>一个小草莓</span>
    </el-col>
  </el-row>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  .title-header,.el-icon-document {
    font-size: 20px;
  }
  .el-icon-document{
    margin-right: 4px;
  }
  .userinfo img{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 4px;
  }
}
</style>
