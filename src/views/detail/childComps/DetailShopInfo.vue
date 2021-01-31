<template xmlns="http://www.w3.org/1999/html">
  <div class="base-info" v-if="Object.keys(shops).length !== 0">
    <div class="shop-name">
      <img :src="shops.logo" alt="">
      <span>{{shops.name}}</span>
    </div>
    <div class="sell-info">
      <div class="left">
      <div class="sellCount">
        <div class="sell">{{shops.sells}}</div>
        <div>总销量</div>
      </div>
      <div class="goodsCount">
        <div class="counts">{{shops.goodsCount}}</div>
        <div>全部宝贝</div>
      </div>
      </div>
      <div class="right">
        <table>
        <tr v-for="n in shops.score.length">
          <td class="shops-content">{{shops.score[n-1].name}}</td>
          <td class="shops-score":class="{'active-score':shops.score[n-1].isBetter}">{{shops.score[n-1].score}}</td>
          <td class="shops-hight" :class="{'active-height':shops.score[n-1].isBetter}">{{shops.score[n-1].isBetter ? '高':'低'}}</td>
        </tr>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props:{
    shops:{
      type:Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.base-info{
  height: 180px;
}
.shop-name {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
}
.shop-name img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-left: 5px;
}
.shop-name span {
  margin-left: 18px;
  text-align: center;
  margin-top: 13px;
}
.sell-info {
  display: flex;
  margin-top: 25px;

}
.sell-info .left{
  display: flex;
  flex: 1;
  margin-top: 8px;
  /*padding-left: 10px;*/
  /*padding-right: 10px;*/
  justify-content: space-around;
}
.sell-info .right{
  flex: 1;
}
.sellCount {
  /*margin-left: 20px;*/
  /*margin-right: 20px;*/
  font-size: 14px;
  padding-left: 15px;
}
.sellCount .sell{
  margin-bottom: 10px;
  text-align: center;
}
.goodsCount{
  border-right: 1px solid #5c6b77;
  font-size: 14px;
  padding-right: 10px;
}
.goodsCount .counts {
  margin-bottom: 10px;
  text-align: center;
}
.shops-content {
  /*padding-left: 10px;*/
}
.shops-score {
  padding-left: 10px;
  padding-right: 10px;
  color: #5ea732;
}
.shops-hight {
  border-radius: 2px;
  background: #5ea732;
  color: #e9e9e9;
}
.active-score {
  color: red;
}
.active-height {
  background: red;
}
</style>
