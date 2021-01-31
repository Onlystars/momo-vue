<template>
  <el-container>
    <el-aside width="200px">
      <div
        class="ub cross-center"
        style="margin-left: 5px; font-size: 16px; margin-top: 5px"
      >
        <i class="el-icon-s-grid"></i>
        <span style="margin-left: 3px">组织机构</span>
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
            <el-form-item label="部门名称">
              <el-input v-model="searchForm.deptName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="部门电话">
              <el-input v-model="searchForm.deptPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-button
            @click="getDepartmentList()"
            style="margin-left: 20px"
            size="mini"
            type="primary"
            icon="el-icon-search"
            >搜索</el-button
          >
          <el-button
            @click="addDept"
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
        <el-table-column prop="name" label="部门名称"></el-table-column>
        <el-table-column prop="parentName" label="上级部门"></el-table-column>
        <el-table-column prop="deptPhone" label="部门电话"></el-table-column>
        <el-table-column width="170" align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
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
    <!--新增部门弹框-->
    <el-dialog
      :title="deptDialogTitle"
      :visible.sync="dialogVisible"
      width="35%"
    >
      <el-form
        :rules="addDeptValdate"
        size="mini"
        :model="addForm"
        ref="addForm"
        label-width="80px"
      >
        <el-form-item prop="parentName" label="上级部门">
          <el-input
            @click.native="selectDept"
            v-model="addForm.parentName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name" label="部门名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="部门编码">
          <el-input v-model="addForm.deptCode"></el-input>
        </el-form-item>
        <el-form-item label="部门电话">
          <el-input v-model="addForm.deptPhone"></el-input>
        </el-form-item>
        <el-form-item label="部门地址">
          <el-input v-model="addForm.deptAddress"></el-input>
        </el-form-item>
        <el-form-item label="序号">
          <el-input-number v-model="addForm.orderNum"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDeptSave">确 定</el-button>
      </span>
    </el-dialog>
    <!--上级部门弹框-->
    <el-dialog title="选择上级" :visible.sync="parentDialogVisible" width="30%">
      <tree
        @onCreated="parentCreated"
        :nodes="parentNodes"
        :setting="parentSetting"
      ></tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="parentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="parentDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import tree from "vue-giant-tree";
import {
  getDepartmentListApi,
  addDepartmentApi,
  getDepartmentByIdApi,
  updateDepartmentApi,
  deleteByIdApi,
  getLeftTreeApi,
  getParentTreeApi,
} from "@/api/department";
export default {
  name: "departmentList",
  components: {
    tree,
  },
  created() {
    //获取左侧部门树
    this.getLeftTree();
    //获取新增部门上级部门树
    this.getParentTree();
  },
  methods: {
    //添加或编辑部门时提交事件
    addDeptSave() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          if (this.editTag == "0") {
            //新增url
            addDepartmentApi(this.addForm).then((res) => {
              console.log(res);
              //刷新上级部门树
              this.getParentTree();
              //获取左侧部门树
              this.getLeftTree();
              //刷新列表
              this.getDepartmentList();
              this.dialogVisible = false;
            });
          } else {
            //编辑url
            updateDepartmentApi(this.addForm).then((res) => {
              console.log(res);
              //刷新上级部门树
              this.getParentTree();
              //获取左侧部门树
              this.getLeftTree();
              //刷新列表
              this.getDepartmentList();
              this.dialogVisible = false;
            });
          }
        }
      });
    },
    //获取新增部门上级部门树
    async getParentTree() {
      getParentTreeApi().then((res) => {
        this.parentNodes = res.data;
      });
    },
    //获取左边部门树
    async getLeftTree() {
      getLeftTreeApi().then((res) => {
        console.log(res);
        this.nodes = res.data;
      });
    },
    //选择上级部门事件
    selectDept() {
      this.parentDialogVisible = true;
    },
    //新增部门事件
    addDept() {
      //清空表单数据
      this.resetForm("addForm");
      this.deptDialogTitle = "新增部门";
      this.dialogVisible = true;
      this.editTag = "0";
    },
    //编辑部门点击事件
    handleEdit(index, row) {
      //设置为编辑
      this.editTag = "1";
      this.resetForm("addForm");
      this.deptDialogTitle = "编辑部门";
      this.dialogVisible = true;
      //查询要编辑的数据回显
      this.getDepartmentById(row.id);
    },
    //查询要编辑的数据
    async getDepartmentById(id) {
      let parm = {
        id: id,
      };
      getDepartmentByIdApi(parm).then((res) => {
        this.addForm = res.data;
      });
    },
    //解决重置表单时报 'resetFields' of undefined的错
    resetForm(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },
    //上级部门树创建成功调用
    parentCreated(treeObj) {
      this.parentZtreeObj = treeObj;
      treeObj.expandAll(true);
      //根据原来选中的id来找到要选中的节点
      var node = this.parentZtreeObj.getNodeByParam("id", this.addForm.pid);
      //把找到的节点设为选中状态
      this.parentZtreeObj.selectNode(node);
    },
    //树创建成功之后调用
    handleCreated(treeObj) {
      this.ztreeObj = treeObj;
      //设置展开
      treeObj.expandAll(true);
      //获取第一个节点
      let firstTree = null;
      if (this.addForm.pid != "") {
        firstTree = this.ztreeObj.getNodeByParam("id", this.addForm.pid);
      } else {
        firstTree = this.ztreeObj.getNodes()[0];
      }
      //把第一个节点设置为选中
      this.ztreeObj.selectNode(firstTree);
      //加载完自动点击第一个，根据点击的节点id加载右边表格
      if (firstTree) {
        //此处需要判断，否则会报错
        this.setting.callback.onClick(null, firstTree.id, firstTree);
      }
    },
    //上级部门树点击事件
    ztreeParentOnClick(evt, treeId, treeNode) {
      this.addForm.parentName = treeNode.name;
      this.addForm.pid = treeNode.id;
      console.log(evt);
      console.log(treeId);
      console.log(treeNode);
    },
    //左侧部门树的点击事件
    ztreeOnClick(evt, treeId, treeNode) {
      this.selectPid = treeNode.id;
      this.getDepartmentList();
      console.log(evt);
      console.log(treeId);
      console.log(treeNode);
      //
    },
    //根据部门id查询下级部门
    async getDepartmentList() {
      let parm = {
        selectPid: this.selectPid,
        name: this.searchForm.deptName,
        phone: this.searchForm.deptPhone,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      };
      getDepartmentListApi(parm).then((res) => {
        console.log(res);
        this.tableData = res.data.records;
        this.total = res.data.total;
        this.pageSize = res.data.size;
        this.currentPage = res.data.current;
      });
    },
    //删除部门
    handleDelete(index, row) {
      this.$confirm("确定删除吗 ?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        let parm = {
          id: row.id,
        };
        deleteByIdApi(parm).then((res) => {
          //刷新上级部门树
          this.getParentTree();
          //获取左侧部门树
          this.getLeftTree();
          //刷新列表
          this.getDepartmentList();
          this.dialogVisible = false;
        });
      });
    },
    //页容量改变时候调用
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //点击页数时候调用
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
      addDeptValdate: {
        parentName: [
          { required: true, trigger: "change", message: "请填选择上级部门" },
        ],
        name: [
          { required: true, trigger: "change", message: "请填写部门名称" },
        ],
      },
      editTag: "0",
      //数据总条数
      total: 0,
      //左侧部门树点击的节点id
      selectPid: "",
      //控制上级部门弹框显示
      parentDialogVisible: false,
      //上级树陪
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
      //添加部门表单数据域
      addForm: {
        id: "",
        pid: "",
        parentName: "",
        name: "",
        deptCode: "",
        deptPhone: "",
        deptAddress: "",
        orderNum: "",
      },
      //弹框标题
      deptDialogTitle: "",
      //新增弹框显示和影藏
      dialogVisible: false,
      //树插件配置
      ztreeObj: null,
      setting: {
        view: {
          //是否显示节点之间的连线
          showLine: true,
          //是否显示节点的图标
          showIcon: false,
          //个性化文字样式
          fontCss: { "font-size": "12px", color: "#333" },
        },
        //设置这里会显示复选框
        // check: {
        //   enable: true
        // },
        data: {
          //ztree数据模式配置
          simpleData: {
            // 使用 / 不使用 简单数据模式
            enable: true,
            idKey: "id",
            pIdKey: "pid",
            rootPId: "0",
          },
        },
        //回调函数配置
        callback: {
          //；配置树的点击事件
          onClick: this.ztreeOnClick,
        },
      },
      //树绑定数据
      nodes: [],
      //搜索数据域绑定
      searchForm: {
        deptName: "",
        deptPhone: "",
      },
      //当前页数
      currentPage: 1,
      pageSize: 10,
      //表格高度
      tableHeight: 0,
      //部门列表数据绑定
      tableData: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.el-dialog__wrapper /deep/ .el-dialog__body {
  padding-top: 10px !important;
  padding-bottom: 5px !important;
}
</style>