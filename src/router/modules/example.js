import Layout from '../../layout'

import left from '../../components/Example/leftContent'

const exampleRouter = {
  path: '/example',
  name: 'Example',
  component: Layout,
  meta: {
    title: 'example',
    icon: 'example'
  },
  children: [
    {
      path: 'form',
      name: 'CreateForm',
      meta: {
        title: 'CreateForm', icon: 'edit'
      },
      component: () => import('../../views/example/form')
    },
    {
      path: 'form2',
      name: 'CreateForm2',
      meta: {
        title: 'CreateForm', icon: 'edit'
      },
      component: () => import('../../views/example/form2')
    },
    {
      path: 'computed',
      name: 'Computed',
      meta: {
        title: 'computed'
      },
      component: () => import('../../views/example/computed')
    },
    {
      path: 'watch',
      name: 'Watch',
      meta: {title: 'watch'},
      component: () => import('../../views/example/watch')
    },
    {
      path: 'counter',
      name: 'Counter',
      meta: {title: 'counter'},
      component: () => import('../../views/example/counter')
    },
    {
      path: 'counterVuex',
      name: 'CounterVuex',
      meta: {title: 'counterVuex'},
      component: () => import('../../views/example/counterVuex')
    },
    {
      path: 'shopping',
      name: 'Shopping',
      meta: {title: 'shopping'},
      component: () => import('../../views/example/shopping')
    },
    {
      path: 'list',
      name: 'ArticleList',
      meta: {
        title: 'articleList', icon: 'list'
      },
      component: () => import('../../views/example/list')
    },
    {
      path: 'create',
      name: 'CreateArticle',
      meta: {
        title: 'createArticle', icon: 'edit'
      },
      component: () => import('../../views/example/create')
    },
    {
      path: 'mixin',
      name: 'mixin',
      component: () => import('../../views/example/mixin'),
      meta: {
        title: 'mixin'
      }
    },
    {
      path: 'sync',
      name: 'sync',
      component: () => import('../../views/example/sync'),
      meta: {
        title: 'sync'
      }
    },
    {
      path: 'model',
      name: 'model',
      meta: {
        title: 'model', icon: 'edit'
      },
      component: () => import('../../views/example/model')
    },
    {
      path: 'slot',
      name: 'slot',
      meta: {title: 'slot', icon: 'edit'},
      component: () => import('../../views/example/slot')
    },
    {
      path: 'named',
      name: 'named',
      meta: {title: 'named', icon: 'edit'},
      redirect: '/example/named/home',
      component: () => import('../../views/example/named'),
      children: [
        {
          path: 'home',
          name: 'namedhome',
          meta: {title: 'named', icon: 'edit'},
          components: {
            default: () => import('../../components/Example/mainContent'),
            left: left,
            right: () => import('../../components/Example/rightContent')
          }
        },
        {
          path: 'home2',
          name: 'namedhome2',
          meta: {title: 'named2', icon: 'edit2'},
          components: {
            default: () => import('../../components/Example/mainContent'),
            right: () => import('../../components/Example/rightContent')
          }
        }
      ]
    },
    {
      path: 'communicate',
      name: 'Communicate',
      component: () => import('@/views/example/communicate'),
      meta: { title: 'communicate', icon: 'list' },
      children: [
        {
          path: 'props',
          name: 'props',
          component: () => import('@/views/example/communicate/props'),
          meta: {
            title: 'props', icon: 'list'
          }
        },
        {
          path: 'children',
          name: 'children',
          component: () => import('@/views/example/communicate/children'),
          meta: {
            title: 'children', icon: 'list'
          }
        },
        {
          path: 'provider',
          name: 'provider',
          component: () => import('@/views/example/communicate/provider'),
          meta: {
            title: 'provider', icon: 'list'
          }
        },
        {
          path: 'ref',
          name: 'ref',
          component: () => import('@/views/example/communicate/ref'),
          meta: {
            title: 'ref', icon: 'list'
          }
        },
        {
          path: 'attr',
          name: 'attr',
          component: () => import('@/views/example/communicate/attr'),
          meta: {
            title: 'attr', icon: 'list'
          }
        }
      ]
    }
  ]
}

export default exampleRouter
