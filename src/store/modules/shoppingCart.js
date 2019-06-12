import {getProductsList} from '../../api/products'
const state = {
  items: [] // 缓存购物车商品的id和count
}

const getters = {
  // 根节点状态则  根据items 和 products.list 获取购物车
  // 购物车商品
  cartProducts: (state, getters, rootState) => {
    console.log('state:', state, 'getters:', getters, 'rootState:', rootState)
    return state.items.map(item => {
      const cartItem = rootState.products.list.find(product => product.id === item.id)
      console.log('cartItem----:', item.id, cartItem)
      return {
        id: item.id,
        count: item.count,
        price: cartItem.price,
        title: cartItem.title
      }
    })
  },
  /*
  * 你可以使用 getter 的第四个参数来调用 `rootGetters`
  * */
  // 总价
  total: (state, getters, rootState, rootGetters) => {
    console.log('etters.cartProducts-----:', getters.cartProducts, 'rootGetters---:', rootGetters)
    return getters.cartProducts.reduce((total, item) => {
       return total + item.price * item.count
    }, 0)
  }
}
const mutations = {
  getProductsList(state, data) {
    state.list = data
  },
  addToCart: (state, item) => {
    console.log('item---:', item)
    state.items.push({
      id: item.id,
      count: 1
    })
  },
  updateToCart: (state, payload) => {
    console.log('payload---:', payload)
    const cartItem = state.items.find(item => item.id === payload.id)
    console.log('cartItem---:', cartItem)
    cartItem.count++
  },
  setCartItems: (state, {item}) => {
   state.items = item
  }
}

const actions = {
  getProductsList: context => {
    getProductsList().then(res => {
      context.commit('getProductsList', res.data)
    })
  },
  // 加入购物车
  addProductCart: (context, product) => {
    console.log('context---------:', context)
    if (product.inventory > 0) {
      const {id} = product
      const cartItem = context.state.items.find(item => item.id === id)
      console.log('cartItem---:', cartItem)
      if (!cartItem) {
        context.commit('addToCart', {id})
      } else {
        context.commit('updateToCart', {id})
      }
      // 若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可
      context.commit('products/decrementProductInventory', { id }, {root: true})
    }
  },
  // 清空购物车
  clearCart: (context) => {
    context.commit('setCartItems', {item: []})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
