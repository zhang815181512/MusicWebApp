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

## 顶部导航组件开发
