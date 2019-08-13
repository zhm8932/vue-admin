<template>
  <div>
    <h2>ref / refs</h2>
    <p>ref：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例，可以通过实例直接调用组件的方法或访问数据， 我们看一个ref 来访问组件的例子:</p>
    <comB ref="com" />
  </div>
</template>

<script>
  import comB from '../../../components/Example/comB'
  export default {
    name: 'Ref',
    components: {comB},
    mounted() {
      const com = this.$refs.com
      console.log('com:', com)
      console.log('msg:', com.msg)
      com.say()
    }
  }
</script>

<style scoped>

</style>
