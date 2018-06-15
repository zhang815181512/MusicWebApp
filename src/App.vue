<template>
  <div id="app">
    <MHeader></MHeader>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  export default {
    components: {
      MHeader
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/variable.styl"
  #app
    color $color-theme
</style>
