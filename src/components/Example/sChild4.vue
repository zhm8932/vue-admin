<template>
  <div>
    <slot v-for="(item,index) in items" :index="index" :title="item.name" :author="item.author">
      <div :key="index">{{ index+1 }}、《{{ item.name }}》{{ item.author }}</div>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'SlotChild4',
    props: {
      items: {
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
