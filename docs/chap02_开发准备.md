# chap02_开发准备

## 初始化项目
使用`vue-cli`脚手架创建项目中的一些选择说明
* `Vue build`
    * `runtime + compiler`：推荐大多数选择，默认
    * `runtime-only`：小了6kb（min+gzip），省略了模板编译过程，依赖于.vue文件的开发

## 项目结构
```
- src
  - common  // 定义一些开发的通用变量
    - stylus  // 定义开发通用样式
      - base.styl
      - icon.styl 
      - index.styl  样式主文件，确定个文件之间的关系
      - mixin.styl  定义混合方法
      - reset.styl  样式重置文件
      - variable.styl 定义项目开发的规范 
```
