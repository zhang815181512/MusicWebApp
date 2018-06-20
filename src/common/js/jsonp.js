/*
 * @Author: Jiandong Zhao
 * @Date: 2018/6/20 15:57
 * @Last Modified by:   marlonchiu
 * @Last Modified time: 2018/6/20 15:57
 */
import originJSONP from 'jsonp'

// 封装 JSONP 返回一个promise
export default function jsonp(url, data, option) {
  // 判断url是否有 ？存在
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

// 定义把data拼到url上方法
export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    // encodeURIComponent 函数可把字符串作为 URI 组件进行编码
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  // 拼接需要把第一个 & 去掉
  return url ? url.substring(1) : ''
}
