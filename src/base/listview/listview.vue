/*
 * 作为基础组件，只对外派发方法，而自身是不做事件处理的
 *
 */

<template>
  <scroll class="listview"
          :data="data"
          ref="listview"
          :listenScroll="listenScroll"
          :probeType="probeType"
          @scroll="scroll">
    <ul>
      <li class="list-group" v-for="(group, index) in data" :key="index" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="(item, index) in group.items" :key="index" @click="selectItem(item)">
            <img class="avatar" v-lazy="item.avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li class="item"
            v-for="(item, index) in shortcutList"
            :key="index"
            :class = "{'current': currentIndex === index}"
            :data-index="index">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import  Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getData} from 'common/js/dom'

  const TITLE_HEIGHT = 30
  // 一个锚点的高度
  const ANCHOR_HEIGHT = 18

  export default {
    props: {
      data: {
        type: Array
        // default: []
      }
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1  // 表示固定的下边和上移的上边的差值
      }
    },
    created() {
      // 定一些共享属性
      this.touch = {}
      this.listenScroll = true
      this.listHeight = []
      this.probeType = 3
    },
    computed: {
      // 右侧快速导航
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      fixedTitle () {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    methods: {
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
      },
      refresh() {
        this.$refs.listview.refresh()
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      _scrollTo(index) {
        // 当点击快速入口头部和最尾部 index 为 null 不会跳转
        // console.log(index)
        if (!index && index !== 0) {
          return
        }
        // 边界判断
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        // 当点击时高亮也要跟着变换
        this.scrollY = -this.listHeight[index]
        // 第二个参数表示要不要动画时间
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      },
      // 定义一个计算每个group高度的方法
      _calculateHeight() {
        // 定义一个高度的数组  每个元素所对应的高度数组
        this.listHeight = []
        const list = this.$refs.listGroup
        // 初始化高度为0
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectItem(item) {    // 向外派发数据
        this.$emit('select', item)
      }

    },
    watch: {
      // 当数据变化了调用计算高度
      data() {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        // 当滚动到顶部，newY>0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }

        // 在中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          // 确定高度的上下限
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          // 如果落在两个高度之间
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }

        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
        // console.log(this.currentIndex)
      },
      diff (newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        // diff 实时变化 修改
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    components: {
      Scroll,
      Loading
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
          font-weight bold
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
