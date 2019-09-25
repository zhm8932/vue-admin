<template>
  <div style="display: inline-block">
    <label class="radio-label"> {{ label }} </label>
    <el-select v-model="bookType" style="width: 120px">
      <el-option v-for="item in options" :key="item" :value="item" :label="item" />
    </el-select>
  </div>
</template>

<script>
  export default {
    name: 'BookTypeOption',
    props: {
      label: {
        type: String,
        default: 'Book Type:'
      },
      value: {
        type: String,
        default: ''
      },
      options: {
        type: Array,
        default() {
          return ['xlsx', 'csv', 'txt', 'xlml']
        }
      }
    },
    computed: {
      bookType: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>

<style scoped>
  .radio-label{ padding:  0 12px 0 30px}
</style>
