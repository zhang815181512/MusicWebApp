/*
 *  Created by : ZhaoJiandong
 *  Modified time: 2018/11/3 11:58
 */

import * as types from './mutation-types'

// import {SET_SINGER} from './mutation-types'
// export default {
//   [SET_SINGER](state, {setSinger}) {
//     state.singer = setSinger
//   }
// }

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc
  }
}

export default mutations
