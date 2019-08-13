<template>
  <div>
    <label>
      <input :value="value" @input="handleInput">
      <!--<input v-model="value">-->
    </label>
  </div>
</template>

<script>
  export default {
    name: 'MyInput',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    methods: {
      handleInput(e) {
        this.$emit('input', e.target.value)
      }
    }
  }
</script>

<style scoped>

</style>
