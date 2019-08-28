<template>
  <div :value="value" ref="dom" class="charts chart-bar" style="height: 300px"></div>
</template>

<script>
  import echarts from 'echarts'
  import tdTheme from './theme'
  echarts.registerTheme('tdTheme', tdTheme)
  export default {
    name: 'Bar',
    props: {
      value: Object,
      text: String,
      subtext: String,
      num: Number
    },
    data() {
      return {
        dom: null
      }
    },
    mounted() {
      console.log('value---bar-mounted:', JSON.stringify(this.value))
      console.log('num-------------------bar:', this.num)
      console.count('bar')
      this.$nextTick(() => {
        this.createChart()
        window.addEventListener('resize', this.resize)
      })
    },
    beforeUpdate() {
      console.log('beforeUpdate')
    },
    updated() {
      console.count('updated')
      console.log('value---bar-updated:', JSON.stringify(this.value))
      this.createChart()
    },
    methods: {
      resize() {
        this.dom.resize()
      },
      createChart() {
        const xAxisData = Object.keys(this.value)
        const seriesData = Object.values(this.value)
        const option = {
          title: {
            text: this.text,
            subtext: this.subtext,
            x: 'center'
          },
          xAxis: {
            type: 'category',
            data: xAxisData
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: seriesData,
            type: 'bar'
          }]
        }
        this.dom = echarts.init(this.$refs.dom, 'tdTheme')
        this.dom.setOption(option)
      }
    }
  }
</script>

<style scoped>
</style>
