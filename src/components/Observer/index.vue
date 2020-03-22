<template>
  <div class="observer" style="width: 100%"></div>
</template>

<script>
  export default {
    name: 'Observer',
    data() {
      return {
        observer: null
      }
    },
    mounted() {
      this.observer = new IntersectionObserver(([entry]) => {
        // isIntersecting 目标元素当前是否可见
        if (entry && entry.isIntersecting) {
          const scrollTop = window.pageYOffset
          console.log('scrollTop---:', scrollTop, this.$el.scrollTop, this.$el.offsetHeight)
          this.$emit('intersect', scrollTop)
          this.$nextTick(() => {
            console.log('渲染完成了吗')
            // window.scrollTo(0, scrollTop)
          })
        }
      })
      this.observer.observe(this.$el)
    }
  }
</script>

<style scoped>

</style>
