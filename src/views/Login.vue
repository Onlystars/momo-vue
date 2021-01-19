<template>
  <div id="outer">
    <el-card>
      <div id="title">momo-通用权限管理系统</div>
      <el-divider></el-divider>
      <el-form ref="LoginForm" :model="LoginFormData" :rules="rules" size="small">
        <el-form-item prop="username">
          <el-input v-model="LoginFormData.username" placeholder="请输入用户名" clearable
            prefix-icon='el-icon-user-solid' :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="LoginFormData.password" placeholder="请输入密码" clearable prefix-icon='el-icon-key'
            :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="10">
            <el-col :span="16">
              <el-input v-model="LoginFormData.code" placeholder="请输入验证码" clearable prefix-icon='el-icon-key'></el-input>
            </el-col>
            <el-col :span="8">
              <el-input readonly auto-complete="off" placeholder="单击图片刷新" style="width: 100%;"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item size="large" >
          <el-button style="width: 100%" type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'login',
    components: {},
    props: [],
    data() {
      return {
        LoginFormData: {
          username: undefined,
          password: undefined,
          code: undefined
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          code: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }],
        },
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      submitForm() {
        this.$refs['LoginForm'].validate(valid => {
          if (!valid) return
          // TODO 提交表单
        })
      },
      resetForm() {
        this.$refs['LoginForm'].resetFields()
      },
    }
  }
</script>

<style scoped>
  #title{
    font-size: 25px;
    font-weight: bold;
    color: #20222A;
    text-align: center;
  }
  #outer{
    width: 100vw;
    height: 100vh;
    background-color: #20222A;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-card{
    width: 400px;
    height: 350px;
  }
</style>
