import ajax from "@/api/ajax";

export const reqBanner = () => ajax('api/banner') //获取首页轮播图
export const reqHotSongList = (num, type) => ajax(`api/top/playlist?limit=${num}&order=${type}`) //获取热门歌单
export const reqNewAlbum = (offset, num) => ajax(`api/top/album?offset=${offset}&limit=${num}`) //获取新碟上架
export const reqTopList = (id) => ajax(`api/top/list?idx=${id}`) //获取排行榜

export const reqHotTags = () => ajax('api/playlist/hot') //获取热门歌单分类
export const reqTags = () => ajax('api/playlist/catlist') //获取歌单分类
export const reqSonglist = (num, end, cat = '全部') => ajax(`api/top/playlist/highquality?before=${end}&limit=${num}&cat=${cat}`) //根据分类获取精品歌单
export const reqplaylist = (num, offset, cat) => ajax(`api/top/playlist?limit=${num}&offset=${offset}&cat=${cat}`) //获取歌单列表
export const reqSonglistDetail = (id) => ajax(`api/playlist/detail?id=${id}`) //获取歌单详情

export const phoneLogin = (phone, pwd) => ajax(`api/login/cellphone?phone=${phone}&password=${pwd}`) //手机号登陆
export const checkRegister = (phone) => ajax(`api/cellphone/existence/check?phone=${phone}`) //检测手机号是否已注册
export const reqLoginState = () => ajax('api/login/status') //获取登陆状态
export const reqUserInfo = (id) => ajax(`api/user/detail?uid=${id}`) //获取用户信息
export const logout = () => ajax('api/logout') //退出登陆

export const reqSongDetail = (ids) => ajax(`api/song/detail?ids=${ids}`) // 获取歌曲详情
export const reqSongUrl = (id, br = 320000) => ajax(`api/song/url?id=${id}&br=${br}`) //获取歌曲url
export const reqSonglyric = (id) => ajax(`api/lyric?id=${id}`) // 获取歌曲歌词

export const search = (keywords, type, limit , offset ) => ajax(`api/search?keywords=${keywords}&type=${type}&limit=${limit}&offset=${offset}`) //搜索
export const searchHot = () => ajax('api/search/hot') //获取热搜(简略)
export const searchDefault = () => ajax('api/search/default') //获取默认搜索关键词
export const searchSuggest = (keywords) => ajax(`api/search/suggest?keywords=${keywords}`) //获取搜索建议
// export const
