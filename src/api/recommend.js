// recommend.js 封装网络请求方法
import jsonp from 'common/js/jsonp'
// 不使用{jsonp}因为jsonp.js导出使用的是export default
import {commonParams, options} from './config'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
