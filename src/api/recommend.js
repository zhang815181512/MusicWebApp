// recommend.js 封装网络请求方法
import jsonp from 'common/js/jsonp'
// 不使用{jsonp}因为jsonp.js导出使用的是 export default
import {commonParams, options} from './config'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  /*
  * Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。
  *       将返回目标对象。
  *   语法 Object.assign(target, ...sources)
  *       target 目标对象
  *       sources 源对象
  *    如果目标对象中的属性具有相同的键，则属性将被源中的属性覆盖。
  *    后来的源的属性将类似地覆盖早先的属性。
  *
  *    目标对象https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?
  *    g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&platform=h5&uin=0&needNewCode=1
  *    &jsonpCallback=__jp0
  *
  *    data = {
  *     g_tk: 1557387597,
  *     inCharset: 'utf-8',
  *     outCharset: 'utf-8',
  *     notice: 0,
  *     format: 'jsonp'
  *     platform: 'h5',
  *     uin: 0,
  *     needNewCode: 1
  *    }
  * */
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
