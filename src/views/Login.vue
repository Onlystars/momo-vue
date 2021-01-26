<template>
  <div id="outer">
    <el-card>
      <div id="title">momo-通用权限管理系统</div>
      <el-divider></el-divider>
      <el-form
        ref="LoginForm"
        :model="LoginFormData"
        :rules="rules"
        size="small"
      >
        <el-form-item prop="username">
          <el-input
            v-model="LoginFormData.username"
            placeholder="请输入用户名"
            clearable
            prefix-icon="el-icon-user-solid"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="LoginFormData.password"
            placeholder="请输入密码"
            clearable
            prefix-icon="el-icon-key"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="10">
            <el-col :span="16">
              <el-input
                v-model="LoginFormData.code"
                placeholder="请输入验证码"
                clearable
                prefix-icon="el-icon-key"
              ></el-input>
            </el-col>
            <el-col :span="8">
              <!-- <el-input
                readonly
                auto-complete="off"
                placeholder="单击图片刷新"
                style="width: 100%"
              ></el-input> -->
              <img @click="getImageCode" :src="imgSrc" class="codeImg" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item size="large">
          <el-button style="width: 100%" type="primary" @click="submitForm"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getImageApi, webLoginApi } from "@/api/user";
export default {
  name: "login",
  components: {},
  props: [],
  data() {
    return {
      imgSrc: undefined, // 验证码图片
      // 登录表单
      LoginFormData: {
        username: 'test',
        password: '1234',
        code: undefined,
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getImageCode();
  },
  mounted() {},
  methods: {
    submitForm() {
      this.$refs["LoginForm"].validate((valid) => {
        if (!valid) return;
        webLoginApi(this.LoginFormData).then(res => {
          console.log(res);
        })
        // let menuList = [
        //   {
        //     children: [
        //       {
        //         children: [],
        //         code: "sys:dept",
        //         createTime: 1586703509000,
        //         icon: "el-icon-copy-document",
        //         id: 33,
        //         isHome: 0,
        //         label: "机构管理",
        //         name: "departmentList",
        //         orderNum: 2,
        //         parentId: 17,
        //         path: "/departmentList",
        //         remark: "机构管理",
        //         type: "1",
        //         updateTime: 1586337139000,
        //         url: "/system/Department/DepartmentList",
        //       },
        //       {
        //         children: [],
        //         code: "sys:user",
        //         createTime: 1691464271000,
        //         icon: "el-icon-s-custom",
        //         id: 18,
        //         isHome: 0,
        //         label: "用户管理",
        //         name: "userList",
        //         orderNum: 3,
        //         parentId: 17,
        //         path: "/userList",
        //         type: "1",
        //         updateTime: 1691565988000,
        //         url: "/system/User/UserList",
        //       },
        //       {
        //         children: [],
        //         code: "sys:role",
        //         createTime: 1691464271000,
        //         icon: "el-icon-rank",
        //         id: 23,
        //         isHome: 0,
        //         label: "角色管理",
        //         name: "roleList",
        //         orderNum: 4,
        //         parentId: 17,
        //         path: "/roleList",
        //         type: "1",
        //         updateTime: 1691565988000,
        //         url: "/system/Role/RoleList",
        //       },
        //       {
        //         children: [],
        //         code: "sys:menu",
        //         createTime: 1691464271000,
        //         icon: "el-icon-menu",
        //         id: 28,
        //         isHome: 0,
        //         label: "权限管理",
        //         name: "menuList",
        //         orderNum: 5,
        //         parentId: 17,
        //         path: "/menuList",
        //         type: "1",
        //         updateTime: 1691565988000,
        //         url: "/system/Menu/MenuList",
        //       },
        //     ],
        //     code: "sys:manage",
        //     createTime: 1691464271000,
        //     icon: "el-icon-document",
        //     id: 17,
        //     isHome: 0,
        //     label: "系统管理",
        //     orderNum: 1,
        //     parentId: 0,
        //     path: "/system",
        //     type: "0",
        //     updateTime: 1691565988000,
        //   },
        //   {
        //     children: [
        //       {
        //         children: [],
        //         code: "sys:goodsCategory",
        //         createTime: 1586703272000,
        //         icon: "el-icon-s-data",
        //         id: 36,
        //         isHome: 0,
        //         label: "分类管理",
        //         name: "goodCategory",
        //         orderNum: 1,
        //         parentId: 34,
        //         path: "/goodCategory",
        //         type: "1",
        //         updateTime: 1586683590000,
        //         url: "/goods/goodsCategory/goodsCategoryList",
        //       },
        //       {
        //         children: [],
        //         code: "sys:goodsBrand",
        //         createTime: 1586683924000,
        //         icon: "el-icon-tickets",
        //         id: 37,
        //         isHome: 0,
        //         label: "品牌管理",
        //         name: "goodsBrand",
        //         orderNum: 2,
        //         parentId: 34,
        //         path: "/goodsBrand",
        //         type: "1",
        //         updateTime: 1586683924000,
        //         url: "/goods/goodsBrand/goodsBrandList",
        //       },
        //     ],
        //     code: "sys:goods",
        //     createTime: 1586702987000,
        //     icon: "el-icon-picture",
        //     id: 34,
        //     isHome: 0,
        //     label: "商品管理",
        //     name: "",
        //     orderNum: 2,
        //     parentId: 0,
        //     path: "/goods",
        //     type: "0",
        //     updateTime: 1586683323000,
        //   },
        //   {
        //     children: [
        //       {
        //         children: [],
        //         code: "sys:systemCode",
        //         createTime: 1587012282000,
        //         icon: "el-icon-files",
        //         id: 43,
        //         isHome: 0,
        //         label: "代码生成",
        //         name: "systemCode",
        //         orderNum: 0,
        //         parentId: 42,
        //         path: "/systemCode",
        //         type: "1",
        //         updateTime: 1586684646000,
        //         url: "/system/config/code",
        //       },
        //       {
        //         children: [],
        //         code: "sys:document",
        //         createTime: 1586748705000,
        //         icon: "el-icon-s-operation",
        //         id: 77,
        //         isHome: 0,
        //         label: "接口文档",
        //         name: "document",
        //         orderNum: 0,
        //         parentId: 42,
        //         path: "/document",
        //         type: "1",
        //         updateTime: 1586748705000,
        //         url: "/system/config/systemDocument",
        //       },
        //     ],
        //     code: "sys:systenConfig",
        //     createTime: 1586703003000,
        //     icon: "el-icon-receiving",
        //     id: 42,
        //     isHome: 0,
        //     label: "系统工具",
        //     name: "",
        //     orderNum: 3,
        //     parentId: 0,
        //     path: "/systenConfig",
        //     type: "0",
        //     updateTime: 1586684441000,
        //   },
        // ];
        // //路由数据
        // let routerList = [
        //   {
        //     children: [],
        //     code: "sys:systemCode",
        //     createTime: 1587012282000,
        //     icon: "el-icon-files",
        //     id: 43,
        //     isHome: 0,
        //     label: "代码生成",
        //     name: "systemCode",
        //     orderNum: 0,
        //     parentId: 42,
        //     path: "/systemCode",
        //     type: "1",
        //     updateTime: 1586684646000,
        //     url: "/system/config/code",
        //   },
        //   {
        //     children: [],
        //     code: "sys:document",
        //     createTime: 1586748705000,
        //     icon: "el-icon-s-operation",
        //     id: 77,
        //     isHome: 0,
        //     label: "接口文档",
        //     name: "document",
        //     orderNum: 0,
        //     parentId: 42,
        //     path: "/document",
        //     type: "1",
        //     updateTime: 1586748705000,
        //     url: "/system/config/systemDocument",
        //   },
        //   {
        //     children: [],
        //     code: "sys:goodsCategory",
        //     createTime: 1586703272000,
        //     icon: "el-icon-s-data",
        //     id: 36,
        //     isHome: 0,
        //     label: "分类管理",
        //     name: "goodCategory",
        //     orderNum: 1,
        //     parentId: 34,
        //     path: "/goodCategory",
        //     type: "1",
        //     updateTime: 1586683590000,
        //     url: "/goods/goodsCategory/goodsCategoryList",
        //   },
        //   {
        //     children: [],
        //     code: "sys:goodsBrand",
        //     createTime: 1586683924000,
        //     icon: "el-icon-tickets",
        //     id: 37,
        //     isHome: 0,
        //     label: "品牌管理",
        //     name: "goodsBrand",
        //     orderNum: 2,
        //     parentId: 34,
        //     path: "/goodsBrand",
        //     type: "1",
        //     updateTime: 1586683924000,
        //     url: "/goods/goodsBrand/goodsBrandList",
        //   },
        //   {
        //     children: [],
        //     code: "sys:dept",
        //     createTime: 1586703509000,
        //     icon: "el-icon-copy-document",
        //     id: 33,
        //     isHome: 0,
        //     label: "机构管理",
        //     name: "departmentList",
        //     orderNum: 2,
        //     parentId: 17,
        //     path: "/departmentList",
        //     remark: "机构管理",
        //     type: "1",
        //     updateTime: 1586337139000,
        //     url: "/system/Department/DepartmentList",
        //   },
        //   {
        //     children: [],
        //     code: "sys:user",
        //     createTime: 1691464271000,
        //     icon: "el-icon-s-custom",
        //     id: 18,
        //     isHome: 0,
        //     label: "用户管理",
        //     name: "userList",
        //     orderNum: 3,
        //     parentId: 17,
        //     path: "/userList",
        //     type: "1",
        //     updateTime: 1691565988000,
        //     url: "/system/User/UserList",
        //   },
        //   {
        //     children: [],
        //     code: "sys:role",
        //     createTime: 1691464271000,
        //     icon: "el-icon-rank",
        //     id: 23,
        //     isHome: 0,
        //     label: "角色管理",
        //     name: "roleList",
        //     orderNum: 4,
        //     parentId: 17,
        //     path: "/roleList",
        //     type: "1",
        //     updateTime: 1691565988000,
        //     url: "/system/Role/RoleList",
        //   },
        //   {
        //     children: [],
        //     code: "sys:menu",
        //     createTime: 1691464271000,
        //     icon: "el-icon-menu",
        //     id: 28,
        //     isHome: 0,
        //     label: "权限管理",
        //     name: "menuList",
        //     orderNum: 5,
        //     parentId: 17,
        //     path: "/menuList",
        //     type: "1",
        //     updateTime: 1691565988000,
        //     url: "/system/Menu/MenuList",
        //   },
        // ];
        // //保存菜单数据
        // sessionStorage.setItem("menuList", JSON.stringify(menuList));
        // //保存路由数据
        // sessionStorage.setItem("routerList", JSON.stringify(routerList));
        // //动态生成路由
        // this.$store.commit("getMenuList", this.$router);
        // //跳转到home页面
        // this.$router.push("home");
      });
    },
    resetForm() {
      this.$refs["LoginForm"].resetFields();
    },
    // 获取验证码
    getImageCode() {
      getImageApi().then((res) => {
        let blob = new Blob([res], {
          type: "image/jpg",
        });
        let url = window.URL.createObjectURL(blob);
        this.imgSrc = url;
      });
    },
  },
};
</script>

<style scoped>
#title {
  font-size: 25px;
  font-weight: bold;
  color: #20222a;
  text-align: center;
}
#outer {
  width: 100vw;
  height: 100vh;
  background-color: #20222a;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-card {
  width: 400px;
  height: 350px;
}
.codeImg {
  width: 100%;
  cursor: pointer;
}
</style>
