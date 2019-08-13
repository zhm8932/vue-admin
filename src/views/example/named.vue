<template>
  <div class="app-container">
    <h2>命名视图!</h2>
    <router-view class="view header" />
    <div class="container">
      <router-view class="view left" name="left" />
      <router-view class="view right" name="right" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Named'
  }
</script>

<style scoped>
  .header {
     background-color: orange;
     height: 80px;
  }
  .container {
    width:100%;
    display: flex;
    height: 400px;
    padding: 0;
    margin: 0;
  }
  .left {
    background-color: pink;
    flex: 2;
  }
  .right {
    background-color: bisque;
    flex: 8;
  }
</style>
