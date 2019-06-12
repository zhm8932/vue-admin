<template>
  <div class="app-container">
    <p>点击: {{ count }} 次</p>
    <p>{{ count }}</p>
    <p>plusLocalCount---- {{ plusLocalCount }}</p>
    <el-button type="primary" @click="increment">+</el-button>
    <el-button type="primary" @click="decrement">-</el-button>
    <el-button @click="incrementIfOdd">Increment if odd</el-button>
    <el-button @click="incrementAsync">Increment async</el-button>
  </div>
</template>

<script>
  export default {
    name: 'Counter',
    data() {
      return {
        count: 0
      }
    },
    computed: {
      plusLocalCount() {
        return this.count + 100
      }
    },
    methods: {
      increment() {
        this.count += 1
      },
      decrement() {
        this.count -= 1
      },
      incrementIfOdd() {
        if ((this.count + 1) % 2 === 0) {
          this.count++
        }
      },
      incrementAsync() {
        setTimeout(() => {
          this.count++
        }, 2000)
      }
    }
  }
</script>

<style scoped>

</style>
