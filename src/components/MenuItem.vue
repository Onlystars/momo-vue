<template>
  <div>
    <el-menu-item @click="selectMenu(menu)" :index="menu.path">
      <i :class="menu.icon"></i>
      <span slot="title">{{menu.label}}</span>
    </el-menu-item>
  </div>
</template>

<script>
  export default {
    name: 'MenuItem',
    props: ['menu'],
    methods: {
      // 同步菜单选项卡
      selectMenu(menu){
        // 设置选项卡
        this.$store.commit('selectMenu', menu)
        // 设置路由
        this.$router.push({name: menu.name})
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>