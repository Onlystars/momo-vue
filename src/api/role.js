import { request } from "@/network/request";

// 新增角色
export function addRoleApi(data) {
  return request({
    url: "/api/role/addRole",
    method: "post",
    data,
  });
}

// 根据id查询角色
export function getRoleByIdApi(params) {
  return request({
    url: "/api/role/getRoleById",
    method: "get",
    params,
  });
}

// 编辑角色
export function updateRoleApi(data) {
  return request({
    url: "/api/role/updateRole",
    method: "post",
    data,
  });
}

// 删除角色
export function deleteRoleApi(data) {
  return request({
    url: "/api/role/deleteRole",
    method: "post",
    data,
  });
}

// 查询角色列表
export function getRoleListApi(data) {
  return request({
    url: "/api/role/getRoleList",
    method: "post",
    data,
  });
}
