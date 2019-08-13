<template>
  <div>
    <p> childTwo: {{ demo }}</p>
    <p>{{ name }}</p>
    <p>{{ list }}</p>
  </div>
</template>

<script>
  export default {
    name: 'ChildOne',
    inject: ['for', 'name', 'list'],
    data() {
      return {
        demo: this.for,
        name: this.name,
        list: this.list
      }
    }
  }
</script>

<style scoped>

</style>
