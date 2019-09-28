<template>
  <el-menu :default-active="$route.path" router active-text-color="blue" mode="horizontal">
    <el-menu-item index="/home/general">粉丝概况</el-menu-item>
    <el-menu-item index="/home/fancpic">粉丝画像</el-menu-item>
    <el-menu-item index="/home/account">粉丝列表</el-menu-item>
  </el-menu>
</template>

<script>
export default {

}
</script>
