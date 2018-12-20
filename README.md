# 项目介绍
本项目为个人项目，项目地址：https://github.com/snowleoz/yunyangriji
网站数据来源：深圳领养之家；

# 网站介绍
前端采用React + React-Router + React-Redux + Ant Design + Webpack构建；
React组件均拆分为UI组件和容器组件，ajax请求使用了axios；
使用Redux统一管理数据；
对ES6语法支持，采用了按需引入babel-polyfill兼容；
JS、CSS、图片，均使用webpack插件压缩、去冗余；
API接口，采用strapi搭建，strapi是一套headless-CMS，可以快速搭建API接口；
后端服务为Nginx作为代理转发；
数据库为MongoDB，图片等静态资源存储在七牛云对象存储；
数据使用Pupperteer框架构建爬虫抓取，并axios录入数据库；

# 在线访问
www.yunyanger.com
服务器采用AWS提供的免费Ubuntu，地址在美国，访问速度可能会受影响；

# 兼容性
兼容至IE10；
网站样式为响应式，PC端和移动端均可正常显示；
