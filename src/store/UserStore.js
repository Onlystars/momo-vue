import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default {
  state: {
    tokenName: "token",
    token: "",
    auths: [],
  },
  mutations: {
    // 设置token
    setToken(state, val) {
      state.token = val;
    },
    // 设置auths
    setAuths(state, val) {
      state.auths = val;
    },
  },
  actions: {},
};
