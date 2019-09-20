<template>
  <el-container>
    <el-aside style="width:200px">
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <el-header>
        <layout-header style="height:50px"></layout-header>
      </el-header>
      <el-main>
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
import layoutHeader from '../../components/home/layout-header'
export default {
  components: {
    'layout-aside': layoutAside,
    'layout-header': layoutHeader
  }
}
</script>

<style>

</style>
