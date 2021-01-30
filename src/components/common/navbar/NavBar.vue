<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
  .nav-bar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
}
  .left,.right {
    width: 60px;
    /*background: #5ea732;*/
  }
  .nav-bar .center {
    flex: 1;
    color: #e9e9e9;
    /*background: red;*/
  }
</style>
