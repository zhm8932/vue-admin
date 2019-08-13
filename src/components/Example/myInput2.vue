<template>
  <div>
    <label>
      <!--<input :value="value" @input="handleInput">-->
      <input v-model="myValue" @input="handleInput">
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
    data() {
      return {
        myValue: this.value
      }
    },
    methods: {
      handleInput(e) {
        this.$emit('input', this.myValue)
        // this.$emit('input', e.target.value)
      }
    }
  }
</script>

<style scoped>

</style>
