/*
 *  Created by : ZhaoJiandong
 *  Modified time: 2018/11/3 11:57
 */

import {playMode} from 'common/js/config'

const state = {
  singer: {},
  // 全局控制播放器的状态
  playing: false,  // 播放状态
  fullScreen: false,
  playlist: [],
  sequenceList: [],  // 顺序播放列表
  mode: playMode.sequence,   // 播放模式
  currentIndex: -1,  // 当前播放
  disc: {}  // 歌单
}

export default state
