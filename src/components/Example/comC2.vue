<template>
  <div>
    <p>ComC2: {{ $attrs.age }}</p>
  </div>
</template>

<script>
  export default {
    name: 'ComC2',
    inheritAttrs: false,
    mounted() {
      console.log('ComC2--$attrs---:', this.$attrs)
      console.log('$listeners2-----:', this.$listeners)
      this.$listeners.test2()
    }
  }
</script>

<style scoped>

</style>
