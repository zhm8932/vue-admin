import Layout from '../../layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  name: 'ComponentDemo',
  meta: {
    title: 'components',
    icon: 'component'
  },
  children: [
    {
      path: 'back-to-top',
      component: () => import('../../views/components-demo/backToTop'),
      name: 'BackToTopDemo',
      meta: { title: 'backToTop'}
    },
    {
      path: 'drag-dialog',
      component: () => import('../../views/components-demo/dragDialog'),
      name: 'DragDialog',
      meta: { title: 'dragDialog'}
    },
    {
      path: 'sticky',
      component: () => import('../../views/components-demo/sticky'),
      name: 'Sticky',
      meta: { title: 'Sticky'}
    },
    {
      path: 'tinymce',
      component: () => import('../../views/components-demo/tinymce'),
      name: 'tinymce',
      meta: { title: 'tinymce'}
    },
    {
      path: 'qrCode',
      component: () => import('../../views/components-demo/qrCode'),
      name: 'qrCode',
      meta: {title: 'qrCode'}
    }
  ]
}
export default componentsRouter
