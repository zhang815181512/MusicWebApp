/*
 *  Created by : ZhaoJiandong
 *  Modified time: 2018/11/3 11:56
 */

import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// import actions from './actions'
// import getters from './getters'

import createLogger from 'vuex/dist/logger'  // 当state修改时控制台会输出的提示

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'  // 开启编译工具

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: debug,   // 开启严格模式，检测state 的修改是否来源于 mutations
  plugins: debug ? [createLogger()] : []
})
