<template>
  <div>
    <p> childOne: {{ demo }}</p>
    <childTwo />
  </div>
</template>

<script>
  import childTwo from './childTwo'
  export default {
    name: 'ChildOne',
    components: {childTwo},
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    }
  }
</script>

<style scoped>

</style>
