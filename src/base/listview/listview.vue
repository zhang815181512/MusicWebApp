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
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li class="item" v-for="(item, index) in shortcutList" :key="index" :data-index="index">
          {{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import {getData} from "common/js/dom"

  const TITLE_HEIGHT = 30
  // 一个锚点的高度
  const ANCHOR_HEIGHT = 18

  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    created() {
      // 定一些共享属性
      this.touch = {}
    },
    computed: {
      // 右侧快速导航
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      }
    },
    methods: {
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
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable.styl"

  .listview
    position relative
    width 100%
    height 100%
    overflow hidden
    background $color-background
    .list-group
      padding-bottom 30px
      .list-group-title
        height 30px
        line-height 30px
        padding-left 20px
        font-size $font-size-small
        color $color-text-l
        background $color-highlight-background
      .list-group-item
        display flex
        align-items center
        padding 20px 0 0 30px
        .avatar
          width 50px
          height 50px
          border-radius 50%
        .name
          margin-left 20px
          color $color-text-l
          font-size $font-size-medium
    .list-shortcut
      position absolute
      z-index 30
      right 0
      top 50%
      transform translateY(-50%)
      width 20px
      padding 20px 0
      border-radius 10px
      text-align center
      background $color-background-d
      font-family Helvetica
      .item
        padding 3px
        line-height 1
        color $color-text-l
        font-size $font-size-small
        &.current
          color $color-theme
    .list-fixed
      position absolute
      top 0
      left 0
      width 100%
      .fixed-title
        height 30px
        line-height 30px
        padding-left 20px
        font-size $font-size-small
        color $color-text-l
        background $color-highlight-background
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>
