import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "./assets/global.css";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// 引入echarts
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

// 进入路由之前执行
router.beforeEach((to, from, next) => {
  // 获取当前打开的选项卡
  store.commit("getTabs");
  // 设置当前激活的选项卡
  store.commit("setActiveTabs", to.name);
  //如果store中的菜单数据menuData被刷新了，那么重新加载
  let token = window.sessionStorage.getItem("token");
  if (to.path === "/login") {
    if (token) {
      next({ path: "/home" });
    } else {
      next();
    }
  } else {
    if (!token && to.name !== "login") {
      next({ path: "/login" });
    } else {
      if (store.state.MenuStore.menuData.length == 0) {
        store.commit("getMenuList", router);
        if (to.path == "/") {
          next({ path: "/home" });
        } else {
          next({ path: to.path });
        }
      } else {
        next();
      }
    }
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
