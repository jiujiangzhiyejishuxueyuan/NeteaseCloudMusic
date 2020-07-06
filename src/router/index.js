import Vue from 'vue'
import VueRouter from "vue-router";

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
            , component: () => import('@/views/home/home')
        },
        {
            path: '/my',
            component: () => import('@/views/m/m'),
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
                        hiddenFooter: true
                    }
                },
                {
                    name: 'my-mv',
                    path: 'mv',
                    component: () => import('@/views/my-music/my-video/my-video'),
                    meta: {
                        headerFixd: true,
                        hiddenFooter: true
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
                        hiddenFooter: true
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
                hiddenFooter: true
            }
        },
        {
            name: 'artist',
            path: '/music/artist',
            component: () => import('@/views/artist/artist')
        },
        {
            name: 'singer',
            path: '/music/artist/:id',
            component: () => import('@/views/singer/index'),
            children: [
                {
                    path: '',
                    component: () => import('@/views/singer/singer')
                },
                {
                    path: 'song',
                    component: () => import('@/views/singer/singer-song')
                }
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
            component: () => import('@/views/mv/index')
        },
        {
            path: '/mv/all',
            component: () => import('@/views/mv/mv-all/mv-all')
        },
        {
            name: 'mv-rank-view',
            path: '/mv/rank',
            component: () => import('@/views/mv/mv-rank/mv-rank')
        },
        {
            name: 'mv-player',
            path: '/mv/:id',
            component: () => import('@/views/mv/mv-player/mv-player')
        },
        {
            name: 'video',
            path: '/video',
            component: () => import('@/views/video/video')
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
        },
        {
            name: 'playlistDedail',
            path: '/music/playlist/:id',
            component: () => import('@/views/playlist/detail/detail')
        },
        {
            name: 'player',
            path: '/music/player/audio',
            component: () => import('@/views/player/player'),
            meta: {
                hidden: true
            }
        },
        {
            name: 'search',
            path: '/music/search',
            component: () => import('@/views/search/search')
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
