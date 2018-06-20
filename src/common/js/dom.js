/*
 * @Author: Jiandong Zhao
 * @Date: 2018/6/20 17:02
 * @Last Modified by:   marlonchiu
 * @Last Modified time: 2018/6/20 17:02
 */

// 定义一些DOM操作的方法
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
    if (hasClass(el, className)) {
      return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}
