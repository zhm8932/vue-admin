import {getProductsList} from '../../api/products'
const state = {
  list: []
}

const getters = {

}

const mutations = {
  // 商品列表
  getProductsList(state, data) {
    state.list = data
  },
  // 更新库存
  decrementProductInventory: (state, { id }) => {
    const product = state.list.find(item => item.id === id)
    product.inventory--
  }
}

const actions = {
  getProductsList(context) {
    getProductsList().then((res) => {
      context.commit('getProductsList', res.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

