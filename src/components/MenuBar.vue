<template>
  <el-menu
    :collapse="isCollapse"
    background-color="#20222A"
    text-color="#fff"
    :default-active="$route.path"
    active-text-color="#ffd04b"
    unique-opened
  >
    <div id="title">通用权限管理系统</div>
    <template v-for="menu in menuList">
      <el-submenu v-if="menu.children.length > 0" :index="menu.path" :key="menu.path">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{menu.label}}</span>
        </template>
        <menu-item v-for="menu in menu.children" :menu="menu" :key="menu.path"></menu-item>
      </el-submenu>
      <template v-else>
        <menu-item :menu="menu" :key="menu.path"></menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script>
import MenuItem from "./MenuItem.vue"
import {mapState} from 'vuex'
export default {
  components: { MenuItem },
  name: "MenuBar",
  computed:{
    ...mapState({
      isCollapse: state => state.MenuStore.isCollapse
    })
  },
  data() {
    return {
      menuList: [
        {
          children: [
            {
              children: [],
              code: "sys:dept",
              createTime: 1586703509000,
              icon: "el-icon-copy-document",
              id: 33,
              isHome: 0,
              label: "机构管理",
              name: "departmentList",
              orderNum: 2,
              parentId: 17,
              path: "/departmentList",
              remark: "机构管理",
              type: "1",
              updateTime: 1586337139000,
              url: "/system/Department/DepartmentList",
            },
            {
              children: [],
              code: "sys:user",
              createTime: 1691464271000,
              icon: "el-icon-s-custom",
              id: 18,
              isHome: 0,
              label: "用户管理",
              name: "userList",
              orderNum: 3,
              parentId: 17,
              path: "/userList",
              type: "1",
              updateTime: 1691565988000,
              url: "/system/User/UserList",
            },
            {
              children: [],
              code: "sys:role",
              createTime: 1691464271000,
              icon: "el-icon-rank",
              id: 23,
              isHome: 0,
              label: "角色管理",
              name: "roleList",
              orderNum: 4,
              parentId: 17,
              path: "/roleList",
              type: "1",
              updateTime: 1691565988000,
              url: "/system/Role/RoleList",
            },
            {
              children: [],
              code: "sys:menu",
              createTime: 1691464271000,
              icon: "el-icon-menu",
              id: 28,
              isHome: 0,
              label: "权限管理",
              name: "menuList",
              orderNum: 5,
              parentId: 17,
              path: "/menuList",
              type: "1",
              updateTime: 1691565988000,
              url: "/system/Menu/MenuList",
            },
          ],
          code: "sys:manage",
          createTime: 1691464271000,
          icon: "el-icon-document",
          id: 17,
          isHome: 0,
          label: "系统管理",
          orderNum: 1,
          parentId: 0,
          path: "/system",
          type: "0",
          updateTime: 1691565988000,
        },
        {
          children: [
            {
              children: [],
              code: "sys:goodsCategory",
              createTime: 1586703272000,
              icon: "el-icon-s-data",
              id: 36,
              isHome: 0,
              label: "分类管理",
              name: "goodCategory",
              orderNum: 1,
              parentId: 34,
              path: "/goodCategory",
              type: "1",
              updateTime: 1586683590000,
              url: "/goods/goodsCategory/goodsCategoryList",
            },
            {
              children: [],
              code: "sys:goodsBrand",
              createTime: 1586683924000,
              icon: "el-icon-tickets",
              id: 37,
              isHome: 0,
              label: "品牌管理",
              name: "goodsBrand",
              orderNum: 2,
              parentId: 34,
              path: "/goodsBrand",
              type: "1",
              updateTime: 1586683924000,
              url: "/goods/goodsBrand/goodsBrandList",
            },
          ],
          code: "sys:goods",
          createTime: 1586702987000,
          icon: "el-icon-picture",
          id: 34,
          isHome: 0,
          label: "商品管理",
          name: "",
          orderNum: 2,
          parentId: 0,
          path: "/goods",
          type: "0",
          updateTime: 1586683323000,
        },
        {
          children: [
            {
              children: [],
              code: "sys:systemCode",
              createTime: 1587012282000,
              icon: "el-icon-files",
              id: 43,
              isHome: 0,
              label: "代码生成",
              name: "systemCode",
              orderNum: 0,
              parentId: 42,
              path: "/systemCode",
              type: "1",
              updateTime: 1586684646000,
              url: "/system/config/code",
            },
            {
              children: [],
              code: "sys:document",
              createTime: 1586748705000,
              icon: "el-icon-s-operation",
              id: 77,
              isHome: 0,
              label: "接口文档",
              name: "document",
              orderNum: 0,
              parentId: 42,
              path: "/document",
              type: "1",
              updateTime: 1586748705000,
              url: "/system/config/systemDocument",
            },
          ],
          code: "sys:systenConfig",
          createTime: 1586703003000,
          icon: "el-icon-receiving",
          id: 42,
          isHome: 0,
          label: "系统工具",
          name: "",
          orderNum: 3,
          parentId: 0,
          path: "/systenConfig",
          type: "0",
          updateTime: 1586684441000,
        },
      ],
    };
  },
  created(){
  },
  methods:{
  }
};
</script>

<style lang="scss" scoped>
#title {
  height: 39px;
  line-height: 39px;
  font-size: 16px;
  font-weight: normal;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  border-bottom: 1px rgba(255, 255, 255, 0.1) solid;
}
</style>