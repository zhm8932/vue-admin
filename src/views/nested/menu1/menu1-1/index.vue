<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu 1-1" type="success">
      <router-view />
    </el-alert>
    <ul>
      <li v-for="(item, index) in items" :key="index" @click="updateOne(index)">{{ index }}----{{ item }}</li>
    </ul>
    <el-button type="primary" @click="addOne">新增</el-button>
    <el-button type="danger" @click="deleteOne">删除</el-button>
    <el-button type="primary" @click="unshiftOne">前新增</el-button>
    <el-button type="danger" @click="shiftOne">后删除</el-button>
    <el-button type="danger" @click="updateOne">修改某个值</el-button>

    <ul>
      <li v-for="(item, key, index) of obj" :key="index">{{ key }}----{{ index }}-----{{ item }}</li>
    </ul>
    <p>a的值: {{ form.a }} <el-button @click="changeA">改变A</el-button></p>
    <p>b的值: {{ form.b }} <el-button @click="changeB">改变B</el-button></p>
    <p v-for="(item, index) in trees" :key="index" @click="changeMe(index)">{{ item }}</p>
    <div @click="changeObj">{{ obj }}</div>
    <el-input type="text" v-model="form.str" />
    <p>{{ form.str }}</p>
    <p>{{ reversedStr}}</p>
    <el-input v-model="form.b" @input="handleChange" placeholder="只能输入限定位数的整数、首位不为零"/>
    <p>{{ form.b }}</p>
    <el-input v-model="form.c" @input="handleChange2" placeholder="只能输入限定保留2位小数、首位不为零"/>
    <p>{{ form.c }}</p>
  </div>
</template>

<script>
  export default {
    name: 'Menu1',
    data() {
      return {
        items: [
          { message: 'Foo' },
          { message: 'Bar' }
         // 11, 22, 33, 44
        ],
        obj: {
          name: '张思',
          age: 38,
          phone: 13566667777
        },
        form: {
          str: '',
          a: '', // 初始化
          b: ''
        },
        trees: ['aaaa', 'bbbbb', 'ccccc']
      }
    },
    computed: {
      reversedStr() {
        return this.form.str.split('').reverse().join('')
      }
    },
    methods: {
      handleChange(e) {
        let vaule = e.match(/^([1-9]\d{0,4})/g)
        console.log('e---:', e, vaule)
        // this.form.b = e.replace(/[^\d]/g, '')
        // this.form.b = (e.match(/^\d*(\.?\d{0,2})/g)[0]) || null
        vaule = vaule ? vaule[0] : null
        this.form.b = vaule
      },
      handleChange2(e) {
        let vaule = e.match(/^(\.?[1-9]\d*\d{0,2})/g)
        console.log('e---:', e, vaule)
        vaule = vaule ? vaule[0] : null
        this.form.c = vaule
      },
      changeObj() {
        // this.obj.age = 111
        // this.obj.id = 99
        this.obj = {...this.obj, ...{id: 999}}
      },
      updateOne(idx) {
        const index = typeof idx === 'number' ? idx : this.items.length - 1
        console.log('idx----:', index)
        // this.items[index] = '修改后的值' + this.items.length
        this.items[index].message = '修改后的值' + this.items.length
        // this.items.splice(this.items.length - 1, 1, {message: '改变一个值'})
      },
      addOne() {
        this.items.push({message: 'Cool'})
      },
      shiftOne() {
        this.items.shift()
      },
      deleteOne() {
        this.items.pop()
      },
      unshiftOne() {
        this.items.unshift({message: 'Deal'})
      },
      changeA() {
        this.form.a = 1111
      },
      changeB() {
        // this.form.b = 'bbbbbbbbbbb' // 无效
        // this.$set(this.form, 'b', 'bbbbb' + Math.floor(Math.random() * 1000)) // 动态添加
        this.form = Object.assign({}, this.form, {b: 99999, c: 'cccc', d: 'dddddd'})
      },
      changeMe(idx) {
        console.log('index---:', idx)
        // this.trees[idx] = idx * 10000
        this.trees.splice(idx, 1, idx * 10000)
        // this.$set(this.trees, idx, idx * 10000)
      }
    }
  }
</script>

<style lang="scss" scoped>
    ul{
      li { display: inline-block; border: 1px solid #eeeeee; list-style: none; padding:0 1rem;line-height: 30px;margin-right: 10px}
    }
</style>
