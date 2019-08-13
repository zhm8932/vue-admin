<template>
  <div>
    <p v-for="(item, index) in list" :key="index">
      <slot name="cont" :$index="index" />
    </p>
  </div>
</template>

<script>
  export default {
    name: 'SlotChild3',
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>
