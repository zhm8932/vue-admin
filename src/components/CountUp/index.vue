<template>
  <div class="count-to-wrapper">
    <slot name="left" />
    <p>
      <span :id="counterId"></span>
    </p>
    <slot name="right" />
  </div>
</template>

<script>
  import Countup from 'countup'
  export default {
    name: 'CountUp',
    props: {
      init: {
        type: Number,
        default: 0
      },
      /**
       * @description 是否简化显示，设为true后会使用unit单位来做相关省略
       */
      simplify: {
        type: Boolean,
        default: false
      },
      startVal: {
        type: Number,
        default: 0
      },
      /**
       * @description 结束值，即动画结束后显示的数值
       */
      end: {
        type: Number,
        required: true
      },
      /**
       * @description 保留几位小数
       */
      decimals: {
        type: Number,
        default: 0
      },
      /**
       * @description 分隔整数和小数的符号，默认是小数点
       */
      decimal: {
        type: String,
        default: '.'
      },
      /**
       * @description 动画持续的时间，单位是秒
       */
      duration: {
        type: Number,
        default: 2
      },
      /**
       * @description 动画延迟开始的时间，单位是秒
       */
      delay: {
        type: Number,
        default: 0
      },
      /**
       * @description 是否禁用easing动画效果
       */
      uneasing: {
        type: Boolean,
        default: false
      },
      /**
       * @description 是否使用分组，分组后每三位会用一个符号分隔
       */
      usegroup: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        counter: null,
        unitText: ''
      }
    },
    computed: {
      counterId() {
        return `count_to_${this._uid}`
      }
    },
    created() {
      this.$nextTick(() => {
        const endVal = this.getValue(this.end)
        this.counter = new Countup(this.counterId, this.startVal, endVal, this.decimals, this.duration, {
          useEasing: !this.uneasing,
          useGrouping: this.useGroup,
          separator: this.separator,
          decimal: this.decimal
        })
        setTimeout(() => {
          if (!this.counter.error) this.counter.start()
        }, this.delay)
      })
    },
    methods: {
      getHandleVal(val, len) {
        return {
          endVal: parseInt(val / Math.pow(10, this.unit[len - 1][0])),
          unitText: this.unit[len - 1][1]
        }
      },
      transformValue(val) {
        const len = this.unit.length
        let res = {
          endVal: 0,
          unitText: ''
        }
        if (val < Math.pow(10, this.unit[0][0])) res.endVal = val
        else {
          for (let i = 1; i < len; i++) {
            if (val >= Math.pow(10, this.unit[i - 1][0]) && val < Math.pow(10, this.unit[i][0])) res = this.getHandleVal(val, i)
          }
        }
        if (val > Math.pow(10, this.unit[len - 1][0])) res = this.getHandleVal(val, len)
        return res
      },
      getValue(val) {
        let res = 0
        if (this.simplify) {
          const { endVal, unitText } = this.transformValue(val)
          this.unitText = unitText
          res = endVal
        } else {
          res = val
        }
        return res
      }
    }
  }
</script>

<style scoped>

</style>
