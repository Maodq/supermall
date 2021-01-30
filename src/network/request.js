import axios from 'axios'
// 最终最简单的方式
export function request (config) {
  // 1.创建axios的实例
  const instance1 = axios.create({
    baseURL: "http://123.207.32.32:8000",
    timeout: 5000
  })
  const instance2 = axios.create({
    baseURL: "http://152.136.185.210:7878/api/m5",
    timeout: 5000
  })


  // 过滤器(拦截器)
  instance1.interceptors.response.use(res => {
    return res.data
  })
  instance2.interceptors.response.use(res => {
    return res.data
  })
  // 2.发送真正的网络请求因为上面这个部分本身自己的返回值的就是promise，
  // 可以不需要自己包装，下面这种方式最简单
  return instance1(config),instance2(config)
}
