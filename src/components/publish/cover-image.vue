<template>
  <div class="cover-image">
    <div class="cover-item" v-for="(item,index) in imagesLength" :key="index">
      <img @click="openDialog(index)" :src="item?item:defaultImg" alt />
    </div>
    <el-dialog :visible="dialogVisible" @close="dialogVisible=false">
        <select-image @getImgUrl="receiveImgUrl"></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['imagesLength'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false, // 弹层默认不显示,
      imgIndex: -1
    }
  },
  methods: {
    // 打开弹层
    openDialog (index) {
      this.dialogVisible = true
      this.imgIndex = index
    },
    // 收到子级返回来的url
    receiveImgUrl (url) {
      this.$emit('receiveImgUrl', url, this.imgIndex)
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.cover-image {
    display: flex;
    justify-content:flex-start;
    .cover-item{
        height: 300px;
        width: 300px;
        border: 1px solid #ccc;
        margin-left: 10px;
        img {
            height: 100%;
            width: 100%;
        }
    }
}
</style>
