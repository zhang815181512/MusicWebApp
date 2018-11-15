/*
* 定义一个关于歌曲的类
*   定义成类优点： 代码便于维护，可扩展性好，面向对象编程
*
* */

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
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    // url: `https://thirdparty.gting.com/${musicData.songid}.m4a?fromtag=38`  // 域名不可用啦
    url: `http://dl.stream.qqmusic.qq.com/${musicData.songid}.m4a?&uin=0&fromtag=38`
    // url: `http://dl.stream.qqmusic.qq.com/C400002E3MtF0IAMMY.m4a?guid=4965975040&vkey=93CA40F14D2C77B120317A26E57A6D4F4DE929D9DB55286A4AA0DDA63D954C72301055AA8611C27F76F5C44C6FEDCD593CD853314479AE94&uin=0&fromtag=38`
    /*
    * 抓取歌曲
    *
    * http://dl.stream.qqmusic.qq.com/C400002E3MtF0IAMMY.m4a?
    * guid=4965975040&vkey=93CA40F14D2C77B120317A26E57A6D4F4DE929D9DB55286A4AA0DDA63D954C72301055AA8611C27F76F5C44C6FEDCD593CD853314479AE94&uin=0
    * &fromtag=38
    * */
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
