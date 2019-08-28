<template>
  <div class="app-container">
    <h3>Demo</h3>
    <aside>
      <button @click="handleTogle">toggle</button>
      <syncChild :show="show" @handleClick="handleClick" />
    </aside>
    <aside>
      <button @click="handleTogle2">toggle</button>
      <syncChild2 :show2.sync="show2" />
    </aside>
    <aside>
      <!--//input实时改变wrd的值, 并且会实时改变box里的内容-->
      <input v-model="wrd" type="text" placeholder="请输入内容--父">
      <syncChild3 :word="wrd" @update:word="updateWord" />
    </aside>
    <aside>
      <!--//input实时改变wrd的值, 并且会实时改变box里的内容-->
      <input v-model="wrd2" type="text" placeholder="请输入内容--父">
      <syncChild4 :word.sync="wrd2" />
    </aside>
  </div>
</template>

<script>
  import syncChild from '../../components/Example/Sync/syncChild'
  import syncChild2 from '../../components/Example/Sync/syncChild2'
  import syncChild3 from '../../components/Example/Sync/syncChild3'
  import syncChild4 from '../../components/Example/Sync/syncChild4'
  export default {
    name: 'Sync',
    components: {syncChild, syncChild2, syncChild3, syncChild4},
    data() {
      return {
        show: true,
        show2: true,
        wrd: '',
        wrd2: ''
      }
    },
    methods: {
      handleTogle() {
        this.show = !this.show
      },
      handleTogle2() {
        this.show2 = !this.show2
      },
      handleClick(value) {
        console.log('value---:', value)
        this.show = value
      },
      updateWord(value) {
        console.log('value---:', value)
        this.wrd = value
      }
    }
  }
</script>

<style scoped>

</style>
