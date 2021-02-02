<template>
  <div class="items-detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick"  ref="detailNavBar">
    </detail-nav-bar>
<!--    使用scroll时必须要有固定的高度-->
    <scroll class="content" ref="scroll" @contentScroll="contentScroll">
      <detail-swiper class="detail-swiper" :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shops="shops"></detail-shop-info>
      <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
      <detail-goods-info  :detailInfo="detailInfo" @goodsInfoLoad="goodsInfoLoad"></detail-goods-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
<!--      展示推荐数据的时候，不需要另外再写组件，可以直接使用home页面中写好的goodslist组件-->
      <div class="recommendList">
       <span>推荐列表</span>
      </div>
      <goods-list ref="recommend" :goods="recommendsInfo"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-if="isShowBackTop" ></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
import BackTop from "@/components/content/backtop/BackTop";
import {getDetail,getRecommend} from "@/network/detail";
import {Goods,Shop,GoodsParam} from '@/network/detail'
import {debunce} from "@/common/utils";


export default {
name: "Detail",
  data() {
    return {
      topImages:[],
      goods:{},
      shops:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommendsInfo:[],
     itemImgListener:null,
      themTopYs:[],
      getThemTopY:null,
      isShowBackTop:false
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
  methods:{
  //商品详情中的图片信息加载
    goodsInfoLoad(){
      this.$refs.scroll && this.$refs.scroll.scroll.refresh()
      this.getThemTopY()
    },
    //标题点击，切换
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scroll.scrollTo(0,-this.themTopYs[index],100)
      this.$refs.scroll && this.$refs.scroll.scroll.refresh()
    },
    //获取当前界面滚动到的位置
    contentScroll(position){
      // 当滑动的位置超过1500时，将返回到顶部的按钮显示出来
      //是否显示回到顶部图标
      if(Math.abs(position.y) >= 1500) {
        this.isShowBackTop = true
        // console.log(this.isShowBackTop);
      }else{
        this.isShowBackTop = false
      }
      //1.返回到顶部
      // Math.abs(position.y) > 1000 ? this.isShowBackTop = true : this.isShowBackTop = false
      // console.log(position);
      if(Math.abs(position.y) >= this.$refs.recommend.$el.offsetTop)
      {
        // console.log('到达推荐');
        this.$refs.detailNavBar.currentTitleIndex = 3
      }else if (Math.abs(position.y) >= this.$refs.comment.$el.offsetTop){
        // console.log('到达评论');
        this.$refs.detailNavBar.currentTitleIndex = 2
      } else if (Math.abs(position.y) >= this.$refs.params.$el.offsetTop){
        // console.log('到达参数');
        this.$refs.detailNavBar.currentTitleIndex = 1
      }else {
        this.$refs.detailNavBar.currentTitleIndex = 0
      }
    },
    //返回到顶部按钮
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    //加入购物车
    addToCart() {
      //获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 2.将商品添加到购物车
      this.$store.dispatch('addCart',product).then(res => {
        this.$toast.show(res)
      })


    }

  },
  created() {
  //  1.保存传入的iid
    this.iid = this.$route.params.iid
    //2.创建后发送网络请求(根据iid请求详情数据)
    getDetail(this.iid).then(res => {
      const data = res.result
      //1.获取顶部的轮播图数据
       this.topImages = data.itemInfo.topImages
      // console.log('商品详细信息',res);
       //2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // console.log(this.goods);
      //3.获取商家信息
       this.shops = new Shop(data.shopInfo)
      // console.log(this.shops);
      //4.获取商品的详细信息
      this.detailInfo = data.detailInfo
      // console.log(this.detailInfo);
      // 获取商品的尺码信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      // console.log(this.paramInfo);
      //获取商品的用户评论信息(因为有的商品没有用户评论，因此需要先进行判断)
      if(data.rate.list !=0){
        this.commentInfo = data.rate.list[0]
        // console.log(this.commentInfo);
      }
      // 也不能保证图片完全加载成功
      // this.$nextTick(() => {
      //   this.themTopYs.push(0)
      //   this.themTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themTopYs);
      // })

    })
    //3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommendsInfo = res.data.list
      // console.log(this.recommendsInfo);
    })
    // 对图片信息进行防抖操作，再在上面方法goodsInfoLoad()进行调用
    this.getThemTopY = debunce(() => {
      this.themTopYs = []
      this.themTopYs.push(0)
      this.themTopYs.push(this.$refs.params.$el.offsetTop)
      this.themTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themTopYs);
    },100)
  },
  // 当从详情页退出时，不需要再监听图片是否加载成功了(因为Detail从keep-alive中排除了)
  destroyed() {
    // this.$bus.$off('itemImgLoad',this.itemImgListener)
    // console.log("abd");
  },
  mounted() {
    // this.itemImgListener = () => {
    //   this.$refs.scroll.refresh()
    //   //refresh()
    // }
    //解决商品上拉时卡顿bug
    // 为什么没对refresh进行封装就会报错？

    // const refresh = debunce(this.$refs.scroll.refresh,100)
    // 对监听的函数进行保存
    this.itemImgListener = () => {
      // this.$refs.scroll.scroll.refresh()
      // refresh()
      // 也可以不用防抖函数，但是必须要加this.$refs.scroll &&进行判断
      this.$refs.scroll && this.$refs.scroll.scroll.refresh()
      // console.log("****");
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)

    // 对监听的函数进行保存

    // this.$bus.$on('itemImageLoad',this.itemImgListener)
    // this.themTopYs.push(0)
    //
    //
    //
    // this.themTopYs.push(this.$refs.params.$el.offsetTop)
    // this.themTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themTopYs.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.themTopYs);

  }
}
</script>

<style scoped>
.items-detail {
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.detail-nav-bar {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  background: #fefefe;
  z-index: 9;
}
.detail-swiper {
  margin-top: 44px;
}
.recommendList {
  /*align-content: center;*/
  /*margin-top: 20px;*/
  /*margin-bottom: 20px;*/
  /*height: 50px;*/
  /*border-bottom: 1px solid #e0e0e0;*/
  /*border-top: 1px solid #e0e0e0;*/
  /*padding-top: 10px;*/
  display: flex;
  height: 50px;
  justify-content: space-between;
  padding: 15px 15px;
  border-bottom: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  margin-bottom: 10px;
  margin-top: 20px;
}

</style>
