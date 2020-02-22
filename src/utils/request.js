
import axios from 'axios'
import { Message } from 'element-ui'

axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
//   console.log(error)
  const status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break

    default:
      break
  }
  Message({ message })
})

export default axios
