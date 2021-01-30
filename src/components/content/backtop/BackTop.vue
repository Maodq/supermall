<template>
  <div class="back-top" >
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: "BackTop",
  data () {
    return {

    }
  }
}
</script>

<style scoped>
  .back-top {
    position: fixed;/*固定定位*/
    right: -35px;
    bottom: 49px;
  }
  .back-top img {
    width: 50%;
  }
</style>
