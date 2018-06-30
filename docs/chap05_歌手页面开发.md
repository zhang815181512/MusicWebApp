# chap05_歌手页面开发

## 歌手数据接口抓取
打开QQ音乐手机版本，查看请求 Network --> XHR 得到发送的请求路径 (Response中可以看到请求过来的数据)
```
// header 中的 Request URL
https://c.y.qq.com/v8/fcg-bin/v8.fcg?

.......
```
## 对抓取到的singer数据进行处理
* 整理聚合成二维数组，Findex 遍历处理
* 热门数据 --> 抓取的前10条
* 比较关键的是这个`_normalizeSinger`处理请求的数据的方法

```
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'  // 生成了一个Singer这样的类

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  data() {
    return {
      singers: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }

        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })
      // console.log(map)
      // 处理 map 得到有序列表
      let hot = []  // 表示热的数组
      let ret = []
      for (let key in map) {
        let val = map[key]
        // 如果key 检验是字母的话添加到ret数组，否则添加到hot数组
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      // ret 数组排序 按照字母的升序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  }
}


// common/js/singer.js
export default class Singer {
  constructor({id, name}) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}
```

## listview 歌手数据展示
### 基础数据渲染
```
<template>
  <scroll class="listview" :data="data" ref="listview">
    <ul>
      <li class="list-group" v-for="(group, index) in data" :key="index" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="(item, index) in group.items" :key="index">
            <img class="avatar" v-lazy="item.avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </scroll>
</template>


import Scroll from 'base/scroll/scroll'
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
}

// 请求头像懒加载
```
