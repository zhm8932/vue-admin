/*
webpack的api,通过require.context获取一个特定的上下文,主要用来实现自动化导入模块
如果遇到从一个文件夹引入很多模块的情况,可以使用这个api,它会遍历文件夹中的指定文件,然后自动导入,
使得不需要每次显式的调用import导入模块
其中第一个参数表示相对的文件目录，第二个参数表示是否包括子目录中的文件，第三个参数表示引入的文件匹配的正则表达式
*/

const req = require.context('../../icons/svg', false, /\.svg$/)

const re = /\.\/(.*)\.svg/

console.log('req.keys()----------:', req.keys())
const icons = req.keys().map(i => {
  // console.log('i--------:', i, 'i.match(re)----:', i.match(re))
  return i.match(re)[1]
})
console.log('icons-----------:', icons)
export default icons
