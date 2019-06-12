const products = [
  { 'id': 1, 'title': 'iPad 4 Mini', 'price': 3999.00, 'inventory': 2 },
  { 'id': 2, 'title': '移动充电宝', 'price': 99.99, 'inventory': 10 },
  { 'id': 3, 'title': 'Sucker CD', 'price': 29.99, 'inventory': 5 }
]

export default [
  {
    url: '/products/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: products
      }
    }
  }
]
