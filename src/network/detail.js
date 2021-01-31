import {request} from './request'
//得到商品的详细信息
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
//得到商品的推荐信息
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}
// 将需要的商品信息封装到类中，需要时直接调用即可
export class Goods{
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discunt = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}
// 将需要的商家信息封装到类中，需要时直接调用即可
export class Shop{
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}
// 将商品的尺码信息进行抽取封装
export class GoodsParam {
  constructor(info,rule) {
    //注意：images可能没有值（某些商品有值，某些商品没有值）
    this.image = info.images ? info.images[0] : '';
    this.info = info.set
    this.sizes = rule.tables
  }
}
