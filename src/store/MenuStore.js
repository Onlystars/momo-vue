import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default {
  state: {
    // 当前激活的选项卡
    editableTabsValue: "desktop",
    // tabs选项卡数据
    tabs: [
      {
        title: "首页", // 选项卡名
        name: "desktop", // 选项卡别名
      },
    ],
    // 菜单伸缩
    isCollapse: false,
    // 菜单数据
    menuData: [],

  },
  mutations: {
    // 点击菜单时调用
    selectMenu(state, val) {
      // 1.把当前点击的菜单对象加到tabs里面
      let res = state.tabs.findIndex((item) => item.name === val.name);
      // 2.判断tabs是否存在，不存在才加入到tabs
      if (res === -1) {
        let obj = {};
        obj.title = val.label;
        obj.name = val.name;
        state.tabs.push(obj);
      }
      // 3.设置当前选中的对象
      state.editableTabsValue = val.name;
      // 4.保存当前选项卡数据
      sessionStorage.setItem("tabList", JSON.stringify(state.tabs));
    },
    // 从sessionStorage恢复当前选择卡数据
    getTabs(state) {
      let tabs = sessionStorage.getItem("tabList");
      if (tabs) {
        state.tabs = JSON.parse(tabs);
      }
    },
    // 设置当前激活的选项卡
    setActiveTabs(state, val) {
      state.editableTabsValue = val;
    },
    //设置收缩菜单属性
    setOpenOrClose(state) {
      state.isCollapse = !state.isCollapse;
    },
    // 
    getMenuList(state, router){
      // 1.取出菜单数据
      let menuList = sessionStorage.getItem('menuList')
      // 2.设置菜单数据
      if(menuList){
        state.menuData = JSON.parse(menuList)
      }
      // 3.取出路由数据
      let temp = sessionStorage.getItem('routerList')
      let routerList = []
      if(temp){
        routerList = JSON.parse(temp)
      }
      // 4.动态生成路由
        // 4.1 获取原来的路由
      let oldRouter = router.options.routes
        // 4.2 遍历后台返回的路由数据，动态生成路由
      routerList.forEach(item => {
        item.component = () => import(`@/views${item.url}.vue`)
        oldRouter[1].children.push(item)
      });
      // 5.添加到现有路由里面
      router.addRoutes(oldRouter)
    }
  },
  actions: {},
};
