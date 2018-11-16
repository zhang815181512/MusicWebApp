/*
 *  Created by : ZhaoJiandong
 *  Modified time: 2018/11/16 13:56
 */
/*
* 封装获取歌曲播放url 中vkey 的方法
* */

/*
* ！博客地址： https://blog.csdn.net/lijunhuan/article/details/79761690
*
*
* https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?
* g_tk=678733985
* &jsonpCallback=MusicJsonCallback8015407264426806
* &hostUin=0
* &format=json
* &inCharset=utf8
* &outCharset=utf-8
* &notice=0
* &platform=yqq
* &needNewCode=0
* &cid=205361747
* &callback=MusicJsonCallback8015407264426806
* &songmid=0010hBPF4TtDbz
* &filename=C1000010hBPF4TtDbz.m4a
* &guid=1674273789
*
* */

import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getSongVkey(songmid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?'
  const data = Object.assign({}, commonParams, {
    g_tk: 1664029744,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: '205361747',
    songmid: songmid,
    filename: 'C400' + songmid + '.m4a',
    guid: 9211497888
  })

  return jsonp(url, data, options)
}
