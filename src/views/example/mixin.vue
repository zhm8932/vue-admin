<template>
  <div class="app-container">
    <h3>mixin</h3>
  </div>
</template>

<script>
  // 定义一个混入对象
  const myMixin = {
    created: function() {
      this.hello()
    },
    methods: {
      hello: function() {
        console.log('hello from mixin!')
      }
    }
  }
  // import myMxin from '../../components/Mixins/myMixin'
  // console.log('myMxin--:', myMxin)
  export default {
    name: 'Mixin',
    mixins: [myMixin]
  }
</script>

<style scoped>

</style>
