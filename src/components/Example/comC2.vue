<template>
  <div>
    <p>ComC2: {{ $attrs }}</p>
  </div>
</template>

<script>
  export default {
    name: 'ComC2',
    mounted() {
      console.log('ComC2--$attrs---:', this.$attrs)
      console.log('$listeners2-----:', this.$listeners)
      this.$listeners.test2()
    }
  }
</script>

<style scoped>

</style>
