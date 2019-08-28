<template>
  <div class="app-container">
    <aside>
      <h4>侦听器</h4>
      <el-input v-model="demo.name" />
      <p>{{ value }}</p>
    </aside>
    <aside>
      <h4>侦听器2</h4>
      <el-input v-model="childrens.name" />
      <label>lastName</label><el-input v-model="lastName" />
    </aside>

  </div>
</template>

<script>
  export default {
    name: 'Watch',
    data() {
      return {
        demo: {
          name: ''
        },
        value: '',
        childrens: {
          name: '小强',
          age: 20,
          sex: '男'
        },
        tdArray: ['1', '2'],
        lastName: '张三'
      }
    },
    watch: {
      'demo.name'() {
        this.value = this.demo.name
      },
      lastName: function(val, oldval) {
        console.log('watch-lastName：', this.lastName, '-----val----:', val, '-----oldval---:', oldval)
      },
      'childrens.name': function(val) { // 键路径必须加上引号
        console.log('childrens.name---:', val)
      },
      // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
      childrens: {
        handler: function(val, oldVal) {
          console.log('handler---:', val, oldVal, val.name, oldVal.name)
        },
        // immediate: true,
        deep: true // 深度监视，当对象中的属性发生变化时会被监控

      }
    }
  }
</script>

<style lang="scss" scoped>
  aside {
    padding: 10px;
    h4 {padding-bottom: 10px}
  }
</style>
