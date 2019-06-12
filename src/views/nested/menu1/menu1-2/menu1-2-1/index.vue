<template>
  <div style="padding:30px;">
    <div>
      <p>我是父亲, 对儿子说: {{ sthGiveChild }}</p>
      <p>我是父亲, 对2儿子说: {{ sthGiveChild2 }}</p>
      <Child :give="sthGiveChild" @returnBack="returnBack" />
      <Child2 v-model="sthGiveChild2" />
    </div>
    <el-alert :closable="false" title="menu 1-2-1" type="warning" />
  </div>
</template>

<script>
  import Child from './Child'
  import Child2 from './Child2'
  export default {
    name: 'Menu121',
    components: {
      Child,
      Child2
    },
    data() {
      return {
        sthGiveChild: '给你100块',
        sthGiveChild2: '给你100块'
      }
    },
    methods: {
      returnBack(val) {
        console.log('val-----:', val)
        this.sthGiveChild = val
      }
    }
  }
</script>
