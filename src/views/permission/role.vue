<template>
  <div class="app-container">
    <h3>角色权限</h3>
    <!--<switch-roles />-->
    <el-button type="primary" @click="handleAddRole">新增角色</el-button>
    <el-table :data="rolesList" border style="margin-top: 30px">
      <el-table-column prop="key" label="Role key" width="220" />
      <el-table-column prop="name" label="Role name" width="220" />
      <el-table-column prop="description" label="描述" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">{{ $t('permission.editPermission') }}</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">{{ $t('permission.delete') }} </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType==='edit'?'编辑角色':'新增角色'"
    >
      <el-form label-width="100px" :model="role" :data-role="JSON.stringify(role)">
        <el-form-item label="角色名称">
          <el-input v-model="role.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="role.description" type="textarea" :autosize="{ minRows:2, maxRows:4 }" />
        </el-form-item>
        <el-tree ref="tree" :data="routesData" :props="defaultProps" show-checkbox node-key="path" class="permission-tree" />
        <div style="text-align: right">
          <el-button size="small" type="danger" @click="dialogVisible=false">{{ $t('permission.cancel') }} </el-button>
          <el-button size="small" type="primary" @click="confirmRole">{{ $t('permission.confirm') }} </el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import i18n from '@/lang'

  import path from 'path'
  // import SwitchRoles from '../../components/SwitchRoles'
  import { getRoles, deleteRole, getRoutes, updateRole, addRole } from '../../api/role'

  const defaultRole = {
    key: '',
    name: '',
    description: '',
    routes: []
  }
  export default {
    name: 'Role',
    // components: { SwitchRoles },
    data() {
     return {
       rolesList: [],
       routes: [],
       dialogType: 'new',
       dialogVisible: false,
       role: Object.assign({}, defaultRole),
       defaultProps: {
         children: 'children',
         label: 'title'
       }
     }
    },
    computed: {
      routesData() {
        return this.routes
      }
    },
    created() {
      this.getRoles()
      this.getRoutes()
    },
    methods: {
      async getRoles() {
        const res = await getRoles()
        console.log('getRoles---------------', res)
        this.rolesList = res.data
      },
      async getRoutes() {
        const res = await getRoutes()
        this.serviceRoutes = res.data
        const routes = this.generateRoutes(res.data)
        this.routes = this.i18n(routes) // 国际化路由
        console.log('this.routes----:', this.routes)
      },
      async confirmRole() {
        const params = {
          name: this.role.name,
          description: this.role.description
        }
        const isEidt = this.dialogType === 'edit'
        // 若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组
        const checkedKeys = this.$refs.tree.getCheckedKeys()
        this.role.routes = this.generateTree(this.serviceRoutes, '/', checkedKeys)
        console.log('params--------:', params)
        // console.log('getCheckedNodes-----', this.$refs.tree.getCheckedNodes())
        console.log('getCheckedKeys------', checkedKeys)
        this.dialogVisible = false
        if (isEidt) {
          await updateRole(this.role.key, this.role)
          for (let i = 0; i < this.rolesList.length; i++) {
            if (this.rolesList[i].key === this.role.key) {
              this.rolesList.splice(i, 1, Object.assign({}, this.role))
              break
            }
          }
        } else {
          const {data} = await addRole(this.role)
          console.log('data-----------:', data)
          this.role.key = data.key
          this.rolesList.push(this.role)
        }

        const { description, key, name } = this.role
        this.$notify({
          type: 'success',
          title: 'Success',
          dangerouslyUseHTMLString: true,
          message: `
            <div>Role Key: ${key}</div>
            <div>Role Nmae: ${name}</div>
            <div>Description: ${description}</div>
          `
        })
      },
      // 生成菜单路由
      generateRoutes(routes, basePath = '/') {
        const res = []
        /*
        * 1、隐藏的路由不显示
        * 2、有二级路由、且只有一个子路由、且父路由一直显示
        * 3、按上面逻辑、再处理二级路由
        * */
        for (let route of routes) {
          if (route.hidden) continue
          const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)
          if (route.children && onlyOneShowingChild && !route.alwaysShow) {
            route = onlyOneShowingChild
          }
          const data = {
            path: path.resolve(basePath, route.path),
            title: route.meta && route.meta.title
          }
          if (route.children) {
            data.children = this.generateRoutes(route.children, route.path)
          }
          res.push(data)
        }
        return res
      },
      generateTree(routes, basePath = '/', checkedKeys) {
        const res = []
        for (const route of routes) {
          console.log('route----------------------:', route)
          const routePath = path.resolve(basePath, route.path)
          if (route.children) {
            route.children = this.generateTree(route.children, route.path, checkedKeys)
          }
          if (checkedKeys.includes(routePath)) {
            res.push(route)
          }
        }
        return res
      },
      handleAddRole() {
        this.role = Object.assign({}, defaultRole)
        this.dialogVisible = true
        this.dialogType = 'new'
        this.$nextTick(() => {
          if (this.$refs.tree) {
            this.$refs.tree.setCheckedNodes([])
          }
        })
      },
      handleEdit({row}) {
        console.log('编辑权限:', row)
        this.dialogVisible = true
        this.dialogType = 'edit'
        this.role = Object.assign({}, this.role, row)
        // this.routes = this.generateRoutes(row.routes)
        // Vue.nextTick用于延迟执行一段代码 在监听到DOM更新后，调用回调函数
        this.$nextTick(() => {
          const routes = this.generateRoutes(this.role.routes)
          // 设置目前勾选的节点，使用此方法必须设置 node-key 属性
          this.$refs.tree.setCheckedNodes(routes)
        })
      },
      handleDelete({$index, row}) {
        console.log('row------:', row)
        this.$confirm('确认删除该角色', '警告提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await deleteRole()
          console.log('确定要删除了')
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
      },
      // 是否只有一个子路由
      onlyOneShowingChild(children = [], parent) {
        let onlyOneChild = null
        // 获取显示的路由、判断子路由的数量
        const showingChildren = children.filter(route => !route.hidden)
        if (showingChildren.length === 1) {
          onlyOneChild = showingChildren[0]
          onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
          return onlyOneChild
        }
        if (showingChildren.length === 0) {
          onlyOneChild = {...parent, path: '', noShowingChildren: true}
          return onlyOneChild
        }
        return false
      },
      i18n(routes) {
        return routes.map(route => {
          route.title = i18n.t(`route.${route.title}`)
          if (route.children) {
            route.children = this.i18n(route.children)
          }
          return route
        })
      }
    }
  }
</script>

<style scoped>

</style>
