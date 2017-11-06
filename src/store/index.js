import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import header from './modules/header'
import goods from './modules/goods'
import shopCart from './modules/shopCart'

Vue.use(Vuex)

const state = {
  classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
  index: 0
}
export default new Vuex.Store({
  state,
  actions,
  modules: {
    header,
    goods,
    shopCart
  }
})
