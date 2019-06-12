<template>
  <div class="app-container">
    <h3>指令权限</h3>
    <switch-roles @change="handleRolesChange" />
    <div :key="key" style="margin-top: 30px">
      <div v-permission="['admin','dev']">
        <span class="permission-alert">
          只有 <el-tag size="samll">admin</el-tag> 可以看到这里
        </span>
      </div>
      <div v-permission="['editor']">
        <span class="permission-alert">
          只有 <el-tag size="small">edit</el-tag> 可以看这里
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import SwitchRoles from '../../components/SwitchRoles'
  import permission from '../../directive/permission'
  export default {
    name: 'Directive',
    components: { SwitchRoles },
    directives: { permission },
    data() {
      return {
        key: 1 // 为了能每次切换权限的时候重新初始化指令
      }
    },
    methods: {
      handleRolesChange() {
        this.key++
        console.log('指令权限---角色已切换')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-container{
    /deep/ .permission-alert {
      width: 320px;
      margin-top: 15px;
      background-color: #f0f9eb;
      color: #67c23a;
      padding: 8px 16px;
      border-radius: 4px;
      display: inline-block;
    }
  }
</style>
