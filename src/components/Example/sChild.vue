<template>
  <div>
    <h2>我的子组件的标题</h2>
    <slot>
      <p>当父组件调用我时，没有传自定义内容时，我就会显示了，如果传了自定义内容，我就不显示了</p>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'SlotChild'
  }
</script>

<style scoped>

</style>
