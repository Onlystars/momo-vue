import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default {
  state: {
    tokenName: "token",
    token: "",
  },
  mutations: {
    // 设置token
    setToken(state, val) {
      state.token = val;
    },
  },
  actions: {},
};
