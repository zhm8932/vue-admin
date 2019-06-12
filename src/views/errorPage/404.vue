<template>
  <div class="404">
    <h3>404</h3>
    <p>请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</p>
    <div class="bullshit">
      <router-link to="/" class="bullshit__return-home">
        返回首页
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Page404'
  }
</script>

<style scoped>
  .bullshit__return-home{
    display: block;
    float: left;
    width: 110px;
    height: 36px;
    background: #1482f0;
    border-radius: 100px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    line-height: 36px;
    cursor: pointer;
    -webkit-animation-delay: .3s;
    animation-delay: .3s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards
  }
</style>
