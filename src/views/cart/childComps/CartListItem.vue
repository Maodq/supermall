<template>
  <div class="cart-list-item" >
    <div class="cart-item" >
<!--      <div class="cart-left"  >-->
<!--        <img src="~assets/img/cart/tick.svg" @click="checkItem" alt="" :class="{active:ischeckItem}">-->
<!--      </div>-->
      <check-button :is-check-item="itemInfo.checked" @click.native="checkClick()"/>
      <div class="cart-right">
        <div class="cart-right-left">
          <img :src="itemInfo.image" alt="">
        </div>
        <div class="cart-right-top">
          <div class="item-title">{{itemInfo.title}}</div>
          <div class="item-desc">{{itemInfo.desc}}</div>
          <div class="cart-right-bottom">
            <span class="item-price">￥{{itemInfo.price}}</span>
            <span class="item-count">x {{itemInfo.count}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
  name: "CartListItem",
  components: {
    CheckButton
  },
  props:{
    itemInfo: {
        type:Object,
        default:true
    }
  },
  data() {
    return {
    }
  },
  computed:{
    // cartList() {
    //   return this.$store.state.cartList
    // }
  },
  methods: {
    checkClick() {
     this.itemInfo.checked = !this.itemInfo.checked
     //  item.checked = !item.checked
    }
  },

}
</script>

<style scoped>
.cart-item {
  display: flex;
  margin-top: 15px;
  width: 100vw;
  border-bottom: 1px solid grey;
  padding-bottom: 2px;
}
.cart-right {
  flex:8;
  display: flex;
  font-size: 14px;
}
.cart-right img {
  height: 80px;
  width: 60px;
  border-radius: 5px;
}
.cart-right-left {
  flex: 1;
}
.cart-right-top {
  flex: 4;
}
.item-title, .item-desc {
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
}
.item-title {
  font-size: 14px;
  margin: 5px 2px;
}
.item-desc {
  font-size: 10px;
  margin: 13px 8px;
}
.cart-right-bottom {
  display: flex;
  justify-content: space-between;
}
.item-price {
  color: red;
  margin-left: 10px;
}
.item-count {
  margin-right: 10px;
}
</style>
