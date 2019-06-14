<template>
  <div class="app-container">
    <ProductList :list="list" :add-product-cart="addProductCart" />
    <ShoppingCart title="我的购物车" :total="total" :cart-products="cartProducts" @clearCart="clearCart">
      <template slot-scope="scope">
        <p>已选商品数量 {{ scope.item.count }}</p>
      </template>
    </ShoppingCart>
  </div>
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import ShoppingCart from '../../components/ShoppingCart'
  import ProductList from '../../components/ProductList'
  export default {
    name: 'Shopping',
    components: { ProductList, ShoppingCart },
    computed: {
      ...mapState({
        list: state => state.products.list
      }),
      ...mapGetters('shoppingCart', [
        'cartProducts',
        'total'
      ])
    },
    mounted() {
      console.log('this--$store--:', this.cartProducts, this.$store)
      this.getProductsList()
    },
    methods: {
      // ...mapActions('shoppingCart', ['addProductCart', 'clearCart']),
      ...mapActions('shoppingCart', ['addProductCart']),
      ...mapActions('products', ['getProductsList']),
      clearCart(data, data2) {
        console.log('通知父组件购物车已清空----------------:', data, data2)
        this.getProductsList()
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
