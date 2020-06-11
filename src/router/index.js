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
    routes:[
        {
            path: '/music'
            ,component: ()=> import ("@/views/music/index"),
            children:[
                {
                    path: '',
                    name: 'music',
                    component: () => import('@/views/home/home')
                },
                {
                    name: 'playlist',
                    path: 'playlist',
                    component: ()=> import('@/views/playlist/playlist'),
                },
                {
                    name: 'playlistDedail',
                    path: 'playlist/:id',
                    component: ()=> import('@/views/playlist/detail/detail')
                }
            ]
        },
        {
            name:'player',
            path: '/music/player/audio',
            component: ()=> import('@/views/player/player'),
            meta: {
                hidden: true
            }
        },
        {
            name:'search',
            path: '/music/'
        },
        {
            name: 'my-music',
            path: '/my/music',
            component: ()=> import('@/views/my-music/my-music')
        },
        {
            path: '/',
            redirect: '/music'
        },
    ],
    scrollBehavior () {
        return { x: 0, y: 0 }
    }
})
