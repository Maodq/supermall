import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Profile = () => import('views/profile/Profile')
const Cart = () => import('views/cart/Cart')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home'
  },{
    path:'/home',
    component:Home
  },{
    path:'/category',
    component:Category
  },{
    path:'/cart',
    component:Cart
  },{
    path:'/profile',
    component:Profile
  },{
    // 采用动态路由的方式，跳转到详情页面时，传递商品的id，也可以采用query
    path:'/detail/:iid',
    component:Detail
  }
]
export default new VueRouter({
  mode: 'history',
  routes
})
