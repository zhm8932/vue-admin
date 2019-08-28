<template>
  <div>
    <input v-model="str" type="text" placeholder="请输入内容---子">
    <!--//word是父元素传过来的-->
    <h3>{{ word }}</h3>
  </div>
</template>

<script>
  export default {
    name: 'SyncChild',
    props: {
      word: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        str: ''
      }
    },
    watch: {
      str(newValue, oldValue) {
        console.log('newValue-:', newValue, 'oldValue:', oldValue)
        this.$emit('update:word', newValue)
      }
    }
  }
</script>

<style scoped>
 div {
   border: 1px solid #999999; margin:10px 0; padding: 10px;
 }
</style>
