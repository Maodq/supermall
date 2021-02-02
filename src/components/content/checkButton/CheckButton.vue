<template>
  <div class="check-button">
    <img src="~assets/img/cart/tick.svg"  alt="" :class="{active:isCheckItem}">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props:{
    isCheckItem:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      // ischeckItem:true
    }
  },
methods: {

}
}
</script>

<style scoped>
.check-button {
  flex:1;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 30px;
}
.check-button img{
  /*background: #ff5777;*/
  border: 1px solid lightgrey;
  border-radius: 10px;
}
.active {
  background: #ff5777;
}
</style>
