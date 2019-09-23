<template>
  <el-container>
    <el-aside style="width:200px;overflow:hidden;background-color:#323745">
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header style="height:50px"></layout-header>
      </el-header>
      <el-main style="background-color:rgb(242,243,245)">
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style>
</style>
