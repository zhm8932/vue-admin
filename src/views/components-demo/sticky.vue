<template>
  <div class="app-container">
    <sticky>
      <div class="sub-navbar">
        可以固定的导航
      </div>
    </sticky>
    <div class="components-container">
      <code>Sticky header, {{ $t('components.stickyTips') }}</code>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <sticky :sticky-top="200">
        <el-button type="primary">测试按钮</el-button>
      </sticky>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <el-button type="primary">placeholder</el-button>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
    </div>
  </div>
</template>

<script>
  import Sticky from '../../components/Sticky'
  export default {
    name: 'StickyDemo',
    components: { Sticky },
    props: {
      stickyTop: {
        type: Number,
        default: 0
      },
      zIndex: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        isSticky: false,
        active: false,
        position: '',
        height: '',
        width: ''
      }
    },
    mounted() {
      console.log('this.$el---：', this.$el)
      this.height = this.$el.getBoundingClientRect().height
      console.log('this.height---：', this.height)
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      sticky() {
        if (this.active) return
        this.position = 'fixed'
        this.isSticky = true
        this.active = true
      },
      reset() {
        this.position = ''
        this.isSticky = false
        this.active = false
      },
      handleReset() {
        if (!this.active) return
        this.reset()
      },
      handleScroll() {
        const offsetTop = this.$el.getBoundingClientRect().top
        const width = this.$el.getBoundingClientRect().width
        this.width = width || 'auto'
        console.log('offsetTop----------:', offsetTop, 'width--:', width, 'this.stickyTop---:', this.stickyTop)
        if (offsetTop < this.stickyTop) {
          this.sticky()
        }
        // this.handleReset()
      }
    }
  }
</script>

<style scoped>

</style>
