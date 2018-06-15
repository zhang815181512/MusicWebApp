# chap02_开发准备

## 初始化项目
使用`vue-cli`脚手架创建项目中的一些选择说明
* `Vue build`
    * `runtime + compiler`：推荐大多数选择，默认
    * `runtime-only`：小了6kb（min+gzip），省略了模板编译过程，依赖于.vue文件的开发

## 项目结构
```
- stylus
  - variable.styl 定义项目开发的规范 
```