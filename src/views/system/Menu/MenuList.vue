<template>
  <el-main>
    <el-form size="mini" :model="searchForm" ref="searchForm" label-width="80px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="名称">
            <el-input v-model="searchForm.roleName"></el-input>
          </el-form-item>
        </el-col>
        <el-button style="margin-left:20px;" size="mini" type="primary" icon="el-icon-search">搜索</el-button>
        <el-button @click="addMenu" size="mini" type="primary" icon="el-icon-plus">新增</el-button>
      </el-row>
    </el-form>

    <el-table
      :height="tableHeight"
      size="mini"
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="label" label="名称" sortable width="180"></el-table-column>
      <el-table-column prop="icon" label="图标" sortable width="180">
        <template slot-scope="scope">
          <i :class="scope.row.icon || ''"></i>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === '0'" size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.type === '1'" size="small" type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.type === '2'" size="small" type="info">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单URL"></el-table-column>
      <el-table-column prop="name" label="路由地址"></el-table-column>
      <el-table-column prop="code" label="权限标识"></el-table-column>
      <el-table-column prop="orderNum" label="序号"></el-table-column>
      <el-table-column width="170" align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editMenu(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--新增权限-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="45%">
      <el-form
        :rules="addMenuValdate"
        :inline="true"
        size="mini"
        :model="addFrom"
        ref="addFrom"
        label-width="80px"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item prop="type" label="权限类型">
              <el-radio-group v-model="addFrom.type">
                <el-radio :label="'0'">目录</el-radio>
                <el-radio :label="'1'">菜单</el-radio>
                <el-radio :label="'2'">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item prop="parentName" label="上级菜单">
          <el-input readonly @click.native="selectParent" v-model="addFrom.parentName"></el-input>
        </el-form-item>
        <el-form-item prop="label" label="权限名称">
          <el-input v-model="addFrom.label"></el-input>
        </el-form-item>
        <el-form-item prop="icon" v-if="addFrom.type != '2'" label="菜单图标">
          <el-input v-model="addFrom.icon"></el-input>
        </el-form-item>
        <el-form-item prop="name" v-if="addFrom.type == '1'" label="路由名称">
          <el-input v-model="addFrom.name"></el-input>
        </el-form-item>
        <el-form-item prop="path" v-if="addFrom.type != '2'" label="路由地址">
          <el-input v-model="addFrom.path"></el-input>
        </el-form-item>
        <el-form-item prop="url" v-if="addFrom.type == '1'" label="组件路径">
          <el-input v-model="addFrom.url"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="权限标识">
          <el-input v-model="addFrom.code"></el-input>
        </el-form-item>
        <el-form-item label="显示序号">
          <el-input-number v-model="addFrom.orderNum"></el-input-number>
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
        <el-button type="primary" @click="parentDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script>
import tree from "vue-giant-tree";

export default {
  components: {
    tree
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
     async handleDelete(row){

    },
    //编辑权限点击事件
    editMenu(row){
      //设置编辑标志为1
      this.editTag = "1";
      this.boxTitle = "编辑权限";
      this.dialogVisible = true;
      this.resetForm("addMenu");
      //回显编辑的数据
    },
    async getPermissionById(id){

    },
    //新增或编辑提交
    addComit() {

    },
    //获取上级菜单树
    async getParenList() {

    },
    //获取表格数据
    async getMenuList() {

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
      this.resetForm("addFrom");
    },
    //解决重置表单时报 'resetFields' of undefined的错
    resetForm(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },
    //上级部门树点击事件
    ztreeParentOnClick(evt, treeId, treeNode) {
      this.addFrom.parentName = treeNode.name;
      this.addFrom.parentId = treeNode.id;
      console.log(evt);
      console.log(treeId);
      console.log(treeNode);
    }
  },
  data() {
    return {
      addMenuValdate: {
        type: [{ required: true, trigger: "change", message: "请填选择类型" }],
        label: [
          { required: true, trigger: "change", message: "请填写权限名称" }
        ],
        parentName: [
          { required: true, trigger: "change", message: "请选择上级菜单" }
        ],
        name: [
          { required: true, trigger: "change", message: "请填写路由名称" }
        ],
        path: [
          { required: true, trigger: "change", message: "请填写路由地址" }
        ],
        url: [{ required: true, trigger: "change", message: "请填写组件路径" }],
        code: [{ required: true, trigger: "change", message: "请填写权限标识" }]
      },
      //0 新增  1 编辑
      editTag: "0",
      nodes: [
        {
          id: 0,
          pid: -1,
          name: "顶级菜单",
          open: true,
          checked: false
        },
        {
          id: 17,
          pid: 0,
          name: "系统管理",
          open: true,
          checked: false
        },
        {
          id: 18,
          pid: 17,
          name: "用户管理",
          open: true,
          checked: false
        },
        {
          id: 23,
          pid: 17,
          name: "角色管理",
          open: true,
          checked: false
        },
        {
          id: 28,
          pid: 17,
          name: "权限管理",
          open: true,
          checked: false
        },
        {
          id: 33,
          pid: 17,
          name: "机构管理",
          open: true,
          checked: false
        },
        {
          id: 34,
          pid: 0,
          name: "商品管理",
          open: true,
          checked: false
        },
        {
          id: 36,
          pid: 34,
          name: "分类管理",
          open: true,
          checked: false
        },
        {
          id: 37,
          pid: 34,
          name: "品牌管理",
          open: true,
          checked: false
        },
        {
          id: 42,
          pid: 0,
          name: "系统工具",
          open: true,
          checked: false
        },
        {
          id: 43,
          pid: 42,
          name: "代码生成",
          open: true,
          checked: false
        },
        {
          id: 77,
          pid: 42,
          name: "接口文档",
          open: true,
          checked: false
        }
      ],
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
          fontCss: { "font-size": "12px", color: "#333" }
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
            rootPId: "0"
          }
        },
        callback: {
          onClick: this.ztreeParentOnClick
        }
      },
      //存储表单数据
      addFrom: {
        id: "", //编辑id
        label: "",
        name: "",
        type: 0,
        parentId: "",
        orderNum: "",
        parentName: "",
        path: "",
        code: "",
        icon: ""
      },
      dialogTitle: "",
      //控制弹框显示和影藏
      dialogVisible: false,
      //表格高度
      tableHeight: 0,
      //搜索数据绑定
      searchForm: {
        roleName: ""
      },
      //表格数据
      tableData: [],
      menuList: [
        {
          id: 17,
          parentId: 0,
          parentName: "顶级菜单",
          label: "系统管理",
          code: "sys:manage",
          path: "/system",
          name: null,
          url: null,
          orderNum: 1,
          type: "0",
          icon: "el-icon-document",
          remark: null,
          createTime: "2023-08-08T03:11:11.000+0000",
          updateTime: "2023-08-09T07:26:28.000+0000",
          isHome: 0,
          children: [
            {
              id: 33,
              parentId: 17,
              parentName: "系统管理",
              label: "机构管理",
              code: "sys:dept",
              path: "/departmentList",
              name: "departmentList",
              url: "/system/Department/DepartmentList",
              orderNum: 2,
              type: "1",
              icon: "el-icon-copy-document",
              remark: "机构管理",
              createTime: "2020-04-12T14:58:29.000+0000",
              updateTime: "2020-04-08T09:12:19.000+0000",
              isHome: 0,
              children: [
                {
                  id: 46,
                  parentId: 33,
                  parentName: null,
                  label: "新增",
                  code: "sys:addDepartment",
                  path: "",
                  name: "",
                  url: null,
                  orderNum: 0,
                  type: "2",
                  icon: "",
                  remark: null,
                  createTime: "2020-04-12T11:58:48.000+0000",
                  updateTime: "2020-04-12T11:58:48.000+0000",
                  isHome: 0,
                  children: []
                },
                {
                  id: 76,
                  parentId: 33,
                  parentName: null,
                  label: "编辑",
                  code: "sys:editDept",
                  path: "",
                  name: "",
                  url: null,
                  orderNum: 1,
                  type: "2",
                  icon: "",
                  remark: null,
                  createTime: "2020-04-12T12:42:20.000+0000",
                  updateTime: "2020-04-12T12:42:20.000+0000",
                  isHome: 0,
                  children: []
                },
                {
                  id: 78,
                  parentId: 33,
                  parentName: "机构管理",
                  label: "删除",
                  code: "sys:deleteDept",
                  path: "",
                  name: "",
                  url: "",
                  orderNum: 3,
                  type: "2",
                  icon: "",
                  remark: null,
                  createTime: "2020-04-18T02:25:55.000+0000",
                  updateTime: "2020-04-18T02:25:55.000+0000",
                  isHome: 0,
                  children: []
                }
              ]
            },
            {
              id: 18,
              parentId: 17,
              parentName: null,
              label: "用户管理",
              code: "sys:user",
              path: "/userList",
              name: "userList",
              url: "/system/User/UserList",
              orderNum: 3,
              type: "1",
              icon: "el-icon-s-custom",
              remark: null,
              createTime: "2023-08-08T03:11:11.000+0000",
              updateTime: "2023-08-09T07:26:28.000+0000",
              isHome: 0,
              children: [
                {
                  id: 20,
                  parentId: 18,
                  parentName: null,
                  label: "新增",
                  code: "sys:user:add",
                  path: null,
                  name: null,
                  url: "",
                  orderNum: null,
                  type: "2",
                  icon: "",
                  remark: "新增用户",
                  createTime: "2023-08-08T03:11:11.000+0000",
                  updateTime: "2023-08-09T07:26:28.000+0000",
                  isHome: 0,
                  children: []
                },
                {
                  id: 21,
                  parentId: 18,
                  parentName: null,
                  label: "修改",
                  code: "sys:user:edit",
                  path: null,
                  name: null,
                  url: "",
                  orderNum: null,
                  type: "2",
                  icon: "",
                  remark: "修改用户",
                  createTime: "2023-08-08T03:11:11.000+0000",
                  updateTime: "2023-08-09T07:26:28.000+0000",
                  isHome: 0,
                  children: []
                },
                {
                  id: 22,
                  parentId: 18,
                  parentName: null,
                  label: "删除",
                  code: "sys:user:delete",
                  path: null,
                  name: null,
                  url: "",
                  orderNum: null,
                  type: "2",
                  icon: "",
                  remark: "删除用户",
                  createTime: "2023-08-08T03:11:11.000+0000",
                  updateTime: "2023-08-09T07:26:28.000+0000",
                  isHome: 0,
                  children: []
                },
                {
                  id: 80,
                  parentId: 18,
                  parentName: "用户管理",
                  label: "分配角色",
                  code: "sys:user:assign",
                  path: "",
                  name: "",
                  url: "",
                  orderNum: 0,
                  type: "2",
                  icon: "",
                  remark: null,
                  createTime: "2020-04-18T02:50:14.000+0000",
                  updateTime: "2020-04-18T02:50:14.000+0000",
                  isHome: 0,
                  children: []
                }
              ]
            },
            {
              id: 23,
              parentId: 17,
              parentName: null,
              label: "角色管理",
              code: "sys:role",
              path: "/roleList",
              name: "roleList",
              url: "/system/Role/RoleList",
              orderNum: 4,
              type: "1",
              icon: "el-icon-rank",
              remark: null,
              createTime: "2023-08-08T03:11:11.000+0000",
              updateTime: "2023-08-09T07:26:28.000+0000",
              isHome: 0,
              children: [
                {
                  id: 25,
                  parentId: 23,
                  parentName: null,
                  label: "新增",
                  code: "sys:role:add",
                  path: null,
                  name: null,
                  url: "",
                  orderNum: null,
                  type: "2",
                  icon: "",
                  remark: "新增角色",
                  createTime: "2023-08-08T03:11:11.000+0000",
                  updateTime: "2023-08-09T07:26:28.000+0000",
                  isHome: 0,
                  children: []
                },
                {
                  id: 26,
                  parentId: 23,
                  parentName: null,
                  label: "修改",
                  code: "sys:role:edit",
                  path: null,
                  name: null,
                  url: "",
                  orderNum: null,
                  type: "2",
                  icon: "",
                  remark: "修改角色",
                  createTime: "2023-08-08T03:11:11.000+0000",
                  updateTime: "2023-08-09T07:26:28.000+0000",
                  isHome: 0,
                  children: []
                },
                {
                  id: 27,
                  parentId: 23,
                  parentName: null,
                  label: "删除",
                  code: "sys:role:delete",
                  path: null,
                  name: null,
                  url: "",
                  orderNum: null,
                  type: "2",
                  icon: "",
                  remark: "删除角色",
                  createTime: "2023-08-08T03:11:11.000+0000",
                  updateTime: "2023-08-09T07:26:28.000+0000",
                  isHome: 0,
                  children: []
                },
                {
                  id: 79,
                  parentId: 23,
                  parentName: "角色管理",
                  label: "分配权限",
                  code: "sys:role:assign",
                  path: "",
                  name: "",
                  url: "",
                  orderNum: 0,
                  type: "2",
                  icon: "",
                  remark: null,
                  createTime: "2020-04-18T02:31:05.000+0000",
                  updateTime: "2020-04-18T02:31:05.000+0000",
                  isHome: 0,
                  children: []
                }
              ]
            },
            {
              id: 28,
              parentId: 17,
              parentName: null,
              label: "权限管理",
              code: "sys:menu",
              path: "/menuList",
              name: "menuList",
              url: "/system/Menu/MenuList",
              orderNum: 5,
              type: "1",
              icon: "el-icon-menu",
              remark: null,
              createTime: "2023-08-08T03:11:11.000+0000",
              updateTime: "2023-08-09T07:26:28.000+0000",
              isHome: 0,
              children: [
                {
                  id: 30,
                  parentId: 28,
                  parentName: null,
                  label: "新增",
                  code: "sys:menu:add",
                  path: null,
                  name: null,
                  url: "",
                  orderNum: null,
                  type: "2",
                  icon: null,
                  remark: "新增权限",
                  createTime: "2023-08-08T03:11:11.000+0000",
                  updateTime: "2023-08-09T07:26:28.000+0000",
                  isHome: 0,
                  children: []
                },
                {
                  id: 31,
                  parentId: 28,
                  parentName: null,
                  label: "修改",
                  code: "sys:menu:edit",
                  path: null,
                  name: null,
                  url: "",
                  orderNum: null,
                  type: "2",
                  icon: null,
                  remark: "修改权限",
                  createTime: "2023-08-08T03:11:11.000+0000",
                  updateTime: "2023-08-09T07:26:28.000+0000",
                  isHome: 0,
                  children: []
                },
                {
                  id: 32,
                  parentId: 28,
                  parentName: null,
                  label: "删除",
                  code: "sys:menu:delete",
                  path: null,
                  name: null,
                  url: "",
                  orderNum: null,
                  type: "2",
                  icon: "",
                  remark: "删除权限",
                  createTime: "2023-08-08T03:11:11.000+0000",
                  updateTime: "2023-08-09T07:26:28.000+0000",
                  isHome: 0,
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 34,
          parentId: 0,
          parentName: "顶级菜单",
          label: "商品管理",
          code: "sys:goods",
          path: "/goods",
          name: "",
          url: null,
          orderNum: 2,
          type: "0",
          icon: "el-icon-picture",
          remark: null,
          createTime: "2020-04-12T14:49:47.000+0000",
          updateTime: "2020-04-12T09:22:03.000+0000",
          isHome: 0,
          children: [
            {
              id: 36,
              parentId: 34,
              parentName: "商品管理",
              label: "分类管理",
              code: "sys:goodsCategory",
              path: "/goodCategory",
              name: "goodCategory",
              url: "/goods/goodsCategory/goodsCategoryList",
              orderNum: 1,
              type: "1",
              icon: "el-icon-s-data",
              remark: null,
              createTime: "2020-04-12T14:54:32.000+0000",
              updateTime: "2020-04-12T09:26:30.000+0000",
              isHome: 0,
              children: [
                {
                  id: 38,
                  parentId: 36,
                  parentName: null,
                  label: "新增",
                  code: "sys:addGoodsCategory",
                  path: "",
                  name: "",
                  url: null,
                  orderNum: 0,
                  type: "2",
                  icon: "",
                  remark: null,
                  createTime: "2020-04-12T09:33:58.000+0000",
                  updateTime: "2020-04-12T09:33:58.000+0000",
                  isHome: 0,
                  children: []
                },
                {
                  id: 39,
                  parentId: 36,
                  parentName: null,
                  label: "编辑",
                  code: "sys:editGoodsCategory",
                  path: "",
                  name: "",
                  url: null,
                  orderNum: 1,
                  type: "2",
                  icon: "",
                  remark: null,
                  createTime: "2020-04-12T09:35:30.000+0000",
                  updateTime: "2020-04-12T09:35:30.000+0000",
                  isHome: 0,
                  children: []
                }
              ]
            },
            {
              id: 37,
              parentId: 34,
              parentName: null,
              label: "品牌管理",
              code: "sys:goodsBrand",
              path: "/goodsBrand",
              name: "goodsBrand",
              url: "/goods/goodsBrand/goodsBrandList",
              orderNum: 2,
              type: "1",
              icon: "el-icon-tickets",
              remark: null,
              createTime: "2020-04-12T09:32:04.000+0000",
              updateTime: "2020-04-12T09:32:04.000+0000",
              isHome: 0,
              children: [
                {
                  id: 40,
                  parentId: 37,
                  parentName: null,
                  label: "新增",
                  code: "sys:addGoodsBrand",
                  path: "",
                  name: "",
                  url: null,
                  orderNum: 0,
                  type: "2",
                  icon: "",
                  remark: null,
                  createTime: "2020-04-12T09:36:14.000+0000",
                  updateTime: "2020-04-12T09:36:14.000+0000",
                  isHome: 0,
                  children: []
                },
                {
                  id: 41,
                  parentId: 37,
                  parentName: null,
                  label: "编辑",
                  code: "sys:editGoodsBrand",
                  path: "",
                  name: "",
                  url: null,
                  orderNum: 1,
                  type: "2",
                  icon: "",
                  remark: null,
                  createTime: "2020-04-12T09:36:46.000+0000",
                  updateTime: "2020-04-12T09:36:46.000+0000",
                  isHome: 0,
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 42,
          parentId: 0,
          parentName: "顶级菜单",
          label: "系统工具",
          code: "sys:systenConfig",
          path: "/systenConfig",
          name: "",
          url: null,
          orderNum: 3,
          type: "0",
          icon: "el-icon-receiving",
          remark: null,
          createTime: "2020-04-12T14:50:03.000+0000",
          updateTime: "2020-04-12T09:40:41.000+0000",
          isHome: 0,
          children: [
            {
              id: 43,
              parentId: 42,
              parentName: "系统工具",
              label: "代码生成",
              code: "sys:systemCode",
              path: "/systemCode",
              name: "systemCode",
              url: "/system/config/code",
              orderNum: 0,
              type: "1",
              icon: "el-icon-files",
              remark: null,
              createTime: "2020-04-16T04:44:42.000+0000",
              updateTime: "2020-04-12T09:44:06.000+0000",
              isHome: 0,
              children: []
            },
            {
              id: 77,
              parentId: 42,
              parentName: "系统工具",
              label: "接口文档",
              code: "sys:document",
              path: "/document",
              name: "document",
              url: "/system/config/systemDocument",
              orderNum: 0,
              type: "1",
              icon: "el-icon-s-operation",
              remark: null,
              createTime: "2020-04-13T03:31:45.000+0000",
              updateTime: "2020-04-13T03:31:45.000+0000",
              isHome: 0,
              children: []
            }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.el-dialog__wrapper /deep/ .el-dialog__body {
  padding-top: 10px !important;
  padding-bottom: 5px !important;
}
</style>