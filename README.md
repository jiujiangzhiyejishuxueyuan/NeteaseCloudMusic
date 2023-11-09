# AliMusic 项目太久未维护，已废弃
#### api地址: https://github.com/Binaryify/NeteaseCloudMusicApi
#### 项目预览地址:http://music.pengwenli.top/ 最后打包时间 12.11
#### 本地运行此项目前请先运行api 并在vue.config.js中填入地址
### 项目简介
##### 好看又好用，确定不试试吗？使用Vuejs开发的pc端在线音乐播放平台,与其他平台相比，拥有更好看的样式，更优雅的交互，同时支持视频在线播放，且在用户体验比较重要的地方都添加了骨架屏,在有限的带宽中做到了最佳的体验,适配大中(1550)小(1200)屏幕，旨在为用户提供更佳的音乐、视频播放体验

### 技术栈
- MVVM框架：Vue.js (2.x)
- 前端路由：Vue Router
- 数据获取：axios
- 构建工具：webpack
- css预编译：stylus

### 已实现功能
- 每日推荐
- 排行榜
- 歌手列表
- 歌手详情
- 歌单列表
- 歌单详情
- 歌曲详情
- 专辑详情
- 视频列表
- 用户详情
- 音乐播放器
- 视频播放、mv播放
- 搜索音乐、歌单、用户、视频、mv、专辑、歌词、电台
- 用户动态

### 组件列表
- album-list：专辑列表组件
- comment-edit: 评论框组件
- comment-list: 评论列表组件
- fix-btn：固定按钮组件
- login：登录框组件
- mv-list：mv列表组件
- mv-rank-list：mv排行榜组件
- my-footer：全局底部组件
- my-header：全局头部组件
- play-list： 歌单列表组件
- playlist-control： 歌单控制组件
- singer-list：歌手列表组件
- song-control：歌曲控制组件
- song-list：歌曲列表组件
- user-card：作者卡片组件
- user-list： 用户列表组件
- v-player：视频播放器组件
- video-control：视频互动组件
- video-list： 视频列表组件
- video-related： 相关视频列表组件
- lyric：歌词组件
- dynamic-list: 动态列表组件
- xxx-ske：骨架屏组件

#### 更新日志
###### 6.11已实现播放歌曲功能
###### 6.16实现播放视频功能
###### 6.22增加用户页,歌手分类页,排行榜页,修复歌词异常,使用路由切换过渡
###### 6.28增加歌手详情页，骨架屏
###### 7.1增加mv播放页,优化视频播放体验
###### 7.6增加mv列表页面
###### 7.8增加歌曲详情页,完善歌手页,增加页面title
###### 7.12增加专辑详情页,修改播放歌曲逻辑,完善歌单功能
###### 7.21优化首屏加载
###### 11.27全面更新圆角卡片样式 老版样式看 http://oldmusic.pengwenli.top/

## 依赖安装
```
npm install
```

### 项目加载
```
npm run serve
```

### 项目打包
```
npm run build
```
