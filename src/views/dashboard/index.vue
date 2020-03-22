<template>
  <div class="dashboard-container">
    首页
    <el-card>
      <el-row>
        <el-col v-for="(info, index) in inforCardData" :key="index" :md="8" :lg="4" style="height: 120px; padding: 10px;">
          <InfoCard>
            <h4>{{ info.title }}</h4>
            <!--<p> {{ info.count }}</p>-->
            <CountUp :end="info.count" />
          </InfoCard>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="10" :offset="2">
          <ChartBar style="height: 300px;" :value="barData" title="每周用户活跃量" />
        </el-col>
        <el-col :span="10" :offset="2">
          <ChartPie style="height: 300px;" :value="pieData" title="用户访问来源" />
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <DemandLoad />
    </el-card>
  </div>
</template>

<script>
import {timeAgo} from '../../utils'
import {ChartBar, ChartPie} from '../../components/Charts'
import InfoCard from '../../components/InfoCard'
import CountUp from '../../components/CountUp'
import {getChartData} from '../../api/home'
export default {
  name: 'Dashboard',
  components: { ChartBar, ChartPie, InfoCard, CountUp,
    DemandLoad: () => import('../../components/DemandLoad')
  },
  data() {
    return {
      barDataNum: 0,
      barData: {},
      pieData: [],
      inforCardData: [
        { title: '新增用户', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
        { title: '累计点击', icon: 'md-locate', count: 232, color: '#19be6b' },
        { title: '新增问答', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        { title: '分享统计', icon: 'md-share', count: 657, color: '#ed3f14' },
        { title: '新增互动', icon: 'md-chatbubbles', count: 12, color: '#E46CBB' },
        { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
      ]
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
    this.uniqueArr()
    this.fromArr()
    this.getChartData()
  },
  methods: {
    uniqueArr() {
      // 数组去重
      const array = [1, 1, 2, 3, 5, 5, 1]
      // 将indeOf中的所在位置的索引与当前的索引比较，以确定是否重复
      // array.filter((arr, index) => array.indexOf(arr) === index)
      const newArr = array.filter((arr, index) => {
        console.log('arr:', arr, 'array.indexOf(arr)-:', array.indexOf(arr), 'index:', index)
        return array.indexOf(arr) === index
      })
      console.log('newArr-:', newArr) // [1, 2, 3, 5]
      // https://www.w3cplus.com/javascript/javascript-tips.html © w3cplus.com
    },
    fromArr() {
      // 不使用Array.map来映射数组值的方法
      const array = [
        { name: '大漠', email: 'w3cplus@hotmail.com' },
        { name: 'Airen', email: 'airen@gmail.com' }]
      const name = Array.from(array, ({ name }) => name)
      console.log('namename--:', name) // ["大漠", "Airen"]
    },
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
