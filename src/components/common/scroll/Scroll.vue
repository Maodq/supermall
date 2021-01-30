<template>
  <div class="wrapper" ref="wrappercontent">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data (){
    return {
      // flag:false
    }
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrappercontent,{
      probeType:3,
      pullUpLoad: this.pullUpLoad,
      click:true
    })
    //2.监听滚动的位置
    this.scroll.on('scroll',(position) => {
      //console.log(position);

      // 不要在公共组件中进行任何业务处理

      // if(position.y <=-1000){
      //   this.flag = true
      // }
      // else {
      //   this.flag = false
      // }
      // this.$emit('contentScroll',this.flag)
      this.$emit('contentScroll',position)
    })
    //3.监听上拉事件
    this.scroll.on('pullingUp',() => {
      // console.log('上拉加载更多');
      // 向父组件home发送事件，让父组件加载下一页的商品信息
      this.$emit('loadNext')
      setTimeout(() => {
        this.scroll.finishPullUp()
      },1000)
    })
  },
  methods: {
    scrollTo(x,y,time=1000) {
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh() {
      this.scroll && this.scroll.refresh()
      // console.log("******");
    }
  }
}
</script>

<style scoped>

</style>
