<template>
  <div class="app-container">
    <ul>
      <li>
        <input v-model="form.xing">
      </li>
      <li>
        <input v-model="form.ming">
      </li>
    </ul>
    <p>姓名是: {{ fullName }}</p>
  </div>
</template>

<script>
  export default {
    name: 'Form2',
    data() {
      return {
        form: {
          xing: '',
          ming: ''
        }
      }
    },
    computed: {
      // 一个数据受多个数据影响
      fullName() {
        return this.form.xing + this.form.ming
      }
    },
    watch: {
      // 一个数据影响多个数据
      'form.xing': function(oldVal, newVal) {
        console.log('newVal--:', oldVal, newVal)
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
