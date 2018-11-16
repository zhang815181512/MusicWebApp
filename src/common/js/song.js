/*
* 定义一个关于歌曲的类
*   定义成类优点： 代码便于维护，可扩展性好，面向对象编程
*
* */

// import {getSongVkey} from '../../api/vkey'
// import {ERR_OK} from '../../api/config'

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
