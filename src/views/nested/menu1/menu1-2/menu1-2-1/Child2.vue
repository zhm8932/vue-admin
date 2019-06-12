<template>
  <div>
    <p>我是儿子，父亲对我说：{{ giveModel }}</p>
    <el-button @click="returnBack">回应</el-button>
  </div>
</template>

<script>
  export default {
    name: 'Child',
     model: {
      prop: 'giveModel'
      // event: 'returnBack'
    },
    props: {
      giveModel: {
        type: String,
        default: ''
      }
    },
    methods: {
      returnBack() {
        this.$emit('input', '还你2000元')
      }
    }
  }
</script>

<style scoped>

</style>
