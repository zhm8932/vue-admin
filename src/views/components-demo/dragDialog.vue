<template>
  <div class="app-container">
    <el-button type="primary" @click="dialogTableVisible=true">open a Drag Dialog</el-button>
    <el-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" title="购物地址">
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-table :data="gridData">
        <el-table-column prop="name" label="姓名" width="150" />
        <el-table-column prop="date" label="日期" width="200" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import elDragDialog from '../../directive/el-dragDialog'
  export default {
    name: 'DragDialog',
    directives: { elDragDialog },
    data() {
      return {
        value: '',
        dialogTableVisible: false,
        options: [
          { value: '选项1', label: '黄金糕' },
          { value: '选项2', label: '双皮奶' },
          { value: '选项3', label: '蚵仔煎' },
          { value: '选项4', label: '龙须面' }
        ],
        gridData: [{
          date: '2016-05-02',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-04',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-03',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }]
      }
    }
  }
</script>

<style scoped>

</style>
