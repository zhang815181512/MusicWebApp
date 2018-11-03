/*
* 当前组件： singer-detail.vue Pages
*/
<template>
  <transition name="slide">  <!--为了体验更好添加跳转动画-->
    <div class="singer-detail">
      singer-detail Pages
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {},
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .singer-detail
    position fixed
    z-index 100
    top 0
    right 0
    bottom 0
    left 0
    background $color-background
  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
