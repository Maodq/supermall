<template>
<div class="detail-param-info">
  <table class="info-size" v-for="(table,index) in paramInfo.sizes" >
    <tr v-for="(tr,indey) in table">
      <td v-for="(td,indez) in tr">{{td}}</td>
    </tr>
  </table>
  <table class="info-param" >
    <tr v-for="(tr,indey) in paramInfo.info">
      <td class="info-key">{{tr.key}}</td>
      <td class="info-value">{{tr.value}}</td>
    </tr>
  </table>
</div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props:{
    paramInfo:{
      type:Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.detail-param-info{

  padding: 15px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}
.detail-param-info table {
  position: relative;
  width: 100%;
  font-size: 4px;
  border-collapse: collapse;
}
.detail-param-info table tr {
  height: 42px;
}

.detail-param-info table tr td {
  border-bottom: 1px solid rgba(100,100,100,.1);
}
.info-value {
  text-align: center;
}

</style>
