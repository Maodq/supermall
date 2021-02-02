export default {
  addCart(context, payload){
    return new Promise((resolve,reject) => {
      let oldProdfuct = null;
      oldProdfuct = context.state.cartList.find( (item) => item.iid === payload.iid)
      // 2.判断oldproduct是否为空，为空表示没该商品，不为表示有该商品
      if(oldProdfuct){
        //oldProdfuct.count +=1
        context.commit('addCounter',oldProdfuct)
        resolve('商品数量加一')
      }else {
        payload.count = 1
        context.commit('addToCart',payload)
        resolve("添加购物车成功！")
        //state.cartList.push(payload)
      }
    })

  }
}
