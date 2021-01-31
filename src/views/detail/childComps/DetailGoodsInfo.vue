<template>
  <div class="detail-goods-info">
    <div class="detail-desc">
     {{detailInfo.desc}}
    </div>
    <div class="detail-img" v-if="detailInfo.detailImage">
      <span>{{detailInfo.detailImage[0].key}}</span>
      <div class="goods-detail-img" v-for="item in detailInfo.detailImage[0].list">
      <img :src="item" alt="" @load="goodsInfoLoad">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo:{
      type:Object,
      default (){
        return {}
      }
    },
  },
  data () {
    return {
      goodsDesc:[],
    }
  },
  mounted(){
     //this.data = this.detailInfo.desc
    // let data = [];
    // data = (this.detailInfo.desc||'').split('\n');

    // this.goodsDesc = this.data.split("\n")
    // console.log("123",this.data);
  },
  methods:{
    goodsInfoLoad(){
      this.$emit('goodsInfoLoad')
    }
  }
}
</script>

<style scoped>
.goods-detail-img img{
  width: 100%;
}
</style>
