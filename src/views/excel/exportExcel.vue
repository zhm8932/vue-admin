<template>
  <div class="app-container">
    <el-card>
      <h4 slot="header">导出EXCEL</h4>
      <el-row>
        <ul class="formSearch">
          <!--<li>
            <label>Filename:</label>
            <el-input v-model="filename" style="width: 300px" />
          </li>-->
          <FilenameOption v-model="filename" :placeholder="placeholder" />
          <!--<li>
            <label class="radio-label">auto-width</label>
            <el-radio-group v-model="autoWidth">
              <el-radio :label="true" border> True</el-radio>
              <el-radio :label="false" border> False</el-radio>
            </el-radio-group>
          </li>-->
          <AutoWidthOption v-model="autoWidth"/>
          <BookTypeOption v-model="bookType" :options="bookOptions"/>
          <!--<li>
            <label class="radio-label">Book Type:</label>
            &lt;!&ndash;<el-input v-model="bookType" />&ndash;&gt;
            <el-select v-model="bookType" style="width: 120px">
              <el-option v-for="item in bookOptions" :key="item" :value="item" :label="item"></el-option>
            </el-select>
          </li>-->
        </ul>
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
  import FilenameOption from './components/FilenameOption'
  import BookTypeOption from './components/BookTypeOption'
  import AutoWidthOption from './components/AutoWidthOption'
  export default {
    name: 'UploadExcel',
    components: {FilenameOption, AutoWidthOption, BookTypeOption},
    data() {
      return {
        filename: '',
        bookType: 'xlsx',
        bookOptions: ['xlsx', 'csv', 'txt'],
        placeholder: '请输入文件名（默认excel-list）',
        autoWidth: true,
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
            filename: this.filename,
            bookType: this.bookType
          }
          console.log('params--：', params)
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

<style lang="scss" scoped>
  .formSearch{
    li{ display: inline-block}
    .radio-label{ padding:  0 12px 0 30px}
  }
</style>
