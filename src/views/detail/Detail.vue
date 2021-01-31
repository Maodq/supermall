<template>
  <div class="items-detail">
    <detail-nav-bar class="detail-nav-bar">
    </detail-nav-bar>
<!--    使用scroll时必须要有固定的高度-->
    <scroll class="content" ref="scroll">
      <detail-swiper class="detail-swiper" :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shops="shops"></detail-shop-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <detail-goods-info :detailInfo="detailInfo" @goodsInfoLoad="goodsInfoLoad"></detail-goods-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
<!--      展示推荐数据的时候，不需要另外再写组件，可以直接使用home页面中写好的goodslist组件-->
      <div class="recommendList">
       <span>推荐列表</span>
      </div>
      <goods-list :goods="recommendsInfo"></goods-list>
    </scroll>
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
import {getDetail,getRecommend} from "@/network/detail";
import {Goods,Shop,GoodsParam} from '@/network/detail'


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
      recommendsInfo:[]
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
    GoodsList
  },
  methods:{
    goodsInfoLoad(){
      this.$refs.scroll && this.$refs.scroll.scroll.refresh()
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

    })
    //3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommendsInfo = res.data.list
      console.log(this.recommendsInfo);
    })
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
  bottom: 0px;
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
