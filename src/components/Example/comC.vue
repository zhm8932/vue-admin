<template>
  <div>
    <p>姓名：{{ name }}</p>
    <comC2 age2="99" v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
  import comC2 from './comC2'
  export default {
    name: 'ComC',
    components: {comC2},
    props: {
      name: {
        type: String,
        default: ''
      }
    },
    mounted() {
      console.log('$attrs1--:', this.$attrs)
      console.log('$listeners1--:', this.$listeners)
    }
  }
</script>

<style scoped>

</style>
