/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
* 格式时间
* */
export function formatDate(time, format = 'YYYY-MM-DD hh:mm:ss') {
  if (arguments.length === 0) {
    return null
  }
  const t = new Date(time)
  const tf = function(value) {
    return value > 10 ? value : '0' + value
  }
  return format.replace(/YYYY|MM|DD|hh|mm|ss/g, (val, key) => {
    switch (val) {
      case 'YYYY':
        return tf(t.getFullYear())
      case 'MM':
        return tf(t.getMonth() + 1)
      case 'DD':
        return tf(t.getDate())
      case 'hh':
        return tf(t.getHours())
      case 'mm':
        return tf(t.getMinutes())
      case 'ss':
        return tf(t.getSeconds())
      default :
        return ''
    }
  })
}

