<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    closable
    @tab-remove="removeTab"
    @tab-click="tabClick"
  >
    <el-tab-pane
      v-for="(item) in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  computed:{
    // 选中的选项卡
    editableTabsValue:({
      get(){
        return this.$store.state.MenuStore.editableTabsValue
      },
      set(val){
        this.$store.state.MenuStore.editableTabsValue = val
      }
    }),
    // 当前选项卡组
    editableTabs:({
      get(){
        return this.$store.state.MenuStore.tabs
      },
      set(val){
        this.$store.state.MenuStore.tabs = val
      }
    })
  },
  data() {
    return {
  
    };
  },
  methods: {
    // 点击选项卡
    tabClick(tab){
      let obj = {}
      // 选项卡名
      obj.title = tab.label
      // 选项卡标识符
      obj.name = tab.name
      this.$store.commit('selectMenu', obj)
      this.$router.path = tab.path
    },
    // 删除选项卡
    removeTab(targetName) {
      if(targetName === 'desktop'){
        return
      }
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>