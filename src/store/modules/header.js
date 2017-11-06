import * as types from '../mutations-types'

const state = {
  index: 0,
  timer: 1,
  length: 0
}
const mutations = {
  [types.REMOVE_TRANSITION](state, {obj}) {
    obj.style.transition = 'none'
    obj.style.webkitTransition = 'none'
    state.index = 0
  },
  [types.ADD_TRANSITION](state, {obj}) {
    obj.style.transition = 'all 0.5s'
    obj.style.webkitTransition = 'all 0.5s'
  },
  [types.SET_TRANSLATE](state, {obj, x, y, z}) {
    obj.style.transform = `translate3D(${x}, ${y}, ${z})`
    obj.style.webkitTransform = `translate3D(${x}, ${y}, ${z})`
  },
  [types.RECEIVE_LENGTH](state, length) {
    state.length = length
  }
}
const actions = {
  playHeaderAnimate({commit, state}, obj) {
    clearInterval(state.timer)
    state.timer = setInterval(() => {
      state.index++
      commit(types.ADD_TRANSITION, {obj})
      let offsetY = -state.index * 16 + 'px'
      commit(types.SET_TRANSLATE, {obj, x: 0, y: offsetY, z: 0})
    }, 1500)
  }
}

export default {
  state,
  mutations,
  actions
}
