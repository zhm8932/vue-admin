<template>
  <div>
    <el-select :value="selectValue" placeholder="请选择!!!" @change="onChange">
      <!--<el-select v-model="selectValue" placeholder="请选择!!!">-->
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
  export default {
    name: 'MySelect',
    model: {
      prop: 'selectValue',
      event: 'handleChange'
    },
    props: {
      selectValue: {
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
      console.log('options----:', this.options)
      console.log('value----:', this.value)
    },
    methods: {
      onChange(e) {
        console.log(' e.target---:', e, this)
        this.$emit('handleChange', e)
        // this.$emit('input', e)
      }
    }
  }
</script>

<style scoped>

</style>
