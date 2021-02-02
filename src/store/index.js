import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "@/store/mutations";
import actions from "@/store/actions";
// 1.安装插件
Vue.use(Vuex)
const state = {
  cartList:[]
}
// 2.创建store对象
const  store = new Vuex.Store({
  state,
  actions,
  mutations
})

// 3.挂载Vue实例上
export default store

// 下面是有注释的原始代码

// import Vue from 'vue'
// import Vuex from 'vuex'
//
// // 1.安装插件
// Vue.use(Vuex)
//
// // 2.创建store对象
// const  store = new Vuex.Store({
//   state: {
//     cartList:[]
//   },
//   actions: {
//     addCart(context, payload){
//
//       let oldProdfuct = null;
//       oldProdfuct = context.state.cartList.find( (item) => item.iid === payload.iid)
//       // 2.判断oldproduct是否为空，为空表示没该商品，不为表示有该商品
//       if(oldProdfuct){
//         //oldProdfuct.count +=1
//         context.commit('addCounter',oldProdfuct)
//       }else {
//         payload.count = 1
//         context.commit('addToCart',payload)
//         //state.cartList.push(payload)
//       }
//     }
//   },
//   mutations: {
//     addCounter(state, payload) {
//       payload.count++
//     },
//     addToCart(state, payload) {
//       state.cartList.push(payload)
//     }
//
//     //mutations中，最好一个方法做一件事情
//     // addCart(state, payload){
//     //   //判断cartList是否已经添加进了该商品，如果添加了，直接数量加一，否则添加进去
//     //   // 方法一:先使用for循环进行遍历,但是代码不够优雅
//     //   let oldProdfuct = null;
//     //   // for(let item of state.cartList){
//     //   //   if(item.iid === payload.iid){
//     //   //     oldProdfuct = item
//     //   //   }
//     //   // }
//     //   // 方法二：使用数组的函数
//     //   // oldProdfuct = state.cartList.find(function (item) {
//     //   //   return item.iid === payload.iid
//     //   // })
//     //   //换成箭头函数,如果iid相同，则将返回值给oldProduct，不相等oldProduct还是为空
//     //   oldProdfuct = state.cartList.find( (item) => item.iid === payload.iid)
//     //
//     //     // 2.判断oldproduct是否为空，为空表示没该商品，不为表示有该商品
//     //   if(oldProdfuct){
//     //     oldProdfuct.count +=1
//     //   }else {
//     //     payload.count = 1
//     //     state.cartList.push(payload)
//     //   }
//     //   // state.cartList.push(payload)
//     // }
//   }
// })
//
// // 3.挂载Vue实例上
// export default store
