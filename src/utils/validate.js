/*
* @descrition 是否为外部地址
* @param {string} path
* @return {Boolean}
* */
export function isExternal(path) {
  return /^(https?|mailto:|tel:)/.test(path)
}
