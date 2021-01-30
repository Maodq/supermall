<template>
<!--<h2>主页</h2>-->
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>
    <tab-control class="tabControl" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" v-show="isFixTabcontrol"></tab-control>
<!--  <div class="wrapper" ref="wrappercontent">-->
<!--    <div class="content">-->
    <scroll class="content" ref="scroll" @contentScroll="contentScroll" :pull-up-load="true" @loadNext="loadNextPage">
    <home-swiper :banners="banners" @swiperImageLode.once="swiperImageLode"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
<!--    <div class="tab-control">-->
<!--      外层嵌套div后，tabcontrol的父元素就是这个div，因此offsettop的值就是0-->
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl" :class="{active:isFixTabcontrol}"></tab-control>
<!--    </div>-->
    <div>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </div>
    </scroll>
    <back-top @click.native="backClick" v-if="isShowBackTop" ></back-top>
    </div>

<!--  </div>-->
<!--  </div>-->

</template>

<script>
/*common*/
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";

/*content*/
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backtop/BackTop";

import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import {getHomeMultidata,getHomeGoods} from "@/network/home";
import {debunce} from "@/common/utils";
// import BScroll from "better-scroll";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return {
      banners : [],
      //下面的currentType一定要设置一个初始值（不能设置为空），不然会报错
      currentType: 'pop',
      recommends : [],
      goods: {
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      isShowBackTop: false,
      tabOffsetTop:0,
      isFixTabcontrol: false,
      saveY: 0

    }
  },
  created(){
    //1.请求多个数据
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    // //解决商品上拉时卡顿hub(不要在created里面写，因为有时候数据还没拿到，为空)
    // this.$bus.$on('itemImageLoad',() => {
    //   this.$refs.scroll.scroll.refresh()
    // })
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
  },
  mounted() {
    //解决商品上拉时卡顿hub
    // 为什么没对refresh进行封装就会报错？
    const refresh = debunce(this.$refs.scroll.refresh,100)
    this.$bus.$on('itemImageLoad',() => {
      // this.$refs.scroll.scroll.refresh()
      refresh()
    })

    // setTimeout(() => {
    //   console.log('zheshi',this.$refs.tabControl.$el.offsetTop);
    // },1000)

  },
methods: {
    /*
    * 事件监听相关的方法
    * */
  // 防抖动函数(抽取到了common的utils中了)
  // debunce(func,delay) {
  //   let timer = null
  //   return function (...args) {
  //     if(timer) clearTimeout(timer)
  //     timer = setTimeout(() => {
  //       func.apply(this,args)
  //     },delay)
  //   }
  // },
  tabClick(index) {
    switch (index){
      case 0:
        this.currentType = 'pop'
        break
      case 1:
        this.currentType = 'new'
        break
      case 2:
        this.currentType = 'sell'
        break
    }
    // 因为有两个tabcontrol控件，当两个重合时，有时候显示的两个控件不是同一个，因此，要将；两个都进行赋值
    this.$refs.tabControl.currentIndex = index
    this.$refs.tabControl1.currentIndex = index
    // console.log(index);

  },
  loadNextPage () {
    // console.log("加载代码");
    // 此处加载更多的代码上面已经对其封装好了，直接调用即可，因为没调用一次getHomeGoods方法，对应类型的商品的page就会加一操作。
    this.getHomeGoods(this.currentType)
    this.$refs.scroll && this.$refs.scroll.scroll.refresh()
  },
  //监听轮播图是否加载完成
  swiperImageLode () {
    this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    // console.log(this.tabOffsetTop);
  },
    /*
    * 网络请求相关的方法
    * */
  getHomeMultidata() {
    getHomeMultidata().then(res => {
      // console.log(res);
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  },
  getHomeGoods(type) {
    const page = this.goods[type].page + 1
    getHomeGoods(type,page).then(res => {
      // console.log(res);
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page += 1
    })
  },
  backClick() {
    //返回顶部
    //采用的是组件中的子传父采用ref，看起来不好看，可以将其抽取一下
    // this.$refs.scroll.scroll.scrollTo(0,0,1000)
    this.$refs.scroll.scrollTo(0,0)
  },
  contentScroll(position) {
    // console.log('flag');
    // 当滑动的位置超过1000时，将返回到顶部的按钮显示出来
    //1.返回到顶部
    Math.abs(position.y) > 1000 ? this.isShowBackTop = true : this.isShowBackTop = false
    // 2.判断是否需要tabControl吸顶
    Math.abs(position.y) > this.tabOffsetTop ? this.isFixTabcontrol = true : this.isFixTabcontrol = false
  }

},

  // mounted() {
  //   this.scroll = new BScroll(this.$refs.wrappercontent,{
  //     probeType:3,
  //     pullUpLoad: true,
  //     click:true
  //   })
  //   this.scroll.on('scroll',(position) => {
  //     // console.log(position);
  //   })
  //   this.scroll.on('pullingUp',() => {
  //     console.log('上拉加载更多');
  //     setTimeout(() => {
  //       this.scroll.finishPullUp()
  //     },2000)
  //   })
  // }
}
</script>

<style scoped>
#home {
  /*height: 1600px;*/

  height: 100vh;
  position: relative;
}
  .home-nav {
    background: #ff5777;
    /*position: fixed;*/
    /*left: 0px;*/
    /*right: 0px;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
/*.wrapper{*/
/*  height: 500px;*/
/*  !*background: pink;*!*/
/*  overflow: hidden;!*超出部分进行隐藏*!*/
/*  !*overflow-y:scroll;!*浏览器自带的滚动效果*!*!*/
/*}*/
.content{
  /*height: calc(100% - 49px);*/
  /*可以采用子绝父相
  在此处采用句对定位
  position：absolute
  top:44px
  bottom:49px
  left:0
  right:0
  */
  overflow: hidden;
  /*margin-top: 44px;*/
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;

}
 .tab-control {
     /*position: sticky;*/
     /*top: 44px;*/
     background: #fefefe;
     z-index: 1
   }
.tabControl{
  position: relative;
  background: #fefefe;
}
 /*.active{*/
 /*  position: fixed;*/
 /*  left: 0;*/
 /*  right: 0;*/
 /*  top: 44px;*/

 /*}*/
</style>
