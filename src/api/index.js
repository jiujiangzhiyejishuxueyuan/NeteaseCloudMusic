import ajax from "@/api/ajax";
import {off} from "view-design/src/utils/dom";

// 首页相关
export const reqBanner = () => ajax('api/banner') //获取首页轮播图
export const reqHotSongList = (num, type) => ajax(`api/top/playlist?limit=${num}&order=${type}`) //获取热门歌单
export const reqNewAlbum = (offset, num) => ajax(`api/top/album?offset=${offset}&limit=${num}`) //获取新碟上架
export const reqTopListDetail = (id) => ajax(`api/top/list?id=${id}`) //获取排行榜详情
export const reqTopList = () => ajax('api/toplist') //获取所有排行榜

//歌单相关
export const reqHotTags = () => ajax('api/playlist/hot') //获取热门歌单分类
export const reqTags = () => ajax('api/playlist/catlist') //获取歌单分类
export const reqSonglist = (num, end, cat = '全部') => ajax(`api/top/playlist/highquality?before=${end}&limit=${num}&cat=${cat}`) //根据分类获取精品歌单
export const reqplaylist = (num, offset, cat) => ajax(`api/top/playlist?limit=${num}&offset=${offset}&cat=${cat}`) //获取歌单列表
export const reqSonglistDetail = (id) => ajax(`api/playlist/detail?id=${id}`) //获取歌单详情
export const changeplaylistSong = (pid, type, sids) => ajax(`api/playlist/tracks?op=${type}&pid=${pid}&tracks=${sids}`) //添加或删除歌单歌曲
export const reqRecommendPlaylist = () => ajax('api/recommend/resource') //获取每日推荐歌单
export const reqPlaylistComments = (id, limit, offset, before = '') => ajax(`api/comment/playlist?id=${id}&limit=${limit}&offset=${offset}&before=${before}`) // 获取歌单评论

// 用户相关
export const phoneLogin = (phone, pwd) => ajax(`api/login/cellphone?phone=${phone}&password=${pwd}`) //手机号登陆
export const checkRegister = (phone) => ajax(`api/cellphone/existence/check?phone=${phone}`) //检测手机号是否已注册
export const reqLoginState = () => ajax('api/login/status') //获取登陆状态
export const reqUserInfo = (id) => ajax(`api/user/detail?uid=${id}`) //获取用户信息
export const logout = () => ajax('api/logout') //退出登陆
export const follow = (id, t) => ajax(`api/follow?id=${id}&t=${t}`) //关注/取关用户
export const reqUserRecord = (id, type = 1) => ajax(`api/user/record?uid=${id}&type=${type}`) //获取用户播放记录
export const reqUserPlaylist = (id) => ajax(`api/user/playlist?uid=${id}`) //获取用户歌单
export const reqUserFollows = (id, limit, offset) => ajax(`api/user/follows?uid=${id}&limit=${limit}&offset=${offset}`) //获取用户关注列表
export const reqUserFolloweds = (id, limit, lasttime) => ajax(`api/user/followeds?uid=${id}&time=${lasttime}&limit=${limit}`) //获取用户被关注列表
export const reqUserSubCount = () => ajax('api/user/subcount') // 获取用户数据


// 歌曲相关
export const reqSongDetail = (ids) => ajax(`api/song/detail?ids=${ids}`) // 获取歌曲详情
export const reqSongUrl = (id, br = 320000) => ajax(`api/song/url?id=${id}&br=${br}`) //获取歌曲url
export const reqSonglyric = (id) => ajax(`api/lyric?id=${id}`) // 获取歌曲歌词
export const likeSong = (id, type) => ajax(`api/like?id=${id}&like=${type}`) //喜欢或取消喜欢音乐
export const reqLikeSong = (id) => ajax(`api/likelist?uid=${id}`) //获取喜欢音乐列表
export const reqRecommendSongs = () => ajax('api/recommend/songs') //获取每日推荐歌曲

// 搜索相关
export const search = (keywords, type, limit, offset) => ajax(`api/search?keywords=${keywords}&type=${type}&limit=${limit}&offset=${offset}`) //搜索
export const searchHot = () => ajax('api/search/hot') //获取热搜(简略)
export const searchDefault = () => ajax('api/search/default') //获取默认搜索关键词
export const searchSuggest = (keywords) => ajax(`api/search/suggest?keywords=${keywords}`) //获取搜索建议

// 视频相关
export const reqVideoUrl = (vid) => ajax(`api/video/url?id=${vid}`) //获取视频播放地址
export const reqVideoDetail = (vid) => ajax(`api/video/detail?id=${vid}`) //获取视频详情
export const reqRelatedVideo = (vid) => ajax(`api/related/allvideo?id=${vid}`) //获取相关视频
export const reqVideoInfo = (vid) => ajax(`api/video/detail/info?vid=${vid}`) //获取视频数据详情
export const reqVideoComments = (vid, limit = 20, offset = 0) => ajax(`api/comment/video?id=${vid}&limit=${limit}&offset=${offset}`) //获取视频评论
export const subVideo = (id, t = 1) => ajax(`api/video/sub?id=${id}&t=${t}`) //收藏视频

// mv相关
export const reqRelateMv = (id) => ajax(`api/simi/mv?mvid=${id}`) // 获取相似mv
export const reqMvComments = (id, limit, offset, before = '') => ajax(`api/comment/mv?id=${id}&limit=${limit}&offset=${offset}&before=${before}`) // 获取mv评论
export const reqMvDetail = (id) => ajax(`api/mv/detail?mvid=${id}`) // 获取mv详情
export const reqSubMv = (limit) => ajax(`api/mv/sublist?limit=${limit}`) // 获取收藏mv
export const reqMvInfo = (id) => ajax(`api/mv/detail/info?mvid=${id}`) // 获取mv数据详情
export const reqMvUrl = (id) => ajax(`api/mv/url?id=${id}`) // 获取mv播放地址
export const subMv = (id, t) => ajax(`api/mv/sub?mvid=${id}&t=${t}`) // 收藏/取消收藏mv

// 评论相关
export const reqHotComments = (id, type, limit = 20, offset = 0) => ajax(`api/comment/hot?id=${id}&type=${type}&limit=${limit}&offset=${offset}`) //获取热门评论
export const giveCommentLike = (id, cid, type, t) => ajax(`api/comment/like?id=${id}&cid=${cid}&t=${t}&type=${type}`) //给评论点赞
export const submitComment = (id, type, content, t, commentId) => ajax(`api/comment?t=${t}&type=${type}&id=${id}&content=${content}&commentId=${commentId}`) //提交评论

// 歌手相关
export const reqSingerList = (type, area, initial, limit, offset) => ajax(`api/artist/list?type=${type}&area=${area}&initial=${initial}&limit=${limit}&offset=${offset}`) //获取歌手列表
export const reqSingerHotSong = (id) => ajax(`api/artist/top/song?id=${id}`) //获取歌手热门50首
export const reqSingerAlbum = (id, limit, offset) => ajax(`api/artist/album?id=${id}&limit=${limit}&offset=${offset}`) //获取歌手专辑
export const reqSingerDesc = (id) => ajax(`api/artist/desc?id=${id}`) // 获取歌手描述
export const reqSingerMv = (id, limit) => ajax(`api/artist/mv?id=${id}&limit=${limit}`) // 获取歌手mv
export const reqSingerSimi = (id) => ajax(`api/simi/artist?id=${id}`) // 获取相似歌手
export const reqSubSinger = () => ajax('api/artist/sublist') // 获取收藏歌手

// 电台相关
export const reqSubDj = (limit) => ajax(`api/dj/sublist?limit=${limit}`) // 获取收藏电台

// 其他
export const resourceLike = (id, type, t) => ajax(`api/resource/like?id=${id}&type=${type}&t=${t}`) //给电台,视频,mv点赞
