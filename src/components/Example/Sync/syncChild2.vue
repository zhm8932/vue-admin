<template>
  <div v-show="show2">
    <p>show2默认初始值是{{ show2 }}，所以是显示的</p>
    <button @click="closeDiv">关闭</button>
  </div>
</template>
<!--
语法糖
示例代码如下：
<comp :foo.sync="bar"></comp>
会被扩展为：
<comp :foo='bar' @update:foo='val => bar = val'></comp>
-->
<script>
  export default {
    name: 'SyncChild',
    props: {
      show2: {
        type: Boolean
      }
    },
    methods: {
      closeDiv() {
        this.$emit('update:show2', false) // 触发 input 事件，并传入新值
      }
    }
  }
</script>

<style scoped>
 div {
   border: 1px solid #999999; margin:10px 0; padding: 10px;
 }
</style>
