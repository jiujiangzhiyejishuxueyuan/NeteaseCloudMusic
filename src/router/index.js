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
            , component: () => import ("@/views/music/index"),
            children: [
                {
                    path: '',
                    name: 'music',
                    component: () => import('@/views/home/home')
                },

                {
                    name: 'playlistDedail',
                    path: 'playlist/:id',
                    component: () => import('@/views/playlist/detail/detail')
                }
            ]
        },
        {
            path: '/my',
            component: () => import('@/views/m/m'),
        },
        {
            name: 'my',
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
            component: () => import('@/views/singer/singer')
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
            name: 'videoPlayer',
            path: '/video/:id',
            component: () => import('@/views/video-player/video-player')
        },
        {
            name: 'playlist',
            path: '/music/playlist',
            component: () => import('@/views/playlist/playlist'),
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
            path:'*',
            component: () => import('@/views/not-found/index')
        }
    ],
    scrollBehavior() {
        return {x: 0, y: 0}
    }
})
