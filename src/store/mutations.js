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
  }
}

export default mutations
