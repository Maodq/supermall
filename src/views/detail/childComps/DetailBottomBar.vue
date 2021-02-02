<template>
    <div class="bottom-bar">
      <div class="left-bar">
      <div class="service-bar">
        <i class="icon service"></i>
        <span>客服</span>
      </div>
      <div class="store-bar">
        <i class="icon store"></i>
        <span>店铺</span>
      </div>
      <div class="collect-bar" @click="isCollectGoods" >
        <i class="icon collect" :class="{active:isCollect}"></i>
        <span v-if="!isCollect">收藏</span>
        <span v-if="isCollect">已收藏</span>
      </div>
      </div>
      <div class="right-bar">
      <div class="cart-bar" @click="addToCart">
        <span>加入购物车</span>
      </div>
      <div class="buy-bar">
        <span>购买</span>
      </div>
      </div>
    </div>
</template>

<script>
export default {
name: "DetailBottomBar",
  data() {
  return {
    isCollect:false
  }
  },
  methods:{
    isCollectGoods() {
      this.isCollect = !this.isCollect
    },
    addToCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    background: #fefefe;
    /*position: relative;*/
    /*bottom: 49px;*/
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    /*text-align: center;*/
    justify-content: space-between;

  }
  .left-bar {
    flex: 1;
    display: flex;
    justify-content: space-around;
    margin-left: 2px;
    text-align: center;
  }
  .service-bar {
    flex:1;
  }
  .store-bar {
    flex:1;
  }
  .collect-bar {
    flex:1;
  }
  .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 8px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }
  .service {
    background-position:0 -52px;
  }
  .store {
    background-position:0 -98px;
  }
  .collect {
    background-position:0 0px;
  }
  .right-bar {
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    font-size: 15px;
  }
  .cart-bar {
    flex: 1;
    background: #ffe817;
    text-align: center;
    padding-top: 15px;
    color: black;
    text-align: center;

  }
  .buy-bar {
    flex: 1;
    background: #f69;
    padding-top: 15px;
    color: #e9e9e9;
    text-align: center;
  }
 .active {
    background-position:0 -28px;
  }


</style>
