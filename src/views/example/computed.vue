<template>
  <div class="app-container">
    <input v-model="message">
    <p>{{ reversedMessage }}</p>
    <aside>
      <h4>计算属性的用法1：</h4>
      <ul>
        <li v-for="(item, index) in list" :key="index" @click="addOne(item)">{{ item.name }}
          <span>--价格：{{ item.price }}</span>
          <span>--数量：{{ item.count }}</span>
        </li>
      </ul>
      <el-button @click="add">新增</el-button>
      <el-button @click="reduce">减少</el-button>
      <div>总价：{{ totalPrice }}</div>
    </aside>
    <aside>
      <h4>计算属性的用法2：</h4>
      <p>a的值是: {{ a }}</p>
      <p>b的值是: {{ b }}</p>
      <el-button type="primary" @click="handleChangeB">改变b的值</el-button>
    </aside>
    <aside>
      <h4>计算属性</h4>
      <el-input v-model="price" placeholder="请输入价格" />
      <el-input v-model="count" placeholder="请输入数量" />
      <p>总价为：{{ total }}</p>
    </aside>
  </div>
</template>

<script>
  export default {
    name: 'Computed',
    data() {
      return {
        price: '',
        count: '',
        message: 'Hello',
        list: [
          {name: '苹果', count: 3, price: 10},
          {name: '橘子', count: 1, price: 6},
          {name: '西瓜', count: 2, price: 5}
        ],
        a: 10
      }
    },
    computed: {
      // 计算属性一个数据受多个数据影响
      b: {
        get() {
          console.log('a------:', this.a)
          return this.a + 100
        },
        set(val) {
          console.log('b---val:', val)
          this.a = 20
        }
      },
      reversedMessage() {
        return this.message.split('').reverse().join('')
      },
      totalPrice() {
        return this.list.reduce((total, cur, index) => {
         console.log('total--:', total, 'cur--:', cur, 'index--:', index)
          return total + cur.count * cur.price
        }, 0)
      },
      total() {
        return this.price * this.count
      }
    },
    methods: {
      addOne(item) {
        console.log('item---:', item)
        item.count += 1
      },
      add() {
        this.list.push({
          name: '梨子',
          count: 2,
          price: 8
        })
      },
      reduce() {
        this.list.pop()
      },
      handleChangeB() {
        this.b = 20
      }
    }
  }
</script>

<style lang="scss" scoped>
  aside {
    padding: 10px;
    h4 {padding-bottom: 10px}
  }
</style>
