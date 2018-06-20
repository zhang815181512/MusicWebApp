# chap04_推荐页面开发

## 轮播图数据
打开QQ音乐手机版本，查看请求 Network --> XHR 得到发送的请求路径 (Response中可以看到请求过来的数据)
```
// header 中的 Request URL
https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?
g_tk=1557387597&uin=935713472&format=json&
inCharset=utf-8&outCharset=utf-8&notice=0&
platform=h5&needNewCode=1&_=1529480311041
```

### 封装JSONP
* JSONP简介及原理
   * 写js的时候，我们会在script标签里面引入我们需要的js文件，有自己网站上的，也有别的网站上的，不管哪个网站上的js文件，只要引入了，都可以去运行，丝毫不受同源策略的影响。
   * jspon能够跨域，发送的不是ajax请求，利用动态创建script标签，受同源策略的影响。
   * src指向请求的服务端地址。 
      * 请求参数 `url ? callback = abc`  
      * 服务端返回格式 `abc( json )`  
      * 前端定义abc方法,可接受到数据。 `function(data){ console.log(data) }`

* 安装
```npm
npm install jsonp --save
```

* 封装
```javascript
//--------------------src/commom/js/jsonp.js---------------------

import originJsonp from 'jsonp'

// 封装 JSONP
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
```

### 获取数据
* [参考博客](vue2.0jsonp获取数据)

* 常量的配置 `src\api\config.js`

```javascript
// config.js 常量的配置
export const commonParams = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}
export const options = {
  param: 'jsonpCallback'
}
export const ERR_OK = 0
```

* 封装网络请求方法 `src\api\recommend.js`

```javascript
// recommend.js 封装网络请求方法
import jsonp from 'common/js/jsonp'
// 不使用{jsonp}因为jsonp.js导出使用的是export default
import {commonParams, options} from './config'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
 /*
  * Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。
  *       将返回目标对象。
  *   语法 Object.assign(target, ...sources)
  *       target 目标对象
  *       sources 源对象
  *    如果目标对象中的属性具有相同的键，则属性将被源中的属性覆盖。
  *    后来的源的属性将类似地覆盖早先的属性。
  * */
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
```

* 推荐界面 `recommend.vue` 获取banner数据

```javascript
// 引入网络api    import {getRecommend} from 'api/recommend'  
//     需要增加 `webpack.base.conf.js`别名的配置 ---> 'api': resolve('src/api')
// 钩子函数created(){}
// 方法 methods:{ }
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
  data() {
    return {
      recommends: []
    }
  },
  created() {
    this._getRecommend()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data)
          this.recommends = res.data.slider
        }
      })
    }
  }
}
```

## 轮播图组件
### slider基础组件开发
```
// 涉及到的文件有
src/base/slider/slider.vue
src/common/js/dom.js
src/components/recommend/recommend.vue

把slider作为基础的组件开发


<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>
</template>

// <slot></slot>把内容显示出来

mounted周期中 创建setTimeout延时20ms(页面刷新时间大概为17ms)  也可以使用nextTick方法

this._setSliderWidth()  ---> 设置容器的宽度
this._initSlider() ---> 初始化BScroll对象

dom.js ---> 定义一些DOM操作的方法
    hasClass   -- 正则判断
    addClass
```
