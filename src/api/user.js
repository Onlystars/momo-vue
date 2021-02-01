import { request, requestWithoutToken, loginRequest } from "@/network/request";

// 获取验证码
export function getImageApi() {
  return requestWithoutToken({
    url: "/api/user/image",
    responseType: "blob",
    method: "get",
  });
}

// 登录
export function webLoginApi(data) {
  return loginRequest({
    url: "/api/user/login",
    method: "post",
    params: data,
  });
}

// 查询用户列表
export function getUserListApi(data) {
  return request({
    url: "/api/user/getUserList",
    method: "post",
    data,
  });
}

// 新增用户
export function addUserApi(data) {
  return request({
    url: "/api/user/addUser",
    method: "post",
    data,
  });
}

// 根据用户id查询用户
export function getUserByIdApi(params) {
  return request({
    url: "/api/user/getUserById",
    method: "get",
    params,
  });
}

// 编辑用户保存
export function updateSaveUserApi(data) {
  return request({
    url: "/api/user/updateSaveUser",
    method: "post",
    data,
  });
}

// 根据用户id删除
export function deleteUserByIdApi(params) {
  return request({
    url: "/api/user/deleteUserById",
    method: "get",
    params,
  });
}
