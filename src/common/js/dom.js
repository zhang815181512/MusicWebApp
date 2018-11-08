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

export function getData(ele, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return ele.setAttribute(name, val)
  } else {
    return ele.getAttribute(name)
  }
}

// 定义一个检测设备的方法
let elementStyle = document.createElement('div').style
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',  // ie
    standard: 'transform'
  }

  for (var key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
