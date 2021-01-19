import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './assets/global.css'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

// 进入路由之前执行
router.beforeEach((to, form, next) => {
  // 获取当前打开的选项卡
  store.commit('getTabs')
  // 设置当前激活的选项卡
  store.commit('setActiveTabs', to.name)
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')