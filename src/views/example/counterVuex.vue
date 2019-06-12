<template>
  <div class="app-container">
    <p>点击: {{ count }} 次</p>
    <p>{{ count }}</p>
    <p>plusLocalCount---- {{ plusLocalCount }}</p>
    <el-button type="primary" @click="increment">+</el-button>
    <el-button type="primary" @click="decrement">-</el-button>
    <el-button @click="incrementIfOdd">Increment if odd</el-button>
    <el-button @click="incrementAsync">Increment async</el-button>
    <el-button @click="plus(count)">plus</el-button>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    name: 'Counter',
    data() {
      return {
        localCount: 100
      }
    },
    computed: {
      ...mapState({
        count: state => {
          console.log('state---:', state)
          return state.counter.count
        },
        plusLocalCount(state) {
          return state.counter.count + this.localCount
        }
      }),
      plusLocalCount2() {
        return this.count + 100
      }
    },
    methods: {
      ...mapActions({
        increment: 'counter/increment'
        // increment: 'increment'
      }),
      ...mapActions('counter', {
        incrementIfOdd: 'incrementIfOdd'
      }),
      ...mapActions('counter', ['incrementAsync', 'plus']),
      decrement() {
        console.log('this.$store--:', this.$store)
        // this.$store.dispatch('decrement')
        this.$store.dispatch('counter/decrement')
      }
    }
  }
</script>

<style scoped>

</style>
