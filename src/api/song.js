// singer.js 封装网络请求方法
import {commonParams} from './config'
import axios from 'axios'

export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),  // 当前时间戳
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 1664029744,
    // categoryId: 10000000,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
