<template>
  <div class="app-container">
    <div>
      <el-input v-model="filename" :placeholder="$t('excel.placeholder')" prefix-icon="el-icon-document" style="width: 350px"/>
      <BookTypeOption v-model="bookType" label="文件类型：" />
      <el-button type="primary" @click="handleDownload">导出已选择项</el-button>
    </div>
    <el-row style="margin-top: 20px">
      <el-table
        :data="tableData"
        v-loading="listLoading"
        border
        highlight-current-row
        element-loading-text="拼命加载中"
        @selection-change="handleSelectd"
      >
        <el-table-column type="selection" align="center" />
        <el-table-column label="id" prop="id" width="90"/>
        <el-table-column label="姓名" prop="author" width="100" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.author }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="阅读量" width="110" align="center">
          <template slot-scope="scope">{{ scope.row.pageviews }}</template>
        </el-table-column>
        <el-table-column label="状态" prop="status" width="110" align="center" />
        <el-table-column label="标题" prop="title" />
        <el-table-column label="日期" prop="display_time" align="center" width="120">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            {{ scope.row.display_time | formatDate('YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="small" type="warning" @click="handleDelete(scope.row.id)">删除</el-button>
            <el-popover
              placement="top"
              width="160"
              v-model="popoverVisible"
              trigger="click"
            >
              <p>这是一段内容这是一段内容确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="popoverVisible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="popoverVisible = false">确定</el-button>
              </div>
              <el-button size="small" type="danger" slot="reference">自定义删除</el-button>
            </el-popover>
            <el-popover
              placement="bottom"
              width="200"
              trigger="click">
              <p>这是一段内容这是一段内容确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="handleDelete(scope.row.id)">确定</el-button>
              </div>
              <!--<el-button slot="reference">click 激活</el-button>-->
              <el-button size="small" type="danger" slot="reference">自定义删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  import * as excel from '../../utils/excel'
  import {fetchList} from '../../api/article'
  import BookTypeOption from './components/BookTypeOption'
  console.log('excel---:', excel)
  export default {
    name: 'SelectExcel',
    components: {BookTypeOption},
    data() {
      return {
        listLoading: true,
        visible: false,
        popoverVisible: false,
        filename: '',
        bookType: 'xlsx',
        multipleSelection: [],
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
      this.$nextTick(() => {
        this.getData()
      })
    },
    methods: {
      async getData() {
        this.listLoading = true
        const result = await fetchList()
        this.listLoading = false
        this.tableData = result.data.items
      },
      handleDelete(id) {
        const index = this.tableData.findIndex(item => item.id === id)
        console.log('id-:', id, index)
        this.tableData.splice(index, 1)
        this.visible = false
        this.popoverVisible = false
      },
      handleSelectd(val) {
        this.multipleSelection = val
      },
      handleDownload() {
        if (this.multipleSelection.length) {
          const params = {
            // title: ['一级分类', '二级分类', '三级分类'],
            title: this.tableHeader.map(item => item.value),
            key: this.tableHeader.map(item => item.key),
            data: this.multipleSelection,
            autoWidth: true,
            filename: this.filename,
            bookType: this.bookType
          }
          console.log('params--：', params)
          excel.exportArrayToExcel(params)
        } else {
          this.$message.warning('选择的表格数据不能为空')
        }
      }
    }
  }
</script>

<style scoped>

</style>
