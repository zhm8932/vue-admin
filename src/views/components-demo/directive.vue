<template>
  <div class="app-container">
    <h2>自定义指令check</h2>
    <el-card>
      <el-col :span="6">
        <p>
          <el-input v-model="name" v-check="{type:'name', val: name, success: mobileCheck}" placeholder="请输入姓名" />
        </p>
        <p>
          <el-input v-model="mobile" v-check="{type:'mobile', val: mobile, success: mobileCheck}" placeholder="请输入手机号" />
        </p>
        <p>
          <el-input v-model="password" v-check="{type:'password', val: password}" placeholder="请输入密码" />
        </p>
        <p>
          <el-input v-model="money" v-check="{type:'money', val: money}" placeholder="请输入金额" />
        </p>
        <p>
          <el-input v-model="num" v-check="{type:'int', val: num}" placeholder="请输入整数" />
        </p>
        <p>
          <el-input v-model="letter" v-check="{type:'letter', val: letter}" placeholder="请输入字母" />
        </p>
        <p>
          <el-input v-model="bankcard" v-check="{type:'bankcard', val: bankcard}" placeholder="请输入银行卡" />
          <!--<el-input v-model="bankcard" placeholder="请输入银行卡" />-->
        </p>
      </el-col>
    </el-card>
  </div>
</template>

<script>
  import check from '../../directive/check'
  export default {
    name: 'Directive',
    directives: {check},
    data() {
      return {
        name: '',
        mobile: '',
        money: '',
        num: '',
        letter: '',
        bankcard: '',
        password: ''
      }
    },
    watch: {
      bankcard(val) {
        console.log('bankcard---:', this.bankcard, val)
        const bankcard = val.replace(/\D/g, '').replace(/....(?!$)/g, '$& ')
        this.bankcard = bankcard.substr(0, 19 + (bankcard.match(/\s/g) || []).length)
      }
    },
    methods: {
      mobileCheck(data) {
        console.log('mobileCheck-data--------:', data)
      }
    }
  }
</script>

<style scoped>

</style>
