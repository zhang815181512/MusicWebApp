# chap03_项目骨架
## 准备
```npm
npm install babel-runtime --save  // 转译ES6的语法
npm install fastclick --save  // 解决移动端加载点击延迟的问题
npm install babel-polyfill --save-dev  // 对ES6的一些API进行补充转译，如Promise

```
## 页面入口 `main.js`
```javascript
import 'babel-polyfill'

import fastclick from 'fastclick'

fastclick.attach(document.body)  // 引入后，点击事件行为就没有300ms延迟
```

## header组件的编写
* 组件注册成标签的路径
  * 相对路径
    `import MHeader from './components/m-header/m-header'`
  * 直接路径走
    `import MHeader from 'components/m-header/m-header'`
    需要修改 `webpack.base.conf.js`别名的配置
    
      ```
      // line 36
        alias: {  // 别名配置
          'vue$': 'vue/dist/vue.esm.js',
          //'@': resolve('src'),   // 一般如此导向@开始指向src开始，默认配置
      +    'src': resolve('src'),
      +    'common': resolve('src/common'),
      +    'components': resolve('src/components')
        }
      ```

## 路由配置
三步：创建组件 --> 引入相关组件 --> 配置routes对象
router-link 就可以指向跳转


## 顶部导航组件开发
```vue
// tag是router-link的一个属性，指代其渲染成什么标签。默认是a标签
<router-link tag="div" class="tab-item" to="/recommend"> 
  <span class="tab-link">推荐</span>
</router-link>
```

## 问题点
* 对于引入"variable.styl"的差异
```
// * App.vue 引入 @import "common/stylus/variable.styl"
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/variable.styl"

  ......
</style>

----------------------------------------------------------

// * tab.vue 引入 @import "~common/stylus/variable.styl"
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/variable.styl"
  
  ......
</style>

解答：
 ~ 是 stylus-loader 到东东，参考 https://github.com/shama/stylus-loader
 ~common 表示相对 common，然后我们在 webpack 配置了 common 的 alias，就能找到了它的路径了
```
问题点网页：
[在vue文件中@import引入外部stylus文件，为什么路径前要加“~”，否则报错？](https://segmentfault.com/q/1010000013261784)
[~common 表示相对 common](https://coding.imooc.com/learn/questiondetail/12639.html)

## 不同点
```
同样是引入variable.styl

如果使用相对路径
@import "../../common/stylus/variable.styl"
使用配置路径
@import "~common/stylus/variable.styl"
```
