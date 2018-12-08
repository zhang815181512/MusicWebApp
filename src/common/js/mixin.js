/*
 *  当相同的代码逻辑被频繁调用的时候，就可以写在mixin.js中
 */
import {mapGetters} from 'vuex'
// import {playMode} from 'common/js/config'
// import {shuffle} from 'common/js/util'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {  // 同名的方法会被覆盖
      throw new Error('component must implement handlePlaylist method')
    }
  }
}
