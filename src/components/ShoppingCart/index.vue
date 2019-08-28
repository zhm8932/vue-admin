<!--购物车-->

<template>
  <aside v-if="cartProducts.length">
    <h4>{{ title }}</h4>
    <ul>
      <li v-for="(item, index) in cartProducts" :key="index">
        <span>{{ item.title }} - {{ item.price }} * {{ item.count }}</span>
        <slot :item="item" />
      </li>
    </ul>
    <h5 v-if="total">总价：{{ total }} ￥</h5>
    <el-button type="warning" :disabled="!cartProducts.length" @click="clearCartProduct">清空购物车</el-button>
  </aside>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'ShoppingCart',
    props: {
      title: {
        type: String,
        default: ''
      },
      total: {
        type: Number,
        default: 0
      },
      cartProducts: {
        type: Array,
        default: function() {
          return []
        }
      }
      /* clearCart: {
        type: Function
      }*/
    },
    methods: {
      ...mapActions('shoppingCart', {
        clearCart: 'clearCart'
      }),
      clearCartProduct() {
        console.log('this--------:', this)
        this.$emit('clearCart', 'hasClear', this.cartProducts)
        this.clearCart()
      }
    }
  }
</script>

<style scoped>

</style>
