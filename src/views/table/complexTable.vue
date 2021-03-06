<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="标题" style="width: 200px" />
      <el-select v-model="listQuery.key">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :value="item.key" />
      </el-select>
      <el-button icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
      <el-checkbox v-model="showReviewer">审核人</el-checkbox>
    </div>
    <el-table v-loading="listLoading" class="table" :data="list" border>
      <el-table-column label="序号">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">
          {{ scope.row.timestamp | formatDate('YYYY-MM-DD hh:mm') }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.title')" prop="title" />
      <el-table-column label="作者" prop="author">
        <template slot-scope="scope">
          <el-popover trigger="hover">
            <p>审核人:{{ scope.row.reviewer }}</p>
            <p><span style="float: left">内容：</span><aside v-html="scope.row.content"> </aside></p>
            <div slot="reference">
              {{ scope.row.author }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="重要性" prop="importance">
        <template slot-scope="scope">
          <svg-icon v-for="i in scope.row.importance" :key="i" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>
      <el-table-column v-if="showReviewer" label="审核人">
        <template slot-scope="scope">
          <span style="color:red;">{{ scope.row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="阅读数" prop="pageviews" />
      <el-table-column label="状态">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230" class="small-padding fixed-width">
        <template slot-scope="{row, $index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row, $index)">{{ $t('table.edit') }}</el-button>
          <el-button v-if="row.status!=='published'" type="success" size="mini" @click="handleModifyStatus(row, 'published')">{{ $t('table.publish') }}</el-button>
          <el-button v-if="row.status!=='deleted'" type="danger" size="mini" @click="handleModifyStatus(row, 'deleted')">{{ $t('table.delete') }}</el-button>
          <el-button v-if="row.status!=='draft'" size="mini" @click="handleModifyStatus(row, 'draft')">{{ $t('table.draft') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :title="textMap[dialogStatus]">
      <el-form ref="dataForm" :model="temp" :rules="rules" label-width="70px">
        <el-form-item label="类型" prop="type">
          <el-select v-model="temp.type">
            <el-option v-for="option in calendarTypeOptions" :key="option.key" :value="option.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="时间" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="temp.status">
            <el-option v-for="item in statusOptions" :key="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="重要性">
          <el-rate v-model="temp.importance" :max="3" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" style="{'margin-top':'8px'}" />
        </el-form-item>
        <el-form-item label="点评">
          <el-input v-model="temp.remark" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  const calendarTypeOptions = [
    { key: 'CN', display_name: 'China' },
    { key: 'US', display_name: 'USA' },
    { key: 'JP', display_name: 'Japan' },
    { key: 'EU', display_name: 'Eurozone' }
  ]

  import { Message } from 'element-ui'
  import {fetchList, createArticle, updateArticle} from '../../api/article'
  // import {formatDate} from '../../utils'
  export default {
    name: 'ComplexTable',
    filters: {
      statusFilter(status) {
        // success/info/warning/danger
        const statusMap = {
          draft: 'info',
          published: 'success',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        page: 1,
        list: null,
        dialogVisible: false,
        showReviewer: false,
        listLoading: true,
        dialogStatus: '',
        temp: {},
        textMap: {
          update: '修改',
          create: '新建'
        },
        listQuery: {
          page: 1,
          pageNum: 0,
          limit: 10,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        statusOptions: ['published', 'draft', 'deleted'],
        calendarTypeOptions,
        rules: {
          type: [{ required: true, message: '请选择类型', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
          title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        console.log('vue页面加载完毕!!!')
      })
      console.log('页面渲染完成')
      this.getList()
    },
    methods: {
      async getList() {
        this.listLoading = true
        console.log('listQuery------:', this.listQuery)
        const result = await fetchList(this.listQuery)
        console.log('result----:', result)
        this.list = result.data.items
        this.listQuery.pageNum = result.data.total / (this.list.limit || 10)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
        /* fetchList(this.listQuery).then(json => {
          this.list = json.data.items
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })*/
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          timestamp: new Date(),
          remark: '',
          type: '',
          status: 'published'
        }
      },
      handleSearch() {
        this.listQuery.page = 1
        this.getList()
      },
      handleUpdate(row, index) {
        this.dialogVisible = true
        this.dialogStatus = 'update'
        this.temp = Object.assign({}, row)
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleCreate() {
        this.dialogVisible = true
        this.dialogStatus = 'create'
        this.resetTemp()
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        setTimeout(() => {
          Message({
            message: '操作成功2',
            type: 'success'
          })
        }, 2000)
        row.status = status
      },
      updateData() {
        console.log('temp---------:', this.temp)
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            updateArticle(this.temp)
              .then(res => {
                this.dialogVisible = false
                const index = this.list.findIndex(item => item.id === this.temp.id)
                this.list.splice(index, 1, this.temp)
                this.$notify({
                  type: 'success',
                  title: '成功',
                  message: '更新成功',
                  duration: 2000
                })
              })
          }
        })
      },
      createData() {
        this.$refs['dataForm'].validate(valid => {
          console.log('valid------:', valid)
          if (valid) {
            createArticle(this.temp)
              .then(res => {
                this.dialogVisible = false
                this.list.unshift(this.temp)
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success'
                })
              })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
