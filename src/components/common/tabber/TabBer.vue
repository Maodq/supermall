<template>
  <div id="tab-ber">
    <slot></slot>
  </div>
</template>

<script>
import TabBerItem from "./TabBerItem";
export default {
  name: "TabBer",
  components:{
    TabBerItem
  }
}
</script>

<style scoped>
#tab-ber {
  display: flex;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: #f0f0f0;
}
</style>
