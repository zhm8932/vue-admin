<template>
  <div class="info-card-wrapper">
    <div class="left" :style="{width: leftWidth, background: color}">
      <i :class="'el-icon el-icon-'+icon"></i>
    </div>
    <div class="right" :style="{width: rightWidth}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'InfoCard',
    props: {
      icon: {
        type: String,
        default: 'info'
      },
      left: {
        type: Number,
        default: 36
      },
      color: {
        type: String,
        default: '#2d8cf0'
      }
    },
    computed: {
      leftWidth() {
        return `${this.left}%`
      },
      rightWidth() {
        return `${100 - this.left}%`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .size{
    width: 100%;
    height: 100%;
  }
  .middle-center{
    display: table-cell; vertical-align: middle;
  }
  .info-card-wrapper{
    @extend .size;
    border: 1px solid #e6ebf5; border-radius: 4px;
    .content{position: relative}
    .left{
      float: left;
      height: 100%;
      display: table;
      text-align: center;
      .el-icon{color: #fff; font-size: 24px; @extend .middle-center;}
    }
    .right{
      float: left; height: 100%; text-align: center;
    }
  }
</style>
