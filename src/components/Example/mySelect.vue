<template>
  <div>
    <!--<select :value="selectValue" @change="handleChange">-->
    <select :value="value" @change="handleChange">
      <option v-for="item in options" :key="item.value" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'MySelect',
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
    },
    methods: {
      handleChange(e) {
        console.log(' e.target---:', e.target.value)
        this.$emit('input', e.target.value)
      }
    }
  }
</script>

<style scoped>

</style>
