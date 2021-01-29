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
        username: "test",
        password: "1234",
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
        webLoginApi(this.LoginFormData).then((res) => {
          //保存菜单数据
          sessionStorage.setItem("menuList", JSON.stringify(res.data.menuList));
          //保存路由数据
          sessionStorage.setItem(
            "routerList",
            JSON.stringify(res.data.routerList)
          );
          // 保存token
          this.$store.commit("setToken", res.data.token);
          sessionStorage.setItem("token", JSON.stringify(res.data.token));
          // 保存auths
          this.$store.commit("setAuths", res.data.authList);
          sessionStorage.setItem("auths", JSON.stringify(res.data.authList));
          //动态生成路由
          this.$store.commit("getMenuList", this.$router);
          this.$message({
            message: res.msg,
            type: "success",
            duration: 1000,
          });
          //跳转到home页面
          this.$router.push("home");
        });
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
