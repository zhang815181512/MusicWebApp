/*
* 定义一个关于歌曲的类
*   定义成类优点： 代码便于维护，可扩展性好，面向对象编程
*
* */

// import {getSongVkey} from '../../api/vkey'
import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  // 扩展调取歌词的方法
  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

/*
*   抽象工厂实例化方法
* */
export function createSong(musicData) {
  // let vkey = getSongVkey(musicData.songid, musicData.songmid).then((res) => {
  //   if (res.code === ERR_OK) {
  //     return res.data.items[0].vkey
  //   }
  // })

  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?&guid=9211497888&fromtag=0`
    // url: `http://220.181.91.146/amobile.music.tc.qq.com/C400002E3MtF0IAMMY.m4a?guid=7568678912&vkey=12F9C3A9DE7465726735E30EB2607F30D0F69AAA8E6E71019B9B749A95D281ECE65B3035F75D0C45FD203B1CA8449731A067692F4A23BE59&uin=0&fromtag=66`
    // url: `http://220.181.91.147/amobile.music.tc.qq.com/C400${musicData.songmid}.m4a?&guid=9211497888&vkey=${vkey}&uin=0&fromtag=66`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
