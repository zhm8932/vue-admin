<template>
  <div class="app-container form">
    <h2>表单验证</h2>
    <ul>
      <li>
        <el-input v-model="form.name" placeholder="请输入姓名" @input="handleName"/>
        <p>{{ form.name }}</p>
      </li>
      <li>
        <el-input type="password" v-model="form.password" placeholder="请输入密码" @input="handlePassword"/>
        <p>{{ form.password }}</p>
      </li>
      <li>
        <el-input v-model="form.money" placeholder="请输入金额" @input="handleMoney" />
        <p>{{ form.money }}</p>
      </li>
      <li>
        <el-input v-model="form.mobile" placeholder="请输入手机号码" @input="handleMobile" />
        <p>{{ form.mobile }}</p>
      </li>
      <li>
        <el-input ref="bankCard" v-model="form.bankCard" placeholder="请输入银行卡号" @input="handleBankCard" />
        <!--<input ref="bankCard" v-model="form.bankCard" placeholder="请输入银行卡号" @input="handleBankCard" />-->
        <p>{{ form.bankCard }}</p>
      </li>
      <li>
        <el-input v-model="form.num" @input="handleNum" placeholder="只能输入数字" />
      </li>
      <li>
        <el-input v-model="form.letter" @input="handleLetter" placeholder="只能输入字母"/>
        <el-input v-model="form.num2" placeholder="只能输入数字和小数点" @input="handleNum2"/>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Form',
    data() {
      return {
        form: {
          money: '',
          mobile: '',
          bankCard: '',
          name: '',
          password: '',
          num: '',
          num2: '',
          letter: ''
        }
      }
    },
    methods: {
      handleName(val) {
        /*
        * 验证姓名
        * 验证姓名 最多9 位中文昵称
        * */
        let value = val.match(/[\u4e00-\u9fa5]{0,9}/g)
        console.log('value--:', value)
        value = value ? value[0] : null
        this.form.name = value
      },
      handlePassword(val) {
        /*
        * 验证密码
        * 只能是字母、数字和下划线，长度不限制
        * */
        this.form.password = val.replace(/\W/, '')
      },
      // 两位小数
      handleMoney(val) {
        /*
        * 验证最多保留两位小数（金额）
        * */
        console.log('val---:', val)
        this.form.money = val.match(/^\d*(\.?\d{0,2})/g)[0] || null
      },
      // 手机号首位不为零、限制输入11位
      // 以 1 开头，第二位数是 3/4/5/7/8 的 11 位手机号码
      handleMobile(val) {
        /*
        * 验证手机号
        * 以 1 开头，第二位数是 3/4/5/7/8 的 11 位手机号码 ^1[3,4,5,7,8,9]\d{9}$
        * 非0开头 11位数字
        * */
        console.log('val---:', val)
        let value = val.match(/(^[1-9]\d{0,10})/g)
        // let value = val.match(/(^[1][3,4,5,7,8,9]?\d{0,9})/g)
        value = value ? value[0] : null
        this.form.mobile = value
      },
      handleBankCard(cardNum) {
        // 获取input的dom对象，这里因为用的是element ui的input，所以需要这样拿到
        const input = this.$refs.bankCard.$el.getElementsByTagName('input')[0]
        console.log('this.$refs.bankCard.$el--:', this.$refs.bankCard, cardNum)
        // const input = this.$refs.bankCard.$el.getElementsByTagName('input')[0]
        // 获取当前光标的位置
        const cursorIndex = input.selectionStart
        console.log('cursorIndex--:', cursorIndex)
        // 字符串中光标之前-的个数
        const lineNumOfCursorLeft = (cardNum.slice(0, cursorIndex).match(/-/g) || []).length
        // 去掉所有-的字符串
        const noLine = cardNum.replace(/-/g, '')
        // 去除格式不对的字符并重新插入-的字符串
        const newCardNum = noLine.replace(/\D+/g, '').replace(/(\d{4})/g, '$1-').replace(/-$/, '')
        console.log('newCardNum---:', newCardNum)
        // 改后字符串中原光标之前-的个数
        const newLineNumOfCursorLeft = (newCardNum.slice(0, cursorIndex).match(/-/g) || []).length
        // 光标在改后字符串中应在的位置
        const newCursorIndex = cursorIndex + newLineNumOfCursorLeft - lineNumOfCursorLeft
        // 赋新值，nextTick保证-不能手动输入或删除，只能按照规则自动填入
        this.$nextTick(() => {
          console.log('newCardNum.replace(/-/)---:', newCardNum.replace(/-/g, ''), newCardNum)
          if (newCardNum.replace(/-/g, '').length <= 9) {
            this.form.bankCard = newCardNum
          } else {
            console.log('newCardNum.match---:', newCardNum.match(/(\d{0,4}-)/g))
            // this.form.bankCard = newCardNum.match(/(\d{0,4}-{0,5})/g).join('')
            this.form.bankCard = newCardNum.substr(0, 19 + (newCardNum.match(/-/g || []).length))
          }
        // 修正光标位置，nextTick保证在渲染新值后定位光标
          this.$nextTick(() => {
        // selectionStart、selectionEnd分别代表选择一段文本时的开头和结尾位置
            input.selectionStart = newCursorIndex
            input.selectionEnd = newCursorIndex
          })
        })

        // let value = val.replace(/\D*/g, '')
        // let value = val.match(/(^\d{0,19})/g, '')
        // value = value ? value[0] : null
        // const value = cardNum.replace(/D+/g, '').replace(/(d{4})/g, '$1-').replace(/-$/, '')
        // console.log('value---:', value)
        /* if (/^[\d]{4,}$/.test(value)) {
          console.log('格式化银行卡号')
          value = value.replace(/[\d]{4}, '$1 '/).replace(/[\s]+$/, ' ')
        }*/
        // this.form.bankCard = value
      },
      handleNum(val) {
        // 只能输入数字
        // this.form.num = val.replace(/\D/g, '')
        this.form.num = val.replace(/[^\d]/g, '')
      },
      handleLetter(val) {
        // 只能输入字母
        this.form.letter = val.replace(/[^a-zA-Z]/, '')
      },
      handleNum2(val) {
        this.form.num2 = val.replace(/[^\d]/g, '')
      }
    }
  }
</script>

<style lang="scss" scoped>
.form{
  h2{font-size: 1.6rem}
  li{width: 500px; padding-bottom: 10px}
}
</style>
