<template>
  <div>
    <h2>provide/ inject</h2>
    <p>provide/ inject 是vue2.2.0新增的api, 简单来说就是父组件中通过provide来提供变量, 然后再子组件中通过inject来注入变量。</p>
    <p>注意: 这里不论子组件嵌套有多深, 只要调用了inject 那么就可以注入provide中的数据，而不局限于只能从当前父组件的props属性中回去数据</p>
    <childOne />
  </div>
</template>

<script>
  import childOne from '../../../components/Example/childOne'
  export default {
    name: 'Provider',
    /* provide: {
      for: 'this is a demo',
      name: '张三'
    }, */
    provide() {
      return {
        for: 'this is a demo',
        name: '张三',
        list: this.list
      }
    },
    components: {childOne},
    data() {
      return {
        list: [1, 3, 5, 9]
      }
    }
  }
</script>

<style scoped>

</style>
