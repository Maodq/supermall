<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImageLode">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name: "HomeSwiper",
  props:{
    banners:{
      type:Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  components: {
    SwiperItem,Swiper
  },
  methods: {
    swiperImageLode() {
      this.$emit('swiperImageLode')
    }
  }
}
</script>

<style scoped>

</style>
