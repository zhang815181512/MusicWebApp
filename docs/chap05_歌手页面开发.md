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

## listview 歌手数据展示（逻辑比较多要多理解几遍）
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

### 右侧快速入口功能实现
#### 数据展示
```
// 计算出快速入口数据
computed: {
  // 右侧快速导航
  shortcutList() {
    return this.data.map((group) => {
      return group.title.substr(0, 1)
    })
  }
},

// 遍历展示
<div class="list-shortcut">
  <ul>
    <li class="item" v-for="(item, index) in shortcutList" :key="index">
      {{item}}
    </li>
  </ul>
</div>
```

#### 锚点跳转
```vue
onShortcutTouchStart (ele) {
  // 点击时拿到对应的index (封装dom方法)
  let anchorIndex = getData(ele.target, 'index')
  // scroll扩展滚动到某个位置的方法 scrollTo() scrollToElement()
  this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
},
```

#### 锚点滑动左边的歌手跟着滚动
```vue
_scrollTo(index) {
  // 第二个参数表示要不要动画时间
  this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
},
onShortcutTouchStart (ele) {
  // 点击时拿到对应的index(封装dom方法)
  let anchorIndex = getData(ele.target, 'index')
  // 获取第一次点击时的位置
  let firstTouch = ele.touches[0]
  this.touch.y1 = firstTouch.pageY
  this.touch.anchorIndex = anchorIndex
  // scroll扩展滚动到某个位置的方法 scrollTo() scrollToElement()
  this._scrollTo(anchorIndex)
},
// 监听快速入口的滑动
onShortcutTouchMove (ele) {
  let firstTouch = ele.touches[0]
  this.touch.y2 = firstTouch.pageY

  // 计算偏移/锚点高度  取整就得到新的index (得到了偏移几个锚点)
  let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
  // 新的锚点位置
  let anchorIndex = parseInt(this.touch.anchorIndex) + delta
  this._scrollTo(anchorIndex)
}
```

#### 滚动右侧快速入口高亮
```vue
// scroll 增加方法
// 监听滚动事件
if (this.listenScroll) {
  let me = this // 保存一下vm的实例
  this.scroll.on('scroll', (pos) => {
    me.$emit('scroll', pos)
  })
}

```
#### 联动总结
首先需要实时知道滚动的位置，
根据滚动位置来计算item落到了group的区间,
知道对应的索引，监视数据变化

### 固定标题
* 简单实现
```vue
<div class="list-fixed" ref="fixed" v-show="fixedTitle">
  <div class="fixed-title">{{fixedTitle}} </div>
</div>

// 计算fixedTitle
fixedTitle () {
  if (this.scrollY > 0) {
    return ''
  }
  return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
}
```
* 效果优化
当下一个要顶上去时当前显示的慢慢消失
