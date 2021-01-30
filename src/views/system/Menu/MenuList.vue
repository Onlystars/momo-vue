<template>
  <el-main>
    <el-form
      size="mini"
      :model="searchForm"
      ref="searchForm"
      label-width="80px"
    >
      <el-row>
        <el-col :span="5">
          <el-form-item label="名称">
            <el-input v-model="searchForm.roleName"></el-input>
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
          @click="addMenu"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          >新增</el-button
        >
      </el-row>
    </el-form>

    <el-table
      :height="tableHeight"
      size="mini"
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column
        prop="label"
        label="名称"
        sortable
        width="180"
      ></el-table-column>
      <el-table-column prop="icon" label="图标" sortable width="180">
        <template slot-scope="scope">
          <i :class="scope.row.icon || ''"></i>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === '0'" size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.type === '1'" size="small" type="success"
            >菜单</el-tag
          >
          <el-tag v-else-if="scope.row.type === '2'" size="small" type="info"
            >按钮</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单URL"></el-table-column>
      <el-table-column prop="name" label="路由地址"></el-table-column>
      <el-table-column prop="code" label="权限标识"></el-table-column>
      <el-table-column prop="orderNum" label="序号"></el-table-column>
      <el-table-column width="170" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editMenu(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--新增权限-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="45%">
      <el-form
        :rules="addMenuValdate"
        :inline="true"
        size="mini"
        :model="addForm"
        ref="addForm"
        label-width="80px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item prop="type" label="权限类型">
              <el-radio-group v-model="addForm.type">
                <el-radio :label="'0'">目录</el-radio>
                <el-radio :label="'1'">菜单</el-radio>
                <el-radio :label="'2'">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item prop="parentName" label="上级菜单">
          <el-input
            readonly
            @click.native="selectParent"
            v-model="addForm.parentName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="label" label="权限名称">
          <el-input v-model="addForm.label"></el-input>
        </el-form-item>
        <el-form-item prop="icon" v-if="addForm.type != '2'" label="菜单图标">
          <el-input v-model="addForm.icon"></el-input>
        </el-form-item>
        <el-form-item prop="name" v-if="addForm.type == '1'" label="路由名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="path" v-if="addForm.type != '2'" label="路由地址">
          <el-input v-model="addForm.path"></el-input>
        </el-form-item>
        <el-form-item prop="url" v-if="addForm.type == '1'" label="组件路径">
          <el-input v-model="addForm.url"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="权限标识">
          <el-input v-model="addForm.code"></el-input>
        </el-form-item>
        <el-form-item label="显示序号">
          <el-input-number v-model="addForm.orderNum"></el-input-number>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addComit">确 定</el-button>
      </span>
    </el-dialog>
    <!--选择上级菜单-->
    <el-dialog title="上级菜单" :visible.sync="parentDialogVisible" width="25%">
      <tree :nodes="nodes" :setting="parentSetting" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="parentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="parentDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import tree from "vue-giant-tree";
import {
  getMenuListApi,
  getParentTreeApi,
  addPermissionApi,
  editSaveApi,
  getMenuByIdApi,
  deleteEntityApi,
} from "@/api/permission";
export default {
  components: {
    tree,
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 210; //后面的50：根据需求空出的高度，自行调整
    });
  },
  created() {
    this.getMenuList();
    this.getParenList();
  },
  methods: {
    async handleDelete(row) {
      this.$confirm("确定删除吗？", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "waring",
      }).then(async () => {
        deleteEntityApi(row).then((res) => {
          console.log(res);
          this.getMenuList();
          this.getParenList();
        });
      });
    },
    //编辑权限点击事件
    editMenu(row) {
      //设置编辑标志为1
      this.editTag = "1";
      this.boxTitle = "编辑权限";
      this.dialogVisible = true;
      this.resetForm("addMenu");
      //回显编辑的数据
      this.getPermissionById(row.id);
    },
    getPermissionById(id) {
      getMenuByIdApi({ id: id }).then((res) => {
        this.addForm = res.data;
      });
    },
    //新增或编辑提交
    addComit() {
      this.$refs["addForm"].validate((valid) => {
        if (!valid) return;
        // 新增
        if (this.editTag == "0") {
          addPermissionApi(this.addForm).then((res) => {
            console.log(res);
          });
        } else {
          // 编辑保存
          editSaveApi(this.addForm).then((res) => {
            console.log(res);
          });
        }
        this.dialogVisible = false;
        this.getMenuList();
        this.getParenList();
      });
    },
    //获取上级菜单树
    async getParenList() {
      getParentTreeApi().then((res) => {
        this.nodes = res.data;
      });
    },
    //获取表格数据
    async getMenuList() {
      getMenuListApi().then((res) => {
        this.tableData = res.data;
      });
    },
    //选择上级菜单
    selectParent() {
      this.parentDialogVisible = true;
    },
    //新增权限点击事件
    addMenu() {
      //标志新增
      this.editTag = "0";
      this.dialogTitle = "新增权限";
      this.dialogVisible = true;
      //清空表单数据
      this.resetForm("addForm");
    },
    //解决重置表单时报 'resetFields' of undefined的错
    resetForm(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },
    //上级部门树点击事件
    ztreeParentOnClick(evt, treeId, treeNode) {
      this.addForm.parentName = treeNode.name;
      this.addForm.parentId = treeNode.id;
      console.log(evt);
      console.log(treeId);
      console.log(treeNode);
    },
  },
  data() {
    return {
      addMenuValdate: {
        type: [{ required: true, trigger: "change", message: "请填选择类型" }],
        label: [
          { required: true, trigger: "change", message: "请填写权限名称" },
        ],
        parentName: [
          { required: true, trigger: "change", message: "请选择上级菜单" },
        ],
        name: [
          { required: true, trigger: "change", message: "请填写路由名称" },
        ],
        path: [
          { required: true, trigger: "change", message: "请填写路由地址" },
        ],
        url: [{ required: true, trigger: "change", message: "请填写组件路径" }],
        code: [
          { required: true, trigger: "change", message: "请填写权限标识" },
        ],
      },
      //0 新增  1 编辑
      editTag: "0",
      nodes: [],
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
      //存储表单数据
      addForm: {
        id: "", //编辑id
        label: "",
        name: "",
        type: "0",
        parentId: "",
        orderNum: "",
        parentName: "",
        path: "",
        code: "",
        icon: "",
      },
      dialogTitle: "",
      //控制弹框显示和影藏
      dialogVisible: false,
      //表格高度
      tableHeight: 0,
      //搜索数据绑定
      searchForm: {
        roleName: "",
      },
      //表格数据
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