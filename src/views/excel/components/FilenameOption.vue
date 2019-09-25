<template>
  <div style="display: inline-block">
    <label>Filename:</label>
    <el-input v-model="filename" :placeholder="placeholder" style="width: 300px" />
  </div>
</template>

<script>
  export default {
    name: 'FilenameOption',
    props: {
       value: {
        type: String,
        default: ''
      },
      placeholder: {
         type: String,
         default: ''
      }
    },
    computed: {
      filename: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    },
    created() {
      console.log('value--:', this.value)
    }
  }
</script>

<style scoped>

</style>
