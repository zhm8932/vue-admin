<template>
  <div>
    <p>input text</p>
    <label>
      <input
        type="text"
        :checked="checked"
        @input="change"
      >
    </label>
    <!--<input
        type="text"
        v-model="checked"
    >-->
  </div>
</template>
<!--v-on:change="$emit('change', $event.target.checked)"-->
<script>
  export default {
    name: 'MyInput',
    /**
     * https://blog.csdn.net/tangcc110/article/details/83624333
     * vue提供model属性让我们在组件内部就可以调用到其父级的事件，
     * 当前父级事件是固定写法event:"zhangwuji",这个prop:"ychecked"是
     * 将父级的cstChecked赋值给ychecked，然后再传给props:{ychecked:Number}
     * */
    /* model:{
      prop:'ychecked', // ychecked与父级cstChecked联动
      event:"zhangwuji" // 事件名随便定义，叫张无忌都可以，反正有了model后就可以触发父组件的事件了，zhangwujijt
    },
    props:{
      ychecked:Number // 父级cstChecked传进来会默认赋值给了model{prop:"ychecked"},ychecked再把值赋给props:{ ychcked:Number }
    }*/
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      // checked: Boolean
      checked: String
    },
    methods: {
      change(e) {
        console.log('value---:', e.target.checked)
        // this.$emit('change', e.target.checked)
        this.$emit('change', e.target.value)
      }
    }
  }
</script>

<style scoped>

</style>
