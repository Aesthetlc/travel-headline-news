<template>
  <el-card>
    <bread-crumb slot="header">
      <span slot="title">粉丝画像</span>
    </bread-crumb>
    <fans-fancpic></fans-fancpic>
    <div>粉丝画像</div>
  </el-card>
</template>

<script>
import fans from '../../components/fansnav/fansnav.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    'fans-fancpic': fans
  },
  created () {

  }
}
</script>

<style>
</style>
