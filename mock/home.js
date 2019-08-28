export default [
  {
    url: '/home/chartData',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          barData: {
            Mon: 23253,
            Tue: 34235,
            Wed: 26321,
            Thu: 12340,
            Fri: 24643,
            Sat: 1322,
            Sun: 2324
          },
          pieData: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ],
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  }
]
