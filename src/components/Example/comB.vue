<template>
  <div>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
  export default {
    name: 'ComB',
    data() {
      return {
        msg: 'this is msg from comB'
      }
    },
    methods: {
      say() {
        console.log('Hello comB')
      }
    }
  }
</script>

<style scoped>

</style>
