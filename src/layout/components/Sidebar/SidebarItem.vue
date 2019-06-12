<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <!--只有一个子路由、子路由没有其他的二级路由或不用显示二级路由、当前路由一直显示-->
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <router-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)" :data-path="onlyOneChild.path" :data-ttttt="hasOneShowingChild(item.children, item)" :data-t2="hasOneShowingChild(item.children, item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren) && !item.alwaysShow">
        <el-menu-item v-if="onlyOneChild.meta" :key="item.path" :index="resolvePath(onlyOneChild.path)" :data-path="item.path" :data-hasOneShowingChild="hasOneShowingChild(item.children, item)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :title="generateTitle(onlyOneChild.meta.title)" />
        </el-menu-item>
      </router-link>
    </template>
    <el-submenu v-else ref="subMenu" :key="item.path" :data-index="resolvePath(item.path)" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <span v-if="item.meta">{{ generateTitle(item.meta.title) }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :is-nest="true"
        :base-path="resolvePath(item.path)"
        class="nest-menu"
      />
      <!--<template v-for="route in item.children">
        <el-menu-item :key="route.path">
          <router-link :to="resolvePath(route.path)" :data-path="route.fullPath">
            <span>{{generateTitle(route.meta && route.meta.title)}}</span>
          </router-link>
        </el-menu-item>
      </template>-->
    </el-submenu>
  </div>
</template>

<script>
  import path from 'path'
  import { generateTitle } from '../../../utils/i18n'
  import { isExternal } from '../../../utils/validate'
  import Item from './Item'
  export default {
    name: 'SidebarItem',
    components: { Item },
    props: {
      item: {
        type: Object,
        required: true
      },
      basePath: {
        type: String,
        default: ''
      },
      isNest: {
        type: Boolean,
        default: false
      }
    },
    data() {
      this.onlyOneChild = null
      return {}
    },
    methods: {
      generateTitle,
      resolvePath(routePath) {
        // console.log('routePath-------:', routePath, ':basePath:', this.basePath, ':fullpath-------:', path.resolve(this.basePath, routePath))
        if (isExternal(routePath)) {
          return routePath
        }
        if (isExternal(this.basePath)) {
          return this.basePath
        }
        return path.resolve(this.basePath, routePath)
      },
      hasOneShowingChild(children = [], parent) {
        // 要显示的菜单
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          }
          this.onlyOneChild = item
          return true
        })
        if (showingChildren.length) {
          // console.log('showingChildren----：', showingChildren, showingChildren.length)
        }
        if (showingChildren.length === 1) {
          return true
        }
        if (!showingChildren.length) {
          this.onlyOneChild = {...parent, noShowingChildren: true}
          return true
        }
        // console.log('onlyOneChild----------:', this.onlyOneChild)
        return false
      }
    }
  }
</script>

<style scoped>
  .menu-wrapper >>> .el-submenu .el-submenu__title{
    background-color: #304156;
    color: #e8f4ff;
  }
  .menu-wrapper >>> .router-link-active .el-menu-item{
    color: #409eff;
  }
  .menu-wrapper >>> .el-menu-item{
    color: #e8f4ff;
    background-color: #304156;
  }
</style>
