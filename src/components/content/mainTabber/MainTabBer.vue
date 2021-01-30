<template>
  <tab-ber>
    <tab-ber-item path="/home" >
<!--      此处是在build文件下的webpack-base。comfig文件中使用了别名-->
      <img slot="tab-icon" src="~assets/img/tabber/home.svg" alt="">
      <img slot="tab-icon-active" src="~assets/img/tabber/home_active.svg" alt="">
      <div slot="tab-content">首页</div>
    </tab-ber-item>

    <tab-ber-item path="/category">
      <img slot="tab-icon" src="~assets/img/tabber/category.svg" alt="">
      <img slot="tab-icon-active" src="~assets/img/tabber/category_active.svg" alt="">
      <div slot="tab-content">分类</div>
    </tab-ber-item>

    <tab-ber-item path="cart">
      <img slot="tab-icon" src="~assets/img/tabber/shopcart.svg" alt="">
      <img slot="tab-icon-active" src="~assets/img/tabber/shopcart_active.svg" alt="">
      <div slot="tab-content">购物车</div>
    </tab-ber-item>

    <tab-ber-item path="profile">
      <img slot="tab-icon" src="~assets/img/tabber/profile.svg" alt="">
      <img slot="tab-icon-active" src="~assets/img/tabber/profile_active.svg" alt="">
      <div slot="tab-content">我的</div>
    </tab-ber-item>
  </tab-ber>
</template>

<script>
import TabBer from "components/common/tabber/TabBer";
import TabBerItem from "components/common/tabber/TabBerItem";

export default {
  name: "MainTabBer",
  components:{
    TabBer,
    TabBerItem
  }
}
</script>

<style scoped>

</style>
