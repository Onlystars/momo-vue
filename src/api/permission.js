import { request } from "@/network/request";

// 获取菜单列表
export function getMenuListApi() {
  return request({
    url: "/api/permission/getMenuList",
    method: "get",
  });
}

// 获取上级菜单树
export function getParentTreeApi() {
  return request({
    url: "/api/permission/getParentTree",
    method: "get",
  });
}

// 新增权限
export function addPermissionApi(data) {
  return request({
    url: "/api/permission/addPermission",
    method: "post",
    data,
  });
}

// 编辑权限
export function editSaveApi(data) {
  return request({
    url: "/api/permission/editSave",
    method: "post",
    data,
  });
}
