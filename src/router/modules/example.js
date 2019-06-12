import Layout from '../../layout'

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
    }
  ]
}

export default exampleRouter
