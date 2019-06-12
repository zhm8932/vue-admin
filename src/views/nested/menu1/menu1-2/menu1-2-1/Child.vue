<template>
  <div>
    <p>我是儿子，父亲对我说：{{ give }}</p>
    <el-button @click="returnBack">回应</el-button>
  </div>
</template>

<script>
  export default {
    name: 'Child',
    props: {
      give: {
        type: String,
        default: ''
      }
    },
    methods: {
      returnBack() {
        this.$emit('returnBack', '还你200元')
      }
    }
  }
</script>

<style scoped>

</style>
