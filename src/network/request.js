import axios from "axios";
import store from "../store/index";
import { Message } from "element-ui";
import router from "../router/index";

export function request(config) {
  //1.创建axios实例
  const http = axios.create({
    baseURL: store.state.baseURL,
  });
  //2.axios请求拦截器
  http.interceptors.request.use((config) => {
    //携带token
    if (store.state.UserStore.token) {
      //在vuex找token
      let token = store.state.UserStore.token;
      config.headers = { token: token };
      return config;
    } else if (window.sessionStorage.getItem("token")) {
      //在sessionStorage找token
      let token = window.sessionStorage.getItem("token");
      config.headers = { token: token.substring(1, token.length - 1) };
      return config;
    } else {
      //提示token找不到并跳转到登录页
      Message({
        message: "身份过期，请重新登录",
        type: "error",
        duration: 1000,
        onClose: () => {
          router.push("login");
        },
      });
    }
  });

  //3.axios响应拦截
  http.interceptors.response.use(
    (res) => {
      // token失效
      if (res.data.code == 202) {
        Message({
          message: res.data.msg,
          type: "error",
          duration: 1000,
        });
        window.sessionStorage.clear();
        router.push("login");
      }
      if (res.data.code != 200) {
        Message({
          message: res.data.msg,
          type: "error",
          duration: 1000,
        });
      }
      Message({
        message: res.data.msg,
        type: "success",
        duration: 1000,
      });
      return res.data;
    },
    (err) => {
      return Promise.reject(err.response.data);
    }
  );

  //返回promise
  return http(config);
}

export function loginRequest(config) {
  //1.创建axios实例
  const http = axios.create({
    baseURL: store.state.baseURL,
    timeout: 5000,
  });

  //2.axios响应拦截
  http.interceptors.response.use((res) => {
    if (res.data.code != 200) {
      Message({
        message: res.data.msg,
        type: "error",
        duration: 1000,
      });
      return Promise.reject(res.data);
    }
    return res.data;
  });

  //返回promise
  return http(config);
}

export function logoutRequest(config) {
  //1.创建axios实例
  const http = axios.create({
    baseURL: store.state.baseURL,
    timeout: 5000,
  });

  //2.axios请求拦截器
  http.interceptors.request.use((config) => {
    //携带token
    if (store.state.token) {
      //在vuex找token
      let token = store.state.token;
      config.headers = { token: token };
      return config;
    } else if (window.localStorage.getItem("token")) {
      //在sessionStorage找token
      let token = window.localStorage.getItem("token");
      config.headers = { token: token };
      return config;
    } else {
      //提示token找不到并跳转到登录页
      Message({
        message: "身份过期，请重新登录",
        type: "error",
        duration: 1000,
        onClose: () => {
          router.push("/login");
        },
      });
    }
  });

  //3.axios响应拦截
  http.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => {
      //判断token是否失效
      if (err.response.data.error_code == 20001) {
        //提示token失效并跳转到登录页
        Message({
          message: err.response.data.msg,
          type: "error",
          duration: 1000,
          onClose: () => {
            router.push("/login");
          },
        });
      }
      return Promise.reject(err);
    }
  );

  //返回promise
  return http(config);
}

export function requestWithoutToken(config) {
  //1.创建axios实例
  const http = axios.create({
    baseURL: store.state.baseURL,
  });
  //2.axios响应拦截
  http.interceptors.response.use((res) => {
    return res.data;
  });
  //返回promise
  return http(config);
}
