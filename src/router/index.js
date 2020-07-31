import Vue from 'vue'
import VueRouter from "vue-router";
import {reqLoginState, reqUserPlaylist} from "@/api";
import home from "@/views/home/home";

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
            path: '/music'
            , component: home
        },
        {
            path: '/my',
            beforeEnter(to, from, next) {
                reqLoginState().then(res => {
                    let id = res.profile.userId
                    reqUserPlaylist(id).then(res => {
                        let id = res.playlist[0].id
                        next({path: `/my/m/playlist?id=${id}`})
                    })
                }).catch(() => {
                    next('/music')
                })
            }
        },
        {
            path: '/my/m',
            component: () => import('@/views/my-music/my-music'),
            children: [
                {
                    name: 'my-singer',
                    path: 'artist',
                    component: () => import('@/views/my-music/my-singer/my-singer'),
                    meta: {
                        headerFixd: true,
                        hiddenFooter: true,
                        title: '我的歌手'
                    }
                },
                {
                    name: 'my-mv',
                    path: 'mv',
                    component: () => import('@/views/my-music/my-video/my-video'),
                    meta: {
                        headerFixd: true,
                        hiddenFooter: true,
                        title: '我的视频'
                    }
                },
                {
                    name: 'my-playlist',
                    path: 'playlist',
                    component: () => import('@/views/playlist/detail/detail'),
                    meta: {
                        headerFixd: true,
                        hiddenFooter: true
                    }
                },
                {
                    name: 'my-dj',
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
            name: 'recommend',
            path: '/music/recommend',
            component: () => import('@/views/recommend/recommend')
        },
        {
            name: 'toplist',
            path: '/music/toplist',
            component: () => import('@/views/toplist/toplist'),
            meta: {
                headerFixd: true,
                hiddenFooter: true,
                title: '排行榜'
            }
        },
        {
            name: 'song',
            path: '/music/song/:id',
            component: () => import('@/views/song/song')
        },
        {
            name: 'album',
            path: '/music/album/:id',
            component: () => import('@/views/album/album')
        },
        {
            name: 'artist',
            path: '/music/artist',
            component: () => import('@/views/artist/artist'),
            meta: {
                title: '歌手'
            }
        },
        {
            path: '/music/artist/:id',
            component: () => import('@/views/singer/index'),
            children: [
                {
                    name: 'singer',
                    path: '',
                    component: () => import('@/views/singer/singer')
                },
                {
                    path: 'song',
                    component: () => import('@/views/singer/singer-song')
                },
                {
                    path: 'album',
                    component: () => import('@/views/singer/singer-album')
                },
                {
                    path: 'mv',
                    component: () => import('@/views/singer/singer-mv')
                },
                {
                    path: 'desc',
                    component: () => import('@/views/singer/desc')
                },
            ]
        },
        {
            path: '/user',
            component: () => import('@/views/user/user'),
            children: [
                {
                    name: 'user-home',
                    path: 'home',
                    component: () => import('@/views/user/home/home')
                },
                {
                    name: 'follows',
                    path: 'follows',
                    component: () => import('@/views/follows/follows')
                },
                {
                    name: 'followeds',
                    path: 'followeds',
                    component: () => import('@/views/user/followeds/followeds')
                },
                {
                    path: '',
                    redirect: 'home',
                }
            ]
        },
        {
            name: 'mv',
            path: '/mv',
            component: () => import('@/views/mv/index'),
            meta: {
                title: 'mv'
            }
        },
        {
            path: '/mv/all',
            component: () => import('@/views/mv/mv-all/mv-all'),
            meta: {
                title: '全部mv'
            }
        },
        {
            name: 'mv-rank-list-view',
            path: '/mv/rank',
            component: () => import('@/views/mv/mv-rank/mv-rank'),
            meta: {
                title: 'mv排行榜'
            }
        },
        {
            name: 'mv-player',
            path: '/mv/:id',
            component: () => import('@/views/mv/mv-player/mv-player')
        },
        {
            name: 'video',
            path: '/video',
            component: () => import('@/views/video/video'),
            meta: {
                title: '视频'
            },
            beforeEnter(to, from, next) {
                reqLoginState().then(res => {
                    next()
                }).catch(() => {
                    next('/music')
                })
            }
        },
        {
            name: 'video-player',
            path: '/video/:id',
            component: () => import('@/views/video-player/video-player')
        },
        {
            name: 'playlist',
            path: '/music/playlist',
            component: () => import('@/views/playlist/playlist'),
            meta: {
                title: '歌单'
            }
        },
        {
            name: 'playlistDedail',
            path: '/music/playlist/:id',
            component: () => import('@/views/playlist/detail/detail')
        },
        {
            name: 'player',
            path: '/music/player',
            component: () => import('@/views/player/player'),
            meta: {
                hidden: true,
                title: '播放器'
            }
        },
        {
            name: 'search',
            path: '/music/search',
            component: () => import('@/views/search/search'),
            meta: {
                title: '搜索'
            }
        },
        {
            name: 'my-music',
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
