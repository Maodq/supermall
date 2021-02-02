import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'
import toast from '@/components/common/toast'

//import VueAwesomeSwiper from 'vue-awesome-swiper'
//import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
//import 'swiper/swiper-bundle.css'

//Vue.use(VueAwesomeSwiper)


Vue.config.productionTip = false
//原型(讲Vue实例作为事件总线)
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)
//createApp(App).mount('#app')

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

