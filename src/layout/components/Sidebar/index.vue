<template>
  <div :class="{'has-login':showLogo}">
    <logo v-if="showLogo" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!--<sidebar-item v-for="route in permissionRoutes" :key="route.path" :base-path="route.path" :item="route" />-->

        <sidebar-item v-for="route in permissionRoutes" :key="route.path" :base-path="route.path" :item="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  // import { generateTitle } from '../../../utils/i18n'
  import { mapGetters } from 'vuex'
  import Logo from './Logo'
  import SidebarItem from './SidebarItem'
  import variables from '@/styles/variables.scss'

  export default {
    name: 'Sidebar',
    components: {Logo, SidebarItem},
    computed: {
      ...mapGetters([
        'permissionRoutes',
        'sidebar'
      ]),
      showLogo() {
        return true
      },
      activeMenu() {
        const route = this.$route
        const {meta, path} = route
        console.log('activeMenu--:', meta.activeMenu, 'path:', path)
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
      variables() {
        return variables
      },
      isCollapse() {
        return this.sidebar
      }
    },
    mounted() {
      console.log('permissionRoutes-------:', this.permissionRoutes)
    },
    methods: {
      // generateTitle,
      // hasOneShowingChild(childen = [], parent) {
      //   console.log('childen----------:', childen, 'parent--:', parent)
      //   // 要显示的菜单
      //   const showingChildren = childen.filter(item => {
      //     if (item.hidden) {
      //       return false
      //     }
      //     return true
      //   })
      //
      //   if (showingChildren.length === 1) {
      //     return true
      //   }
      //   if (!showingChildren.length) {
      //     this.onlyOneChild = {...parent}
      //     return false
      //   }
      // }
    }
  }
</script>

<style scoped>

</style>
