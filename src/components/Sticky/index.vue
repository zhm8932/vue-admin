<template>
  <div :style="{height: height+'px' }">
    <div
      :class="className"
      :style="{top: (isSticky ? stickyTop + 'px': ''), position: position, width:width, 'z-index': zIndex}"
    >
      <slot>sticky</slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sticky',
    props: {
      stickyTop: {
        type: Number,
        default: 0
      },
      zIndex: {
        type: Number,
        default: 1
      },
      className: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        active: false,
        position: '',
        width: undefined,
        height: undefined,
        isSticky: false
      }
    },
    mounted() {
      this.height = this.$el.getBoundingClientRect().height
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll() {
        const $el = this.$el.getBoundingClientRect()
        this.width = $el.width || 'auto'
        const offsetTop = $el.top
        console.log('el---------:', this.$el, $el, 'offsetTop---:', offsetTop)
        if (offsetTop < this.stickyTop) {
          this.sticky()
          return
        }
        this.handleReset()
      },
      handleReset() {
        if (!this.active) {
          return
        }
        this.reset()
      },
      sticky() {
        if (this.active) {
          return
        }
        this.position = 'fixed'
        this.width = this.width + 'px'
        this.isSticky = true
        this.active = true
      },
      reset() {
        this.position = ''
        this.width = 'auto'
        this.active = false
        this.isSticky = false
      }
    }
  }
</script>

<style scoped>

</style>
