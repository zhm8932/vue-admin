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

// 两个时间差 中文显示函数
export function timeAgo(t1, t2) {
  const t1Date = new Date(t1)
  const t2Date = new Date(t2)
  let time = t1Date.getTime() - t2Date.getTime()
  const suffix = time > 0 ? '后' : '前'
  time = Math.abs(time)
  let result
  if (time === 0) {
    result = '刚刚'
  } else if (time / 1000 < 60) {
    result = `${parseInt(time / 1000)}秒${suffix}`
  } else if (time / (1000 * 60) < 60) {
    result = `${parseInt(time / (1000 * 60))}分钟${suffix}`
  } else if (time / (1000 * 60 * 60) < 24) {
    result = `${parseInt(time / (1000 * 60 * 60))}小时${suffix}`
  } else if (time / (1000 * 60 * 60 * 24) < 24) {
    result = `${parseInt(time / (1000 * 60 * 60 * 24))}天${suffix}`
  } else if (time / (1000 * 60 * 60 * 24 * 30) < 24) {
    result = `${parseInt(time / (1000 * 60 * 60 * 24 * 30))}月${suffix}`
  } else if (time / (1000 * 60 * 60 * 24 * 30 * 12) < 12) {
    result = `${parseInt(time / (1000 * 60 * 60 * 24 * 30 * 12))}年${suffix}`
  }
  console.log('result:', result)
  return result
}

// 两个时间差 中文显示函数
export function timeAgo2(t1, t2) {
  const t1Date = new Date(t1)
  const t2Date = new Date(t2)
  // console.log('t1Date---:', t1Date, 't2Date--:', t2Date)
  let time = t1Date.getTime() - t2Date.getTime()
  // console.log('time----:', time)
  const suffix = time > 0 ? '后' : '前'
  time = Math.abs(time)
  console.log('time--===--:', typeof time, time)
  let result
  switch (time) {
    case time === 0:
      result = '刚刚'
      break
    case time > 1000 * 60 * 60 * 24 * 30 * 12:
      result = `${parseInt(time / (1000 * 60 * 60 * 24 * 30 * 12))}年${suffix}`
      break
    case time > 1000 * 60 * 60 * 24 * 30:
      result = `${parseInt(time / (1000 * 60 * 60 * 24 * 30))}个月${suffix}`
      break
    case time > 1000 * 60 * 60 * 24:
      result = `${parseInt(time / (1000 * 60 * 60 * 24))}天${suffix}`
      break
    case time > 1000 * 60 * 60:
      result = `${parseInt(time / (1000 * 60 * 60))}小时${suffix}`
      break
    case time > 1000 * 60:
      result = `${parseInt(time / (1000 * 60))}分钟${suffix}`
      break
    case time > 1000:
      result = `${parseInt(time / (1000))}秒${suffix}`
      break
    default:
      result = `${parseInt(time / (1000))}秒${suffix}`
  }
  console.log('result-----:', result)
  return result
}

/*
使用正则完成对变量字符串编写的判断

1.不允许数字开头
2.允许大小驼峰，但中间和末尾不能有_
3.允许_和$ 开头，但后面必须跟全小写或者全大写，中间和末尾不能有_
4.允许全大写和全小写，全大写时中间可以有_,但全小写是不允许中间有_, 中间带有_的_前不能是数字
5.只使用正则判断完成此题，允许1条或者多条正则，但不能超过3条正则

请使用es6语法实现，此题15分钟
*/
export function checkVariable(str) {

}
