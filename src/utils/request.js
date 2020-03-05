
import axios from 'axios'
import { Message } from 'element-ui'
import JSONBig from 'json-bigint'

axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.defaults.transformResponse = [function (data) {
  return JSONBig.parse(data)
}]
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
  return Promise.reject(error)
})

export default axios
