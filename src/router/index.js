import Vue from 'vue'
import VueRouter from 'vue-router'
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import( '../views/Home.vue'),
    redirect: '/desktop',
    children: [
      {
        path: '/desktop',
        name: 'desktop',
        component: () => import('@/views/DeskTop.vue')
      },
      // {
      //   path: '/departmentList',
      //   name: 'departmentList',
      //   component: () => import('@/views/system/Department/DepartmentList.vue')
      // },
      // {
      //   path: '/menuList',
      //   name: 'menuList',
      //   component: () => import('@/views/system/Menu/MenuList.vue')
      // },
      // {
      //   path: '/roleList',
      //   name: 'roleList',
      //   component: () => import('@/views/system/Role/RoleList.vue')
      // },
      // {
      //   path: '/userList',
      //   name: 'userList',
      //   component: () => import('@/views/system/User/UserList.vue')
      // },
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
