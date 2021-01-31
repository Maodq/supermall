<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info" >
    <div class="info-title">
        {{goods.title}}
    </div>
    <div class="info-price">
      <span class="newPrice">{{goods.newPrice}}</span>
      <span class="oldPricce">{{goods.oldPrice}}</span>
      <span class="discunt" v-if="goods.discunt">{{goods.discunt}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services" >
      <span v-for="n in goods.services.length - 1" class="info-services-item">
      <img :src="goods.services[n].icon" alt="">
      <span>{{goods.services[n-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
.base-info {
  /*display: flex;*/
}
.info-title {
  color: #222;
  margin: 10px 4px 10px 4px;
  font-size: 17px;
}
.info-price {
  margin-bottom: 15px;
}
.newPrice {
  color:red;
  font-size: 20px;
  margin-right: 5px;
}
.oldPricce {
  text-decoration: line-through;
  font-size: 14px;
  color: #5c6b77;
  margin-right: 5px;
}
.discunt {
  border-radius: 8px;
  background: #ff5777;
  color: #e9e9e9;
  padding:2px 5px;
}
.info-other {
  display:flex;
  justify-content: space-between;
  color: #5c6b77;
  margin-top: 10px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 5px;
  font-size: 14px;
}
.info-services {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  border-bottom: 2px solid #f0f0f0;
}

.info-services-item img {
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}
info-services-item span {
  font-size: 13px;
  color: #333;

}
</style>
