<template>
  <nav-bar class="home-nav">
    <div slot="left" class="navLeft" @click="backHomeClick">
      <img src="~assets/img/common/back.svg" alt="" >
    </div>
    <div slot="center" class="title">
      <div class="titleItem" v-for="(item,index) in content" @click="titleItemClick(index)" :class="{active:currentTitleIndex === index}">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      iid: null,
      content: ['商品','参数','评论','推荐'],
      currentTitleIndex: 0
    }
  },
  components:{
    NavBar
  },
methods:{
  backHomeClick() {
    // this.$router.go(-1)
    this.$router.back()
  },
  titleItemClick(index) {
    this.currentTitleIndex = index
  }

},
}
</script>

<style scoped>
.home-nav {
  border-bottom: 2px solid #eeeeee;
}
.title {
  display: flex;
}
.titleItem {
  flex: 1;
  color: black;
}
.navLeft img {
  width: 40%;
  margin-top: 10px;
  margin-left: -10px;
}
.active {
  color: red;
}
</style>
