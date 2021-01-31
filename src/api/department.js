import { request } from "@/network/request";

// 查询部门列表
export function getDepartmentListApi(data) {
  return request({
    url: "/api/department/getDepartmentList",
    method: "post",
    data,
  });
}

// 新增部门
export function addDepartmentApi(data) {
  return request({
    url: "/api/department/addDepartment",
    method: "post",
    data,
  });
}

// 根据id查询部门数据
export function getDepartmentByIdApi(params) {
  return request({
    url: "/api/department/getDepartmentById",
    method: "get",
    params,
  });
}

// 更新部门
export function updateDepartmentApi(data) {
  return request({
    url: "/api/department/updateDepartment",
    method: "post",
    data,
  });
}

// 删除部门
export function deleteByIdApi(params) {
  return request({
    url: "/api/department/deleteById",
    method: "get",
    params,
  });
}

// 获取左侧部门树
export function getLeftTreeApi() {
  return request({
    url: "/api/department/getLeftTree",
    method: "get",
  });
}

// 新增部门获取上级部门树
export function getParentTreeApi() {
  return request({
    url: "/api/department/getParentTree",
    method: "get",
  });
}
