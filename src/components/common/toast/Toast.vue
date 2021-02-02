<template>
  <div class="toast" v-if="isShow">
    <span >{{message}}</span>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow:false,
      message:''
    }
  },
  methods: {
    show(message,duration = 2000) {
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      },duration)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, -50%);
  background: #5c6b77;
  color: white;
  z-index: 999;
  padding: 10px;
  border-radius: 5px;
}
</style>
