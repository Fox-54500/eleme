import * as types from '../mutations-types'

const state = {
  cartGoods: [],
  value: false,
  val: false
}
const getters = {
  allGoods: state => state.cartGoods,
  valueChange: state => state.value,
  valChange: state => state.val
}

const mutations = {
  [types.RECEIVE_FOODS](state, {goods}) {
    let allGoods = []
    for (let i = 0; i < goods.length; i++) {
      let item = goods[i]
      for (let j = 0; j < item.foods.length; j++) {
        let food = item.foods[j]
        let test = allGoods.find(f => f.name === food.name)
        if (!test) {
          food.count = 0
          allGoods.push(food)
        }
      }
    }
    state.cartGoods = allGoods
  },
  addToCart(state, food) {
    var test = state.cartGoods.find(f => f.name === food.name)
    food = {...food, count: ++test.count}
    state.value = !state.value   //  让DOM刷新页面,更新属性
  },
  decToCart(state, food) {
    var test = state.cartGoods.find(f => f.name === food.name)
    if (test.count > 0) {
      food = {...food, count: --test.count}
    }
    state.value = !state.value
  },
  valChang(state) {
    state.val = !state.val
  }
}
export default {
  state,
  getters,
  mutations
}
