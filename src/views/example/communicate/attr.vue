<template>
  <div>
    <h2>
      八 $attrs与 $listeners
    </h2>
    <comC
      class="attr-wrapper"
      :names="name"
      :age="age"
      :gender="gender"
      :height="height"
      title="程序员成长指北"
      @test1="test1"
      @test2="test2"
    />
  </div>
</template>

<!--
$attrs ;继承所有的父组件属性（除了prop传递的属性、class 和 style ）
inheritAttrs：默认值true,继承所有的父组件属性（除props的特定绑定）作为普通的HTML特性应用在子组件的根元素上，
如果你不希望组件的根元素继承特性设置inheritAttrs: false,但是class属性会继承

$listeners--属性，它是一个对象，里面包含了作用在这个组件上的所有监听器，
你就可以配合 v-on="$listeners" 将所有的事件监听器指向这个组件的某个特定的子元素。
-->
<script>
  import comC from '../../../components/Example/comC'
  export default {
    name: 'Attr',
    components: {comC},
    data() {
      return {
        name: 'zhang',
        age: '18',
        gender: '女',
        height: '168'
      }
    },
    methods: {
      test1() {
        console.log('test1 running...')
      },
      test2() {
        console.log('test2 running...')
      }
    }
  }
</script>

<style scoped>

</style>
