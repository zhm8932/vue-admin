<!--购物车-->

<template>
  <aside v-if="cartProducts.length">
    <h4>{{ title }}</h4>
    <ul>
      <li v-for="(item, index) in cartProducts" :key="index">
        <span>{{ item.title }} - {{ item.price }} * {{ item.count }}</span>
      </li>
    </ul>
    <h5 v-if="total">总价：{{total}} ￥</h5>
    <el-button type="warning" @click="clearCart" :disabled="!cartProducts.length">清空购物车</el-button>
  </aside>
</template>

<script>
  export default {
    name: 'ShoppingCart',
    props: {
      title: {
        type: String,
        default: ''
      },
      total: {
        type: Number,
        total: 0
      },
      cartProducts: {
        type: Array,
        default: function() {
          return []
        }
      },
      clearCart: {
        type: Function
      }
    }
  }
</script>

<style scoped>

</style>
