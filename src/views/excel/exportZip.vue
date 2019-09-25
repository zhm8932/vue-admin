<template>
  <div class="app-container">
    <el-card>
      <h4 slot="header">导出zip</h4>
      <el-row>
        <FilenameOption v-model="filename" :placeholder="placeholder" />
        <el-button type="primary" icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleDownload">{{ $t('zip.export') }}</el-button>
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
  import {export_txt_to_zip} from '../../utils/exportZip'
  import {fetchList} from '../../api/article'
  export default {
    name: 'ExportZip',
    components: {FilenameOption},
    data() {
      return {
        filename: '',
        bookType: 'xlsx',
        bookOptions: ['xlsx', 'csv', 'txt'],
        placeholder: '请输入文件名（默认excel-list）',
        autoWidth: true,
        uploadLoading: false,
        listLoading: true,
        tableHeader: [
          {key: 'id', value: 'id'},
          {key: 'author', value: '姓名'},
          {key: 'display_time', value: '日期'},
          {key: 'pageviews', value: '阅读量'},
          {key: 'status', value: '状态'},
          {key: 'title', value: '标题'}
        ],
        tableData: []
      }
    },
    created() {
      this.getData()
    },
    methods: {
      async getData() {
        this.listLoading = true
        const result = await fetchList()
        this.listLoading = false
        this.tableData = result.data.items
      },
      handleDownload() {
        console.log('下载')
        const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        console.log('data---:', data)
        export_txt_to_zip(tHeader, data, this.filename, this.filename)
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
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
