<template>
  <div>
    <!--<el-select :value="selectValue2" @change="handleChange" placeholder="请选择!">-->
    <el-select :value="value" @change="handleChange" placeholder="请选择!">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<!--默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event。-->

<script>
  export default {
    name: 'MySelect',
   /* model: {
      prop: 'selectValue'
    },*/
    props: {
      selectValue: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      },
      options: {
        type: Array,
        default() {
          return []
        }
      }
    },
    created() {
      console.log('options---:', this.options)
      console.log('value---:', this.value)
    },
    methods: {
      handleChange(e) {
        console.log(' e.target---:', e, this)
        this.$emit('input', e)
      }
    }
  }
</script>

<style scoped>

</style>
