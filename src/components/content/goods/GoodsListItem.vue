<template>
  <div class="goods-list-item" @click="goodsItemClick">
    <img :src="goodsItem.show.img" alt="" @load="itemImageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 监听图片加载
    itemImageLoad() {
      this.$bus.$emit('itemImageLoad')
    },
    // 商品跳转到详情页面,第二个/不要掉了
    goodsItemClick() {
      this.$router.push('./detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
.goods-list-item {
  position: relative;
  padding-bottom: 40px;
  width: 48%;
  /*当子元素使用绝对定位时，会寻找最近的使用相对定位的父元素，简称：子绝父相*/
}
.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
