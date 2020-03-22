import Mock from 'mockjs'
import { param2Obj } from '../src/utils'

import user from './user'
import role from './role'
import article from './article'
import search from './remoteSearch'
import products from './products'
import home from './home'
import data from './data'
// import {uploadImage} from './data'

const mocks = [
  ...user,
  ...role,
  ...article,
  ...search,
  ...products,
  ...home,
  ...data
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
export function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond, headers = {}) {
    // console.log('respond-----:', respond)
    return function(options) {
      console.log('options:', options, 'headers---：', headers)
      let result = null
      if (respond instanceof Function) {
        console.log('-----respond------:')
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        console.log('body--:', typeof body, body && body.constructor && body.constructor.name, body)
        const tempBody = headers && headers['Content-Type'] === 'multipart/form-data' ? body : JSON.parse(body)
        result = respond({
          method: type,
          body: tempBody,
          headers: headers,
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
	    console.log('result---:', result)
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    // console.log('i-----:', i)
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response, i.headers), i.headers || {})
  }
}
console.log('mock服务----------------------')
// for mock server
const responseFake = (url, type, respond) => {
  console.log('url---:', url)
  return {
    url: new RegExp(`/mock${url}`),
    type: type || 'get',
    response(req, res) {
      console.log('respond instanceof Function--:', respond instanceof Function)
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

// Mock.mock(/\/image\/upload/, uploadImage)

export default mocks.map(route => {
  // console.log('route----------:', route)
  return responseFake(route.url, route.type, route.response, route.headers)
})
