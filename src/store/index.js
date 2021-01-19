import Vue from 'vue'
import Vuex from 'vuex'
import MenuStore from '@/store/MenuStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    MenuStore
  }
})
