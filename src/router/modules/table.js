import Layout from '../../layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: '/complexTable',
      name: 'ComplexTable',
      meta: {title: 'complexTable'},
      component: () => import('../../views/table/complexTable')
    },
    {
      path: '/dragTable',
      name: 'DragTable',
      meta: {title: 'dragTable'},
      component: () => import('../../views/table/dragTable')
    }
  ]
}
export default tableRouter
