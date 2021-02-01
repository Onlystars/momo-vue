<template>
  <el-container>
    <el-aside width="200px">
      <div class="ub cross-center" style="margin-top: 5px">
        <i class="el-icon-s-grid"></i>
        <span>组织机构</span>
      </div>
      <tree
        style="padding-left: 0px; padding-top: 5px"
        :nodes="nodes"
        :setting="setting"
        @onCreated="handleCreated"
      />
    </el-aside>
    <el-main>
      <el-form
        size="mini"
        :model="searchForm"
        ref="searchForm"
        label-width="80px"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item label="用户名">
              <el-input v-model="searchForm.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="电话">
              <el-input v-model="searchForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="邮箱">
              <el-input v-model="searchForm.email"></el-input>
            </el-form-item>
          </el-col>
          <el-button
            style="margin-left: 20px"
            size="mini"
            type="primary"
            icon="el-icon-search"
            >搜索</el-button
          >
          <el-button
            @click="addUser"
            size="mini"
            type="primary"
            icon="el-icon-plus"
            >新增</el-button
          >
        </el-row>
      </el-form>

      <el-table
        size="mini"
        :data="tableData"
        :height="tableHeight"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="loginName"
          label="姓名"
          width="180"
        ></el-table-column>
        <el-table-column prop="deptName" label="部门"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column width="250" align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="assignRole(scope.$index, scope.row)"
              >分配角色</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-main>
    <!--新增用户弹框-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="45%">
      <el-form
        :inline="true"
        size="mini"
        :model="addForm"
        ref="addForm"
        label-width="80px"
      >
        <el-form-item prop="loginName" label="姓名">
          <el-input v-model="addForm.loginName"></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-radio-group v-model="addForm.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="mobile" label="电话">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="登录名">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" v-if="editTag == '0'" label="密码">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="deptName" label="机构">
          <el-input
            @click.native="selectDept"
            v-model="addForm.deptName"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserSave">确 定</el-button>
      </span>
    </el-dialog>
    <!--选择上级部门弹框-->
    <el-dialog title="选部门" :visible.sync="parentDialogVisible" width="30%">
      <tree
        :nodes="parentNodes"
        @onCreated="createdParent"
        :setting="parentSetting"
      ></tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="parentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="parentDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!--分配角色-->
    <el-dialog
      class="roleClass"
      title="分配角色"
      :visible.sync="roleDialogVisible"
      width="50%"
    >
      <el-table
        ref="roleTable"
        @current-change="selectRoleRow"
        highlight-current-row
        :data="roleTableData"
        style="width: 100%"
      >
        <el-table-column prop="id" label="序号" width="180"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmRoleSave">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
//引入ztree组件
import tree from "vue-giant-tree";
import {
  getUserListApi,
  addUserApi,
  getUserByIdApi,
  updateSaveUserApi,
  deleteUserByIdApi,
} from "@/api/user";
import {
  getRolistForAssingApi,
  getRoleIdByUserIdApi,
  assingRoleApi,
} from "@/api/role";
import { getLeftTreeApi } from "@/api/department";
export default {
  components: {
    tree,
  },
  created() {
    //左侧部门树
    this.getLeftTree();
    //获取上级部门树
    this.getDeptTree();
    this.getRolistForAssing();
  },
  methods: {
    //分配角色保存
    async confirmRoleSave() {
      //获取参数
      let parm = {
        userId: this.selectUserId,
        roleId: this.currentRow.id,
      };
      assingRoleApi(parm).then((res) => {
        this.$refs.roleTable.setCurrentRow();
        this.roleDialogVisible = false; //关闭弹框
      });
    },
    //分配角色获取数据列表
    async getRolistForAssing() {
      getRolistForAssingApi().then((res) => {
        this.roleTableData = res.data;
      });
    },
    //新增用户保存按钮事件
    async addUserSave() {
      let parm = this.addForm;
      if (this.editTag == "0") {
        addUserApi(parm).then((res) => {
          //取消全部选中
          this.ztreeObj.checkAllNodes(false);
          this.ztreeObj.cancelSelectedNode();
          //设置添加时选中的节点
          var node = this.ztreeObj.getNodeByParam("id", this.addForm.deptId);
          if (node) {
            this.ztreeObj.selectNode(node, true);
            this.setting.callback.onClick(null, node.id, node);
          }
          this.getUserList(this.addForm.deptId);
          this.dialogVisible = false;
        });
      } else {
        updateSaveUserApi(parm).then((res) => {
          //取消全部选中
          this.ztreeObj.checkAllNodes(false);
          this.ztreeObj.cancelSelectedNode();
          //设置添加时选中的节点
          var node = this.ztreeObj.getNodeByParam("id", this.addForm.deptId);
          if (node) {
            this.ztreeObj.selectNode(node, true);
            this.setting.callback.onClick(null, node.id, node);
          }
          this.getUserList(this.addForm.deptId);
          this.dialogVisible = false;
        });
      }
    },
    //获取新增用户上级部门
    async getDeptTree() {
      getLeftTreeApi().then((res) => {
        this.parentNodes = res.data;
      });
    },
    //获取左侧部门树
    async getLeftTree() {
      getLeftTreeApi().then((res) => {
        this.nodes = res.data;
      });
    },
    //当前选择的角色
    selectRoleRow(row) {
      this.currentRow = row;
    },
    //上级部门树创建成功回调
    createdParent(obj) {
      this.parentZtreeObj = obj;
      obj.expandAll(true);
    },
    //上级部门树点击事件
    ztreeParentOnClick(event, treeId, treeNode) {
      this.addForm.deptId = treeNode.id;
      this.addForm.deptName = treeNode.name;
      console.log(event);
      console.log(treeId);
      console.log(treeNode);
    },
    //选择上级部门
    selectDept() {
      this.parentDialogVisible = true;
    },
    //新增用户弹框
    addUser() {
      this.resetForm("addForm");
      this.dialogTitle = "新增用户";
      this.dialogVisible = true;
      this.editTag = "0";
    },
    //编辑事件
    handleEdit(index, row) {
      this.resetForm("addForm");
      this.dialogTitle = "编辑用户";
      this.dialogVisible = true;
      this.editTag = "1";
      //根据用户id查询需要编辑的用户信息
      this.getUserById(row.id);
    },
    async getUserById(userId) {
      let parm = {
        id: userId,
      };
      getUserByIdApi(parm).then((res) => {
        console.log(res.data);
        this.addForm = res.data;
      });
    },
    //解决重置表单时报 'resetFields' of undefined的错
    resetForm(formName) {
      console.log(formName);
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },
    //分配角色按钮点击事件
    async assignRole(index, row) {
      this.roleId = "";
      //设置分配角色的用户id
      this.selectUserId = row.id;
      this.roleDialogVisible = true;
      //查询该用户拥有的角色
      //加await目的是让请求成功之后才执行下面的语句
      this.getRoleIdByUserId(row.id);
    },
    async getRoleIdByUserId(userId) {
      let parm = {
        userId: userId,
      };
      getRoleIdByUserIdApi(parm).then((res) => {
        if (res.data) {
          this.roleId = res.data.roleId;
          this.$nextTick(function () {
            this.$refs.roleTable.setCurrentRow();
            for (let i = 0; i < this.roleTableData.length; i++) {
              if (this.roleId == this.roleTableData[i].id) {
                //设为选中
                this.$refs.roleTable.setCurrentRow(this.roleTableData[i]);
                this.currentRow = this.roleTableData[i];
              }
            }
          });
        }
      });
    },
    //ztree树点击事件
    ztreeOnClick(event, treeId, treeNode) {
      console.log(event);
      console.log(treeId);
      console.log(treeNode);
      //根据部门id查询用户列表
      this.getUserList(treeNode.id);
    },
    //根据部门id查询用户列表
    async getUserList(deptId) {
      let parm = {
        loginName: this.searchForm.username,
        mobile: this.searchForm.phone,
        email: this.searchForm.email,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        deptId: deptId,
      };
      getUserListApi(parm).then((res) => {
        this.total = res.data.total;
        this.tableData = res.data.records;
      });
    },
    //树创建成功后调用
    handleCreated(obj) {
      this.ztreeObj = obj;
      obj.expandAll(true);
      //获取树的第一个节点
      let firstree = this.ztreeObj.getNodes()[0];
      //设置第一个选中
      obj.selectNode(firstree);
      //加载完自动点击第一个，加载右边表格
      if (firstree) {
        this.setting.callback.onClick(null, firstree.id, firstree);
      }
    },
    //删除事件
    handleDelete(index, row) {
      this.$confirm("确定删除吗 ?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let parm = {
          id: row.id,
        };
        deleteUserByIdApi(parm).then((res) => {
          this.getUserList();
        });
      });
    },
    //pagesize改变时触发
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //页数改变时触发
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 250; //后面的50：根据需求空出的高度，自行调整
    });
  },
  data() {
    return {
      //分配用户的角色id
      roleId: "",
      //要分配角色的用户id
      selectUserId: "",
      //当前选中的行
      currentRow: "",
      //0 新增 1：编辑
      editTag: "",
      //总用户条数
      total: 0,
      //角色列表
      roleTableData: [],
      //控制分配角色弹框显示影藏
      roleDialogVisible: false,
      //控制上级部门树弹框显示影藏
      parentDialogVisible: false,
      parentZtreeObj: null,
      parentNodes: [], //上级部门树数据
      //上级部门树配置
      parentSetting: {
        view: {
          showLine: true,
          showIcon: false,
          fontCss: { "font-size": "12px", color: "#333" },
        },
        //设置这里会显示复选框
        // check: {
        //   enable: true
        // },
        data: {
          simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pid",
            rootPId: "0",
          },
        },
        callback: {
          onClick: this.ztreeParentOnClick,
        },
      },
      //新增用户数据绑定
      addForm: {
        username: "",
        sex: "0",
        mobile: "",
        loginname: "",
        password: "",
        deptId: "",
        deptName: "",
      },
      dialogTitle: "",
      //新增用户弹框显示 影藏
      dialogVisible: false,
      //树插件配置
      ztreeObj: null,
      setting: {
        view: {
          showLine: true,
          showIcon: false,
          fontCss: { "font-size": "12px", color: "#333" },
        },
        //设置这里会显示复选框
        // check: {
        //   enable: true
        // },
        data: {
          simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pid",
            rootPId: "0",
          },
        },
        //配置回调函数
        callback: {
          //树的点击事件
          onClick: this.ztreeOnClick,
        },
      },
      nodes: [],
      searchForm: {
        usename: "",
        phone: "",
        email: "",
      },
      //当前页
      currentPage: 1,
      //页容量
      pageSize: 10,
      //表格可视高度
      tableHeight: 0,
      //用户table数据
      tableData: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.roleClass /deep/ .el-table__body tr.current-row > td {
  background: #409eff !important;
  color: #fff;
}
.el-dialog__wrapper /deep/ .el-dialog__body {
  padding-top: 5px !important;
}
</style>