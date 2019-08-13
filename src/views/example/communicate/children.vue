<template>
  <div>
    <h2>$children / $parent</h2>
    <ComA />
    <el-button type="primary" @click="changeA">改变子组件的值</el-button>
  </div>
</template>

<!--
要注意边界情况，如在#app上拿$parent得到的是new Vue()的实例，
在这实例上再拿$parent得到的是undefined，而在最底层的子组件拿$children是个空数组。
也要注意得到$parent和$children的值不一样，$children 的值是数组，而$parent是个对象
-->

<script>
  import ComA from '../../../components/Example/comA'
  export default {
    name: 'Children',
    components: {ComA},
    data() {
      return {
        msg: 'Welcome'
      }
    },
    methods: {
      changeA() {
        console.log('this.$children---:', this.$children)
        this.$children[0].messageA = '11111111111'
      }
    }
  }
</script>

<style scoped>

</style>
