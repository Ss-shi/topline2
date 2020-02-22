import Vue from 'vue'
import App from './App.vue'
import '@/permission'
import router from './router'
import ElementUI from 'element-ui' // 引入UI
import Component from './views/components'
import axios from '@/utils/request'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
