/*

export const uploadImage = req => {
  return Promise.resolve()
}

*/

export default [
  {
    url: '/image/upload',
    type: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    response: _ => {
      return {
        code: 20000,
        success: true,
        data: {
        }
      }
    }
  }
]
