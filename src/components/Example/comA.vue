<template>
  <div>
    <p>{{ messageA }}</p>
    <p>获取父组件的值为: {{ parentVal }}</p>
  </div>
</template>

<script>
  export default {
    name: 'ComA',
    data() {
      return {
        messageA: 'this is old'
      }
    },
    computed: {
      parentVal() {
        console.log('this.$parent---:', this.$parent)
        return this.$parent.msg
      }
    }
  }
</script>

<style scoped>

</style>
