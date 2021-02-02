<template>
<div class="cart">
  <nav-bar class="nav-bar">
    <div slot="center">购物车({{cartLength}})</div>
  </nav-bar>
<!--  <scroll class="content">-->
  <cart-list :cart-list="cartList"/>
  <cart-bottom-bar />
<!--  </scroll>-->
</div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";
// import Scroll from "@/components/common/scroll/Scroll";
export default {
  name: "Cart",
  components:{
    NavBar,
    CartList,
    CartBottomBar
    // Scroll
  },
  computed:{
    cartLength() {
      if (!this.$store.state.cartList){
        return 0
      }else{
        return this.$store.state.cartList.length
      }
    },
    cartList() {
      return this.$store.state.cartList
    }
  }
}
</script>

<style scoped>
  .cart {
    /*后面cartList组件中会用到这个height：100vh，，不能删掉*/
    height: 100vh;
  }
  .nav-bar {
    background: #ff5777;
    color: #e9e9e9;
  }
  /*.content {*/
  /*  height: calc(100% - 44px - 49px);*/
  /*  overflow: hidden;*/
  /*}*/
</style>
