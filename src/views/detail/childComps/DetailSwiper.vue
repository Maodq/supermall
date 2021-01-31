<template>
  <div >
    <swiper class="detail-swiper">
      <swiper-item v-for="(item,index) in topImages" :key="index" class="swiper-item">
        <div class="detail-swiper">
          <img :src="item" alt="" >
        </div>

      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name: "DetailSwiper",
  props:{
    topImages:{
      type:Array,
      default () {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.detail-swiper{
  /*width: 100%;*/
  height: 300px;
}
.detail-swiper img {
  width: 100%;
  overflow: hidden;
}
</style>
