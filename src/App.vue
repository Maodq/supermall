<template>
  <div id="app">
    <!--    组件化开发就是一层一层的套娃-->
<!--    不加keep-alive会导致一直报找不到scroll的错误-->
    <keep-alive exclude="Detail">
    <router-view></router-view>
    </keep-alive>
    <main-tab-ber></main-tab-ber>
  </div>
</template>

<script>
import MainTabBer from "components/content/mainTabber/MainTabBer";

export default {
  name: 'App',
  components: {
    MainTabBer
  }
}
</script>

<style>
@import "assets/css/base.css" ;
</style>
