<template>
  <el-container>
    <el-aside :width="isCollapse?'64px':'200px'">
      <menu-bar></menu-bar>
    </el-aside>
    <el-container>
      <el-header height="81px">
        <div id="headerTop">
          <div style="display: inline-block; position: absolute; left: 10px">
            <i class="el-icon-s-fold" @click="closeMenu"></i>
          </div>
          <div
            style="
              display: inline-block;
              position: absolute;
              right: 15px;
              top: 10px;
            "
          >
            <el-dropdown>
              <span class="el-dropdown-link" style="cursor: pointer">
                管理员<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  ><span @click="logout">退出</span></el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <!-- 上方导航栏 -->
        <tabs></tabs>
      </el-header>
      <el-main style="overflow: hidden">
        <!-- 主窗口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MenuBar from "@/components/MenuBar";
import Tabs from "@/components/Tabs";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      isCollapse: (state) => state.MenuStore.isCollapse,
    }),
  },
  name: "home",
  components: {
    MenuBar,
    Tabs,
  },
  data() {
    return {};
  },
  methods: {
    //折叠菜单方法
    closeMenu() {
      this.$store.commit('setOpenOrClose')
    },
    // 登出
    logout() {},
  },
  mounted() {},
  created() {},
};
</script>

<style scoped>
#headerTop {
  position: relative;
  height: 39px;
  border-bottom: 1px rgba(102, 102, 102, 0.1) solid;
}
#headerBottom {
  height: 40px;
}
.el-container {
  height: 100vh;
}
.el-aside {
  background-color: #20222a;
}
.el-header {
  background-color: rgba(255, 255, 255, 1);
  margin: 0;
  padding: 0;
  box-shadow: 1px 1px 1px rgba(102, 102, 102, 0.8);
}
.el-menu {
  border: 0;
}
.el-icon-s-fold {
  font-size: 28px;
  margin: 8px 0px 0px 10px;
}
</style>
