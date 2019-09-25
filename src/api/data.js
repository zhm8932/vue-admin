import request from '../utils/request'

export const uploadImg = formData => {
  return request({
    url: '/image/upload',
    data: formData,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
