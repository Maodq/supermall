<template>
  <div class="bottom-bar">
    <div class="check-content">
      <div class="check-left">
         <div class="check-button">
           <check-button @click.native="checkAll" :is-check-item="isCheckAll" />
         </div>
         <div class="check-text" v-if="!isCheckAll">全选</div>
        <div class="check-text" v-if="isCheckAll">取消全选</div>
      </div>
      <div class="check-right">
        <div class="check-right-left">
          <span>金额:￥</span>
          <span class="total-price">{{priceTotal}}</span>
        </div>
        <div class="check-right-right">
          <span>结算({{checkLength}})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  data() {
    return {
      num:0,
      check:false
    }
  },
  components: {
    CheckButton
  },
  methods:{
    checkAll() {
      if(this.isCheckAll){
        this.check = false
      }else {
        this.check = true
      }
      for (let item of this.$store.state.cartList){
        item.checked = this.check
      }
    }
  },
  computed: {
    priceTotal() {
      let price = 0
      for (let item of this.$store.state.cartList){
        // console.log(item);
        if(item.checked){
          price +=  item.price * item.count
        }
      }
      return price.toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isCheckAll() {
      if(this.$store.state.cartList.length > 0){
        for (let item of this.$store.state.cartList){
        if (!item.checked){
          return false
        }
      }
      return true
      }
      else{
        return false
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background: #f0f0f0;
    position: relative;
    /*padding-bottom: 3px;*/
    border-bottom: 2px solid #dcdcdc;
    /*bottom: 29px;*/
  }
  .check-content {
    display: flex;
    justify-content: space-between;
  }
  .check-left {
    display: flex;
    flex: 2;
  }
  .check-button {
    margin: 5px 5px 5px 2px;
  }
  .check-text {
    margin: 10px 5px 5px 10px;
    text-align: center;
    font-size: 14px;
  }
  .check-right-left{
    text-align: center;
    margin-right: 10px;
    margin-top: 10px;
    flex: 1;
    display: flex;
    font-size: 12px;
  }
  .check-right {
    display: flex;
    text-align: center;
    margin-right: 10px;
    margin-top: 10px;
    margin-left: 10px;
    flex: 3;
  }
  .total-price {
    color: red;
  }
  .check-right-right {
    width: 80px;
  }
  .check-right-right span {
    background: #ffb630;
    border-radius: 5px;
    padding:5px;
  }
</style>
