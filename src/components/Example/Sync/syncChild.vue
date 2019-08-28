<template>
  <div v-show="show">
    <p>默认初始值是{{ show }}，所以是显示的</p>
    <button @click="closeDiv">关闭</button>
  </div>
</template>

<script>
  export default {
    name: 'SyncChild',
    props: {
      show: {
        type: Boolean
      }
    },
    methods: {
      closeDiv() {
        this.$emit('handleClick', false)
      }
    }
  }
</script>

<style scoped>
 div {
   border: 1px solid #999999; margin:10px 0; padding: 10px;
 }
</style>
