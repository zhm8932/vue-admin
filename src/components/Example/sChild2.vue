<template>
  <div>
    <header>
      <slot name="header">默认的头部</slot>
    </header>
    <main>
      <slot>默认的main</slot>
    </main>
    <footer>
      <slot name="footer">
        <p>默认的footer</p>
      </slot>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'SlotChild2'
  }
</script>

<style scoped>

</style>
