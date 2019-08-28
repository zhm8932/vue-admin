<template>
  <aside class="list">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <h4>{{ item.title }}</h4>
        <p>{{ item.price }}</p>
        <el-button :type="item.inventory ? 'primary' : 'info'" :disabled="!item.inventory" @click="addProductCart(item)">加入购物车</el-button>
      </li>
    </ul>
  </aside>
</template>

<script>
  export default {
    name: 'ProductList',
    props: {
      list: {
        type: Array,
        default: function() {
          return []
        }
      },
      addProductCart: {
        type: Function
      }
    }
  }
</script>

<style lang="scss" scoped>
  aside{overflow: hidden}
  .list{
    li{ width: 25%;float: left; border: 1px solid #f4f4f4; padding: 10px; box-sizing: border-box}
  }
</style>
