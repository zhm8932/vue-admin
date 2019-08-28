<template>
  <div class="dashboard-container">
    首页
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10" :offset="2">
          <ChartBar style="height: 300px;" :value="barData" title="每周用户活跃量" />
        </el-col>
        <el-col :span="10" :offset="2">
          <ChartPie style="height: 300px;" :value="pieData" title="用户访问来源"></ChartPie>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {timeAgo} from '../../utils'
import {ChartBar, ChartPie} from '../../components/Charts'
import {getChartData} from '../../api/home'
export default {
  name: 'Dashboard',
  components: { ChartBar, ChartPie },
  data() {
    return {
      barDataNum: 0,
      barData: {},
      pieData: []
    /*  barData: {
        Mon: 23253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 2324
      },*/
    /*  pieData: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ]*/
    }
  },
  created() {
    timeAgo('2018-11-12 11:15:33', '2018-11-12 11:20:13')
    timeAgo('2018-11-12 11:20:33', '2018-11-12 11:20:13')
    timeAgo('2018-11-12 11:20:33', '2018-11-12 11:21:13')
    timeAgo('2018-11-12', '2018-11-10')
    timeAgo(new Date('2019-1-1'), '2018-11-10')
    timeAgo(new Date('2019-4-1'), '2018-11-10')
    timeAgo(new Date('2029-4-1'), '2018-11-10')
    timeAgo(new Date('2019-4-1'), '2028-11-10')
    timeAgo((new Date('2019-1-1 0:0:50')).toISOString(), '2018-11-10')
    timeAgo('2016-1-1 1:13:01', '2016-1-1')
    timeAgo((new Date('2016-1-1 0:0:50')).toISOString(), +new Date('2016-1-1'))
    timeAgo('2016-1-1 0:0:50', '2016-1-1 0:0:50')
  },
  mounted() {
    this.getChartData()
  },
  methods: {
    async getChartData() {
      const result = await getChartData()
      console.log('result---:', result)
      const { barData, pieData } = result.data
      // this.pieData = Object.assign([], this.pieData, pieData)
      this.pieData = pieData
      this.barData = barData
      // this.barData = Object.assign({}, this.barData, barData)

      console.log('barData----:', barData, pieData)
    }
  }
}
</script>

<style scoped>

</style>
