<template>
  <el-main>
    <!--搜索框-->
    <el-form size="mini" :model="roleForm" label-width="80px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="名称">
            <el-input
              v-model="roleForm.roleName"
              placeholder="请输入角色名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-button
          @click="searchBtn"
          class="btn-left"
          size="mini"
          type="primary"
          icon="el-icon-search"
          >查询</el-button
        >
        <el-button
          @click="openAddRole"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          >新增</el-button
        >
      </el-row>
    </el-form>
    <!--数据表格
     :data 表格数据绑定
     height: 表格高度，只要在el-table元素中定义了height属性
             即可实现固定表头的表格，而不需要额外的代码
    border ：表格边框
    prop ：自动属性需要跟表格数据对应
    -->
    <el-table
      size="mini"
      :data="tableData"
      :height="tableHeight"
      border
      style="width: 100%"
    >
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <!-- 表格操作栏 -->
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-button @click="editRole(scope.row)" size="mini" type="primary"
            >编辑</el-button
          >
          <el-button size="mini" @click="assignRole(scope.row)" type="success"
            >分配权限</el-button
          >
          <el-button size="mini" @click="deleteRole(scope.row)" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件
    size-change ： pageSize改变时候调用
    current-change ：页数改变时候调用
    current-page ：当前页
    page-size ：页容量
    total ：总条数
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
    ></el-pagination>
    <!--新增角色对话框-->
    <el-dialog :title="dialogTitle" :visible.sync="visible" width="45%">
      <el-form
        :rules="rules"
        ref="addRole"
        :model="addRoleForm"
        size="mini"
        :inline="true"
      >
        <el-form-item prop="name" label="角色名称" label-width="80px">
          <el-input
            v-model="addRoleForm.name"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="角色描述" label-width="80px">
          <el-input
            v-model="addRoleForm.remark"
            placeholder="请输入角色描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="confirmBtn">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限弹框-->
    <el-dialog
      class="self_dialog"
      :title="dialogRoleTitle"
      :visible.sync="dialogVisible"
      width="25%"
    >
      <tree
        :setting="setting"
        :nodes="treeDatas"
        @onCheck="ztreeOnCheck"
        @onCreated="handleCreated"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAssign">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
//引入ztree组件
import tree from "vue-giant-tree";
import {
  addRoleApi,
  getRoleByIdApi,
  updateRoleApi,
  deleteRoleApi,
  getRoleListApi,
} from "@/api/role";
export default {
  components: {
    tree,
  },
  created() {
    //获取角色列表
    this.getRoleList();
  },
  methods: {
    searchBtn() {
      this.getRoleList();
    },
    //获取角色列表
    getRoleList() {
      let parm = {
        title: this.roleForm.roleName,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      };
      getRoleListApi(parm).then((res) => {
        this.currentPage = res.data.current;
        this.pageSize = res.data.size;
        this.tableData = res.data.records;
      });
    },
    //确认新增或编辑
    confirmBtn() {
      this.$refs["addRole"].validate((valid) => {
        if (!valid) return;
        if (this.editTag == "0") {
          addRoleApi(this.addRoleForm).then((res) => {
            console.log(res);
          });
        } else {
          updateRoleApi(this.addRoleForm).then((res) => {
            console.log(res);
          });
        }
        this.visible = false;
        this.getRoleList();
      });
    },
    openAddRole() {
      this.editTag = "0";
      //清空表单数据
      this.resetForm("addRole");
      //设置弹框标题
      this.dialogTitle = "新增角色";
      //显示弹框
      this.visible = true;
    },
    //删除角色
    deleteRole(row) {
      this
        .$confirm("确定删除吗？", "系统提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "waring",
        })
        .then(async () => {
          deleteRoleApi(row).then(res => {
            console.log(res);
            this.getRoleList();
          })
        });
    },
    //编辑角色事件
    editRole(row) {
      this.editTag = "1";
      //清空表单数据
      this.resetForm("addRole");
      //设置弹框标题
      this.dialogTitle = "编辑角色";
      //显示弹框
      this.visible = true;
      //显示需要编辑的数据
      this.getRoleById(row.id);
    },
    //查询编辑的数据
    async getRoleById(id) {
      getRoleByIdApi({ id: id }).then((res) => {
        this.addRoleForm.id = res.data.id;
        this.addRoleForm.name = res.data.name;
        this.addRoleForm.remark = res.data.remark;
      });
    },
    //保存分配权限
    async saveAssign() {
      if (this.checkPermissions.length < 1) {
        this.$message({
          message: "请勾选权限!",
          type: "success",
        });
        return;
      }
      let parms = {
        list: this.checkPermissions,
        roleId: this.roldId,
      };
    },
    //分配角色权限按钮事件
    async assignRole(row) {
      this.treeDatas = [];
      console.log(row);
      this.roldId = row.id;
      this.dialogRoleTitle = "为【" + row.name + "】分配权限";
      this.dialogVisible = true;
      let parm = {
        userId: sessionStorage.getItem("userId"),
        roleId: row.id,
      };
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
    },
    //pageSize改变时候调用
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //页数改变时候调用
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getRoleList();
    },
    resetForm(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },
    //获取选择的权限
    ztreeOnCheck() {
      //获取所有选中的节点
      let checked = this.ztreeObj.getCheckedNodes(true);
      this.checkPermissions = checked;
      console.log(checked);
    },
    handleCreated: function (ztreeObj) {
      this.ztreeObj = ztreeObj;
      // onCreated 中操作ztreeObj对象展开第一个节点
      ztreeObj.expandAll(true);
    },
  },
  data() {
    return {
      //存放选中的权限
      checkPermissions: [],
      roleId: "",
      dialogRoleTitle: "",
      editTag: "0",
      //ztree数据
      treeDatas: [],
      //ztree对象
      ztreeObj: null,
      //ztree配置，参照ztree官网的配置
      setting: {
        check: {
          //树是否带复选框或者单选框
          enable: true,
        },
        data: {
          simpleData: {
            //是否使用简单数据模式
            enable: true,
            //树节点id，一般是后台数据库主键
            idKey: "id",
            //父级id
            pIdKey: "pid",
            rootPId: "0",
          },
        },
        //ztree回调函数
        callback: {
          //树选择事件
          onCheck: this.ztreeOnCheck,
        },
      },
      //控制分配权限弹框显示和影藏
      dialogVisible: false,
      //分配权限弹框标题
      autnTitle: "",
      total: 0, //总条数
      currentPage: 1, //当前页
      pageSize: 10, //页容量
      //表单验证
      rules: {
        name: [
          {
            required: true,
            trigger: "change",
            message: "请输入角色名称",
          },
        ],
      },
      //新增或编辑角色时数据绑定对象
      addRoleForm: {
        id: "",
        name: "",
        remark: "",
      },
      //对话框标题
      dialogTitle: "",
      //控制对话框显示和影藏 true 时显示 false 影藏
      visible: false,
      //搜索框数据绑定
      roleForm: {
        roleName: "",
      },
      //表格高度
      tableHeight: window.innerHeight,
      //表格数据
      tableData: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 220; //后面的50：根据需求空出的高度，自行调整
    });
  },
};
</script>

<style lang="scss" scoped>
.btn-left {
  margin-left: 30px;
}
.el-main {
  padding-top: 5px !important;
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