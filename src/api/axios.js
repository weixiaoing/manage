import axios from 'axios'
import { showMessage } from './status' // 引入状态码文件
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 设置接口超时时间
axios.defaults.timeout = 5000

axios.defaults.baseURL = '/api'

//http request 拦截器
axios.interceptors.request.use(
  (config) => {
    // 配置请求头
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8' // 传参方式json
    }
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
      config.headers.token = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

//http response 拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.data.code == 401) {
      ElMessage.error('登录过期，请重新登录')
      router.push('/login')
    }
    return response.data
  },
  (error) => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status) // 传入响应码，匹配响应码对应信息
      return Promise.reject(response.data)
    } else {
      ElMessage.error('请求超时!请检查网络或联系管理员')
    }
  }
)

// 封装 GET POST 请求并导出
export function request(url = '', params = {}, type = 'POST') {
  //设置 url params type 的默认值
  return new Promise((resolve, reject) => {
    let promise
    if (type.toUpperCase() === 'GET') {
      promise = axios({
        url,
        params
      })
    } else if (type.toUpperCase() === 'POST') {
      promise = axios({
        method: 'POST',
        url,
        data: params
      })
    } else {
      promise = axios({
        method: 'DELETE',
        url,
        data: params
      })
    }
    //处理返回
    promise
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
