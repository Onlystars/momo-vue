<template>
  <el-card>
    <!-- 搜索表单 -->
    <el-form size="mini" :model="searchForm" label-width="40px" slot="header">
      <el-row>
        <el-col :span="5">
          <el-form-item label="名称">
            <el-input
              v-model="searchForm.roleName"
              placeholder="请输入角色名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-button
          class="searchBtn"
          type="primary"
          size="mini"
          icon="el-icon-search"
          >查询</el-button
        >
        <el-button
          class="searchBtn"
          type="primary"
          size="mini"
          icon="el-icon-circle-plus"
          >新增</el-button
        >
      </el-row>
    </el-form>
    <!-- 角色列表 -->
    <el-table
      :data="tableData"
      size="mini"
      :stripe="true"
      border
      style="width: 100%"
    >
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editRow(scope.$index, tableData)"
            type="primary"
            size="mini"
            >编辑
          </el-button>
          <el-button
            @click.native.prevent="assignRole(scope.$index, tableData)"
            type="primary"
            size="mini"
            >分配权限
          </el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="danger"
            size="mini"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配权限弹窗 -->
    <el-dialog
      class="self_dialog"
      width="25%"
      :title="dialogTitle"
      :visible.sync="innerVisible"
    >
      <tree
        :nodes="treeDatas"
        :setting="setting"
        @onCheck="ztreeOnCheck"
        @onCreated="handleCreated"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAssign">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="tableData.length"
    ></el-pagination>
  </el-card>
</template>

<script>
import tree from "vue-giant-tree";
export default {
  components: {
    tree,
  },
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      //搜索表单数据绑定
      searchForm: {
        roleName: "",
      },
      //表格数据
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      innerVisible: false, //控制弹框显示
      dialogTitle: '',
      treeDatas:[],
      ztreeObj: null,
      setting: {
        check: {
          enable: true,
        },
        data: {
          simpleData: {
            // 是否使用简单数据模式
            enable: true,
            // 树节点id
            idKey: "id",
            // 父级id
            pIdKey: "pid",
            rootPId: "0",
          },
        },
        callback: {
          onCheck: this.ztreeOnCheck,
        },
      },
    };
  },
  methods: {
    //删除按钮
    deleteRow(index, row) {},
    //编辑按钮
    editRow(index, row) {},
    //分配权限
    assignRole(index,row) {
      this.roldId = row.id;
      this.dialogTitle = "为【" + row.name + "】分配权限";
      this.treeDatas = [
        {
          id: 17,
          pid: 0,
          name: "系统管理",
          open: null,
          checked: true,
        },
        {
          id: 18,
          pid: 17,
          name: "用户管理",
          open: null,
          checked: true,
        },
        {
          id: 20,
          pid: 18,
          name: "新增",
          open: null,
          checked: true,
        },
        {
          id: 21,
          pid: 18,
          name: "修改",
          open: null,
          checked: true,
        },
        {
          id: 22,
          pid: 18,
          name: "删除",
          open: null,
          checked: true,
        },
        {
          id: 23,
          pid: 17,
          name: "角色管理",
          open: null,
          checked: true,
        },
        {
          id: 25,
          pid: 23,
          name: "新增",
          open: null,
          checked: true,
        },
        {
          id: 26,
          pid: 23,
          name: "修改",
          open: null,
          checked: true,
        },
        {
          id: 27,
          pid: 23,
          name: "删除",
          open: null,
          checked: true,
        },
        {
          id: 28,
          pid: 17,
          name: "权限管理",
          open: null,
          checked: true,
        },
        {
          id: 30,
          pid: 28,
          name: "新增",
          open: null,
          checked: true,
        },
        {
          id: 31,
          pid: 28,
          name: "修改",
          open: null,
          checked: true,
        },
        {
          id: 32,
          pid: 28,
          name: "删除",
          open: null,
          checked: true,
        },
        {
          id: 33,
          pid: 17,
          name: "机构管理",
          open: null,
          checked: true,
        },
        {
          id: 34,
          pid: 0,
          name: "商品管理",
          open: null,
          checked: true,
        },
        {
          id: 36,
          pid: 34,
          name: "分类管理",
          open: null,
          checked: true,
        },
        {
          id: 37,
          pid: 34,
          name: "品牌管理",
          open: null,
          checked: true,
        },
        {
          id: 38,
          pid: 36,
          name: "新增",
          open: null,
          checked: true,
        },
        {
          id: 39,
          pid: 36,
          name: "编辑",
          open: null,
          checked: true,
        },
        {
          id: 40,
          pid: 37,
          name: "新增",
          open: null,
          checked: true,
        },
        {
          id: 41,
          pid: 37,
          name: "编辑",
          open: null,
          checked: true,
        },
        {
          id: 42,
          pid: 0,
          name: "系统工具",
          open: null,
          checked: true,
        },
        {
          id: 43,
          pid: 42,
          name: "代码生成",
          open: null,
          checked: true,
        },
        {
          id: 46,
          pid: 33,
          name: "新增",
          open: null,
          checked: true,
        },
        {
          id: 76,
          pid: 33,
          name: "编辑",
          open: null,
          checked: true,
        },
        {
          id: 77,
          pid: 42,
          name: "接口文档",
          open: null,
          checked: true,
        },
        {
          id: 78,
          pid: 33,
          name: "删除",
          open: null,
          checked: true,
        },
        {
          id: 79,
          pid: 23,
          name: "分配权限",
          open: null,
          checked: true,
        },
        {
          id: 80,
          pid: 18,
          name: "分配角色",
          open: null,
          checked: true,
        },
      ];
      this.innerVisible = true;
    },
    // 创建树回调
     handleCreated: function(ztreeObj) {
      console.log("加载树完成");
      this.ztreeObj = ztreeObj;
      console.log(this.ztreeObj);
      //设置节点全部展开
      ztreeObj.expandAll(true);
    },
    //树checkbox回调
     ztreeOnCheck() {
      let checked = this.ztreeObj.getCheckedNodes(true);
      this.checkPermissions = checked;
      console.log(checked);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    saveAssign(){

    }
  },
};
</script>

<style lang="scss" scoped>
.searchBtn {
  margin-left: 15px;
}
.self_dialog {
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
}
.self_dialog /deep/ .el-dialog {
  margin: 0 auto !important;
  height: 90%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-left: 15px;
}
.self_dialog /deep/ .el-dialog .el-dialog__body {
  padding-top: 5px !important;
  overflow: hidden;
  overflow-y: auto;
  margin-bottom: 40px;
}
.self_dialog /deep/ .el-dialog .el-dialog__footer {
  left: 40%;
  bottom: 0;
  position: absolute;
}
</style>