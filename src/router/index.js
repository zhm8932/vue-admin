import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import componentsRouter from './modules/components'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'
import exampleRouter from './modules/example'

Vue.use(Router)

import Layout from '../layout'

export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // 总是显示一级菜单
    meta: {
      title: 'permission'
    },
    children: [
      {
        path: 'page',
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin']
        },
        component: () => import('../views/permission/page')
      },
      {
        path: 'directive',
        name: 'pagedirective',
        meta: {
          title: 'directivePermission'
        },
        component: () => import('../views/permission/directive')
      },
      {
        path: 'role',
        name: 'pageRole',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        },
        component: () => import('../views/permission/role')
      }
    ]
  },
  {
    path: '/excel',
    component: Layout,
    meta: {title: 'Excel'},
    children: [
      {
        path: 'upload',
        name: 'excelUpload',
        component: () => import('../views/excel/uploadExcel'),
        meta: {
          title: 'excelUpload'
        }
      },
      {
        path: 'export',
        name: 'excelExport',
        component: () => import('../views/excel/exportExcel'),
        meta: {
          title: 'excelExport'
        }
      },
      {
        path: 'selectExcel',
        name: 'selectExcel',
        component: () => import('../views/excel/selectExcel'),
        meta: {
          title: 'selectExcel'
        }
      },
      {
        path: 'exportZip',
        name: 'exportZip',
        component: () => import('../views/excel/exportZip'),
        meta: {
          title: 'exportZip'
        }
      }
    ]
  },
  componentsRouter,
  tableRouter,
  nestedRouter,
  exampleRouter,
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'icons',
        component: () => import('../views/svg-icons/index'),
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    component: Layout,
    meta: { title: 'tab', icon: 'tab' },
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
        meta: { title: 'tab', icon: 'tab' }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
          title: 'example',
          icon: 'example'
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
export const constantRoutes = [
  /* {
    path: '/redirect',
    component: Layout
  },*/
  {
    path: '/login',
    component: () => import('../views/login'),
    hidden: true,
    meta: {title: '登录'}
  },
  {
    path: '/404',
    component: () => import('../views/errorPage/404'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard'),
        meta: {title: 'dashboard', icon: 'dashboard'}
      }
    ]
  }
]

const createRouter = () => new Router({
  mode: 'history',
  routes: constantRoutes
})

const router = createRouter()

console.log('router---:', router)
export default router
/*
export default new Router({
  // mode: 'history', // require service support
  base: process.env.BASE_URL,
  routes: constantRoutes
})
*/

