<template>
  <div class="app-container">
    <el-card>
      <h4 slot="header">导出EXCEL</h4>
      <el-row>
        <el-button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="exportExcel">导出</el-button>
      </el-row>
      <el-row>
        <el-table :data="tableData">
          <el-table-column v-for="item in tableHeader" :key="item.key" :prop="item.key" :label="item.value" />
        </el-table>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import * as excel from '../../utils/excel'
  export default {
    name: 'UploadExcel',
    data() {
      return {
        uploadLoading: false,
        tableHeader: [
          {key: 'date', value: '日期'},
          {key: 'name', value: '姓名'},
          {key: 'address', value: '地址'}
        ],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 路'
        }]
      }
    },
    methods: {
      // 导出文件为excel
      exportExcel() {
        if (this.tableData.length) {
           const params = {
            // title: ['一级分类', '二级分类', '三级分类'],
            title: this.tableHeader.map(item => item.value),
            key: this.tableHeader.map(item => item.key),
            data: this.tableData,
            autoWidth: true,
            filename: '用户信息列表吧'
          }
          excel.exportArrayToExcel(params)
        } else {
          this.$message.warning('表格数据不能为空')
        }
      },
      handleUploadFile() {

      }
    }
  }
</script>

<style scoped>

</style>
