<template>
<!--  给插槽设置属性的时候吗，最好在其最外层也加一个div进行嵌套，放置到时候替换插槽的时候属性丢失-->
  <div class="tab-ber-item" @click="itemClick">
    <div v-if="!isActive"><slot name="tab-icon"></slot></div>
    <div v-else><slot name="tab-icon-active"></slot></div>
<!--    :class="{active:isActive}"-->
    <div  :style="activeStyle"><slot name="tab-content"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBerItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }

  },
  data(){
    return {
     // isActive:false
    }
  },
  computed:{
    isActive() {
      //indexOf的作用是从this.$route.path路径字符串中查找是否包含
      //this.path路径字符串，当结果不为-1表示找到了子串，等于-1就没找到
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
     return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick() {
        this.$router.push(this.path).catch(err =>{})
    }
  },
}
</script>

<style scoped>
.tab-ber-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-ber-item img{
  height: 28px;
  margin-top: 3px;
  vertical-align: middle;
}
/*.active{*/
/*  color:red;*/
/*}*/
</style>
