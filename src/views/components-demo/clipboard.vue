<template>
  <div class="app-container">
    <h2>Clipboard</h2>
    <el-tabs :value="activeName">
      <el-tab-pane label="use clipboard  directly" name="directly">
        <el-input v-model="inputData" class="iw" />
        <el-button type="primary" @click="handleCopy($event, inputData)">Copy</el-button>
      </el-tab-pane>
      <el-tab-pane label="use clipboard by v-directive" name="v-directive">
        <el-input v-model="inputData" class="iw" />
        <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary">Copy</el-button>
      </el-tab-pane>
    </el-tabs>
    <el-card style="margin-top: 20px">
      <p>
        <el-input v-model="inputData" v-focus />
      </p>
      <p>
        <el-input v-model="mobile" v-check.native="{type:'mobile', val: mobile, success: mobileCheck}" placeholder="请输入手机号" />
      </p>
      <input v-model="mobile2" v-check="{type:'mobile', val: mobile2, success: mobileCheck}" placeholder="请输入手机号2" />
    </el-card>
  </div>
</template>

<script>
  import copy from '../../utils/clipboard'
  import clipboard from '../../directive/clipboard/index.js'
  import focus from '../../directive/focus'
  import check from '../../directive/check'
  export default {
    name: 'Clipboard',
    directives: { clipboard, focus, check},
    data() {
      return {
        activeName: 'directly',
        inputData: 'https://github.com/www',
        mobile: '',
        mobile2: ''
      }
    },
    methods: {
      handleChangeMobile(e) {
        console.log('handleChangeMobile---:', e)
      },
      mobileCheck(data) {
        console.log('mobileCheck-data---:', data)
        /* let value = data && data.match(/(^[1-9]\d{0,10})/g)
        value = value ? value[0] : null
        this.mobile = value*/
        // this.mobile = data
      },
      handleCopy(event, text) {
        copy(event, text)
      },
      clipboardSuccess() {
        this.$message({
          message: 'Copy successfully!!!',
          type: 'success',
          duration: 1500
        })
      }
    }
  }
</script>

<style scoped>
  .iw{width: 400px}
</style>
