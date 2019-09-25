<template>
  <div class="app-container">
    <el-card>
      <h4 slot="header">导入EXCEL</h4>
      <UploadElcel :table-data="tableData" :table-header="tableHeader" @handleUpload="handleUpload" />
      <!--<el-row>
        <el-upload action="" :before-upload="handleBeforeUpload" accept=".xls, .xlsx">
          <el-button icon="ios-cloud-upload-outline" :loading="uploadLoading" @click="handleUploadFile">上传</el-button>
        </el-upload>
      </el-row>
      <el-row class="ivu-upload-list-file" v-if="file !== null">
        <i class="el-icon-document"></i>
        {{ file.name }}
        <i class="el-icon-close" @click="handleRemoveFile"></i>
      </el-row>
      <el-row>
        <transition name="fade">
          <el-progress v-if="showProgress" :percentage="progressPercent" :format="format"/>
        </transition>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-table border :data="tableData" :loading="tableLoading">
          <el-table-column v-for="item in tableHeader" :key="item" :prop="item" :label="item" />
        </el-table>
      </el-row>-->
    </el-card>
  </div>
</template>

<script>
  import * as excel from '../../utils/excel'
  import UploadElcel from '../../components/UploadExcel'
  export default {
    name: 'UploadExcel',
    components: {UploadElcel},
    data() {
      return {
        uploadLoading: false,
        showProgress: false,
        tableLoading: false,
        progressPercent: 0,
        file: null,
        tableHeader: [],
        tableData: []
      }
    },
    methods: {
      initUpload() {
        this.tableData = []
        this.tableHeader = []
        this.showProgress = false
        this.file = null
      },
      format(percentage) {
        return percentage === 100 ? '成功' : `${percentage}%`
      },
      handleRemoveFile() {
        this.initUpload()
        this.$message.info('上传的文件已删除')
      },
      handleBeforeUpload(file) {
        console.log('file---:', file)
        const fileExt = file.name.split('.').pop().toLocaleLowerCase()
        console.log('fileExt---:', fileExt)
        if (fileExt === 'xlsx' || fileExt === 'xls') {
          this.readFile(file)
        } else {
          this.$notify({
            type: 'warning',
            title: '文件类型错误',
            desc: '文件：' + file.name + '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。'
          })
        }
      },
      handleUpload(data) {
        console.log('data----------:', data)
        const {tableData, tableHeader} = data
        this.tableData = tableData
        this.tableHeader = tableHeader
      },
      handleUploadFile() {
        this.initUpload()
      },
      // 读取文件
      readFile(file) {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadstart = e => {
          this.uploadLoading = true
          this.tableLoading = true
          this.showProgress = true
        }
        reader.onprogress = e => {
          this.progressPercent = Math.round(e.loaded / e.total * 100)
          console.log('progressPercent---:', this.progressPercent)
        }
        reader.onerror = e => {
          console.log('eeeeeeeeeeeee')
          this.$message.error('文件读取出错')
        }
        reader.onload = e => {
          this.$message.info('文件读取成功')
          const data = e.target.result
          const {headers, results} = excel.read(data, 'array')
          console.log('results----:', results, headers)
          this.file = file
          this.tableHeader = headers
          this.tableData = results
          this.uploadLoading = false
          this.tableLoading = false
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .ivu-upload-list-file{
    padding: 5px; margin: 10px 0; font-size: 12px;
    .el-icon-close{ opacity: 0; float: right; cursor: pointer}
    &:hover {
      background-color: #eee;
      .el-icon-close{ opacity: 1}
    }
  }
</style>
