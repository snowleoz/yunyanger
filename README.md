# 项目介绍
本项目为个人项目
前端项目地址：https://github.com/snowleoz/yunyangriji <br>
后端项目地址：https://github.com/snowleoz/yunyanger_server <br>
网站数据来源：深圳领养之家；<br>

# 网站介绍
前端采用React + React-Router + React-Redux + Ant Design + Webpack构建；<br>
React组件均拆分为UI组件和容器组件，ajax请求使用了axios；<br>
使用Redux统一管理数据；<br>
对ES6语法支持，采用了按需引入babel-polyfill兼容；<br>
JS、CSS、图片，均使用webpack插件压缩、去冗余；<br>
API接口，采用strapi搭建，strapi是一套headless-CMS，可以快速搭建API接口；<br>
后端服务为Nginx作为代理转发；<br>
数据库为MongoDB，图片等静态资源存储在七牛云对象存储；<br>
数据使用Pupperteer框架构建爬虫抓取，并axios录入数据库；<br>
图片数据存储在七牛云对象存储；<br>

# 在线访问
www.yunyanger.com <br>
服务器采用AWS提供的免费Ubuntu，地址在美国，访问速度可能会受影响；<br>

# 兼容性
兼容至IE10；<br>
网站样式为响应式，PC端和移动端均可正常显示；<br>
