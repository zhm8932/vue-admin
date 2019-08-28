<template>
  <input type="checkbox" :value="value">
</template>

<script>
  export default {
    name: 'MyCheckBox2',
    props: {
      value: String,
      checked: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style scoped>

</style>
