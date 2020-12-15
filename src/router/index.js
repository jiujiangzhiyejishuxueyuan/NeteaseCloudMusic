import Vue from 'vue'
import VueRouter from "vue-router";
import {reqUserPlaylist} from "@/api";
import home from "@/views/home/home";
import {LoadingBar,Message} from "view-design";

Vue.use(VueRouter)
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
const routerReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    return routerReplace.call(this, location).catch(error => error)
}
export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/music' /*主页*/
            , component: home
        },
        {
            path: '/my', /*我的*/
            beforeEnter(to, from, next) {
                let userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || ''
                if (userInfo) {
                    reqUserPlaylist(userInfo.userId).then(res => {
                        let id = res.playlist[0].id
                        next({path: `/my/m/playlist?id=${id}`})
                    })
                } else {
                    LoadingBar.finish();
                    Message.warning('请先登陆')
                    next(false)
                }
            }
        },
        {
            path: '/my/m', /*我的音乐*/
            component: () => import('@/views/my-music/my-music'),
            children: [
                {
                    name: 'my-singer', /*我的歌手*/
                    path: 'artist',
                    component: () => import('@/views/my-music/my-singer/my-singer'),
                    meta: {
                        headerFixd: true,
                        hiddenFooter: true,
                        title: '我的歌手'
                    }
                },
                {
                    name: 'my-mv', /*我的视频*/
                    path: 'mv',
                    component: () => import('@/views/my-music/my-video/my-video'),
                    meta: {
                        headerFixd: true,
                        hiddenFooter: true,
                        title: '我的视频'
                    }
                },
                {
                    name: 'my-playlist', /*我的歌单*/
                    path: 'playlist',
                    component: () => import('@/views/playlist/detail/detail'),
                    meta: {
                        headerFixd: true,
                        hiddenFooter: true
                    }
                },
                {
                    name: 'my-dj', /*我的电台*/
                    path: 'dj',
                    component: () => import('@/views/my-music/my-dj/my-dj'),
                    meta: {
                        headerFixd: true,
                        hiddenFooter: true,
                        title: '我的电台'
                    }
                },
                {
                    path: '',
                    redirect: 'artist'
                }
            ]
        },
        {
            name: 'recommend', /*每日推荐*/
            path: '/music/recommend',
            component: () => import('@/views/recommend/recommend')
        },
        {
            name: 'toplist', /*排行榜*/
            path: '/music/toplist',
            component: () => import('@/views/toplist/toplist'),
            meta: {
                headerFixd: true,
                hiddenFooter: true,
                title: '排行榜'
            }
        },
        {
            name: 'song', /*歌曲详情*/
            path: '/music/song/:id',
            component: () => import('@/views/song/song')
        },
        {
            name: 'album', /*专辑详情*/
            path: '/music/album/:id',
            component: () => import('@/views/album/album')
        },
        {
            name: 'artist', /*歌手列表*/
            path: '/music/artist',
            component: () => import('@/views/artist/artist'),
            meta: {
                title: '歌手'
            }
        },
        {
            path: '/music/artist/:id', /*歌手详情*/
            component: () => import('@/views/singer/index'),
            children: [
                {
                    name: 'singer',
                    path: '',
                    component: () => import('@/views/singer/singer')
                },
                {
                    path: 'song', /*歌手歌曲*/
                    component: () => import('@/views/singer/singer-song')
                },
                {
                    path: 'album', /*歌手专辑*/
                    component: () => import('@/views/singer/singer-album')
                },
                {
                    path: 'mv', /*歌手mv*/
                    component: () => import('@/views/singer/singer-mv')
                },
                {
                    path: 'desc', /*歌手简介*/
                    component: () => import('@/views/singer/desc')
                },
            ]
        },
        {
            path: '/user', /*用户页*/
            component: () => import('@/views/user/user'),
            children: [
                {
                    name: 'user-home', /*用户主页*/
                    path: 'home',
                    component: () => import('@/views/user/home/home')
                },
                {
                    name: 'follows', /*关注用户*/
                    path: 'follows',
                    component: () => import('@/views/follows/follows')
                },
                {
                    name: 'followeds', /*被关注用户*/
                    path: 'followeds',
                    component: () => import('@/views/user/followeds/followeds')
                },
                {
                    name: 'dynamic',
                    path: 'dynamic',
                    component: () => import('@/views/user/dynamic/dynamic')
                },
                {
                    path: '',
                    redirect: 'home',
                }
            ]
        },
        {
            name: 'mv', /*mv页*/
            path: '/mv',
            component: () => import('@/views/mv/index'),
            meta: {
                title: 'mv'
            }
        },
        {
            path: '/mv/all', /*全部mv*/
            component: () => import('@/views/mv/mv-all/mv-all'),
            meta: {
                title: '全部mv'
            }
        },
        {
            name: 'mv-rank-list-view', /*mv排行榜*/
            path: '/mv/rank',
            component: () => import('@/views/mv/mv-rank/mv-rank'),
            meta: {
                title: 'mv排行榜'
            }
        },
        {
            name: 'mv-player', /*mv播放页*/
            path: '/mv/:id',
            component: () => import('@/views/mv/mv-player/mv-player')
        },
        {
            name: 'video', /*视频页*/
            path: '/video',
            component: () => import('@/views/video/video'),
            meta: {
                title: '视频'
            }
        },
        {
            name: 'video-player', /*视频播放页*/
            path: '/video/:id',
            component: () => import('@/views/video-player/video-player')
        },
        {
            name: 'playlist', /*歌单页*/
            path: '/music/playlist',
            component: () => import('@/views/playlist/playlist'),
            meta: {
                title: '歌单'
            }
        },
        {
            name: 'playlistDedail', /*歌单详情页*/
            path: '/music/playlist/:id',
            component: () => import('@/views/playlist/detail/detail')
        },
        {
            name: 'player', /*音乐播放器*/
            path: '/music/player',
            component: () => import('@/views/player/player'),
            meta: {
                hidden: true,
                title: '播放器'
            }
        },
        {
            name: 'search', /*搜索页*/
            path: '/music/search',
            component: () => import('@/views/search/search'),
            meta: {
                title: '搜索'
            }
        },
        {
            name: 'my-music', /*我的音乐*/
            path: '/my/music',
            component: () => import('@/views/my-music/my-music')
        },

        {
            path: '/',
            redirect: '/music'
        },
        {
            name: '404',
            path: '*',
            component: () => import('@/views/not-found/index')
        }
    ],
    scrollBehavior() {
        return {x: 0, y: 0}
    }
})
