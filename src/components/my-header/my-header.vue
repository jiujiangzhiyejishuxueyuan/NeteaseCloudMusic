<template>
    <header :class="{fixd:$route.meta.headerFixd}" >
        <div class="header flex container">
            <div class="logo" @click="$router.replace('/music')">
                <h1 v-if="$route.path!=='/music/search'">网易云音乐</h1>
            </div>
            <div class="header-left">
                <ul class="nav-container flex" v-if="$route.path!=='/music/search'">
                    <li
                            class="top-item"
                            :class="{active: $route.path.split('/')[1]=== item.link.replace('/','')}"
                            v-for="(item,index) in navList"
                            :key="index"
                    >
                        <router-link :to="item.link">{{item.text}}</router-link>
                        <div class="header-channel music" v-if="item.chilren">
                            <ul class="flex">
                                <li v-for="(navitem,index) in item.chilren" :key="index">
                                    <router-link :to="navitem.link"
                                                 class="flex direction-column"
                                    >
                                        <Icon
                                                :type="navitem.icon"
                                                :class="{active: $route.path=== navitem.link}"
                                        />
                                        {{navitem.text}}
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="header-right flex justify-end align-center">
                <div class="header-right-container flex">
                    <!--                    搜索-->
                    <div class="search flex align-center" v-if="$route.path!=='/music/search'">
                        <input
                                type="text"
                                @keydown.enter="search"
                                id="search_ipt"
                                placeholder=""
                                v-model="keywords"
                                @focus="searchTipShow = true"
                                @focusout="searchTipHidden"
                        >
                        <!--             搜索按钮           -->
                        <div @click="search" class="btn-search" title="搜索">
                            <Icon type="ios-search"/>
                        </div>
                        <!--                         搜索提示-->
                        <search-tip :keywords="keywords" v-if="searchTipShow"/>
                    </div>
                    <!--                    用户信息-->
                    <div class="user">
                        <div class="h-avatar img">
                            <img :src="userInfo.avatarUrl+'?param=80y80'"
                                 v-if="userInfo.userId&&!userInfo.defaultAvatar"
                                 title="我的主页"
                                 alt="我的主页"
                                 @click="$router.push(`/user/home?id=${userInfo.userId}`)"
                            >
                            <img src="../../static/imgs/no-login.png" alt="" v-else>
                        </div>
                        <div class="info-box">
                            <div class="no-login" v-if="!userInfo.userId">
                                <div class="title">
                                    暂未登陆
                                </div>
                                <div class="btns flex justify-between">
                                    <div class="button active" @click="loginShow = true">
                                        登陆
                                    </div>
                                    <div class="button">
                                        注册
                                    </div>
                                </div>
                            </div>
                            <div class="islogin" v-else>
                                <div class="info-inner">
                                    <div class="avatar img" @click="$router.push(`/user/home?id=${userInfo.userId}`)">
                                        <img :src="userInfo.avatarUrl+'?param=80y80'" alt="我的主页" title="我的主页">
                                    </div>
                                    <p class="username">
                                        {{userInfo.nickname}}
                                        <Icon type="md-male" />
                                    </p>
                                </div>
                                <div class="control flex justify-between">
                                    <span>设置</span>
                                    <span @click="logout">退出</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <login @loginClose="loginShow=false" v-if="loginShow"/>
    </header>
</template>

<script>
    import login from "@/components/login/login";
    import searchTip from '@/components/search-tip/search-tip'
    import {logout, reqLoginState, reqUserInfo, searchDefault} from "@/api";

    export default {
        components: {
            login,
            searchTip
        },
        inject: ['reload'],
        data() {
            return {
                navList: [
                    {
                        text: '发现音乐',
                        link: '/music',
                        chilren: [
                            {
                                link: '/music/playlist',
                                text: '歌单',
                                icon: 'ios-musical-note-outline'
                            },
                            {
                                link: '/music/toplist',
                                text: '排行榜',
                                icon: 'md-list'
                            },
                            {
                                link: '/music/artist',
                                text: '歌手',
                                icon: 'md-person'
                            },
                            // {
                            //     link: '/music/dj',
                            //     text: '个人电台',
                            //     icon: 'ios-headset-outline'
                            // },
                        ]
                    },
                    {
                        text: '我的音乐',
                        link: '/my'
                    },
                    {
                        text: '视频',
                        link: '/video',
                        chilren: [
                            {
                                link: '/video',
                                text: '视频',
                                icon: "logo-youtube"


                            },
                            {
                                link: '/mv',
                                text: 'Mv',
                                icon: "ios-videocam"
                            }
                        ]
                    },
                    // {
                    //     text: '朋友',
                    //     link: '/friend'
                    // }
                ],
                loginShow: false,
                userInfo: '',
                keywords: '',
                searchTipShow: false,
                placeholder: ''
            }
        },
        methods: {
            logout() {
                logout().then(() => {
                    this.userInfo = ''
                    this.reload()
                })
            },
            search() {
                window.open(`/music/search?keywords=${this.keywords}&type=1`)
            },
            searchTipHidden() {
                setTimeout(() => this.searchTipShow = false, 100)
            }
        },
        created() {
              reqLoginState().then(res => {
                if (res.code === 200) {
                  reqUserInfo(res.profile.userId).then(res => {
                    this.userInfo = res.profile
                    this.userInfo.level = res.level
                  })
                }
              }).catch(err => {
                err.toString()
                // this.loginShow = true
              })

            searchDefault().then(res => {
                this.placeholder = res.data.showKeyword
                this.keywords = res.data.realkeyword
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $red = #E60026
    header
        color #A0A0A0
        z-index 99
        box-shadow 0 2px 10px rgba(0,0,0,.1)
        &.fixd
            background #fff
            position fixed
            top 0
            left 0
            width 100%
        .header
            margin 0 auto
            max-width 1400px
            height 70px
            line-height 70px
            .logo
                cursor pointer
                width 170px
                height 100%
                color #000
                background url("../../static/imgs/topbar.png")
                h1
                    display inline
                    font-size 20px
                    font-weight 600
        .header-left
            margin-left 30px
            .top-item:hover .header-channel
                display block
            .header-channel
                display none
                position absolute;
                top 70px
                left 0
                z-index 99
                padding 0 30px
                border-radius 5px
                box-shadow 0 2px 10px rgba(0,0,0,.1)
                background #fff
                li
                    &:hover
                        background rgba(0,0,0,.05)
                    a
                        display: block;
                        width: 80px;
                        height: 70px;
                        padding-top: 10px;
                        text-align: center;
                        font-size: 14px;
                        color: #999;
                        padding-bottom 20px
                        line-height normal

                    i
                        display block
                        font-size 24px
                        margin-bottom 5px
                        &.active
                            color $red
            .nav-container
                li
                    cursor pointer
                    &:hover
                        color #333
                    &.active
                        color $red
                    &.top-item
                        position relative
                        padding 0 20px
                        >a
                            display block
                            width 100%
                            height 100%
        .header-right
            flex 1 0 auto
            .user
                height 40px
                width 40px
                position relative
                .h-avatar
                    cursor pointer
                    width 100%
                    height 100%
                    border-radius 50%
                    overflow hidden

                &:hover
                    .info-box
                        display block
                .info-box
                    display none
                    width 360px
                    background #fff
                    z-index 33
                    position absolute
                    top 40px
                    right -10px
                    padding 20px
                    border-radius 10px
                    box-shadow 0 2px 6px rgba(0,0,0,.1)
                    .no-login
                        line-height normal
                        .title
                            line-height 70px
                            color #000
                        .btns
                            padding 0 50px
                    .info-inner
                        .avatar
                            cursor pointer
                            margin 0 auto
                            width 40px
                            height 40px
                            overflow hidden
                            border-radius 50%

                        .username
                            color #666
                            font-size 14px
                            .ivu-icon-md-male
                                margin-left 5px
                                font-size 16px
                                color #3E76F6
                            .level
                                display: inline-block;
                                height: 19px;
                                overflow: hidden;
                                padding-left: 29px;
                                line-height: 21px;
                                color: #e03a24;
                                font-size: 14px;
                                font-weight: bold;
                                font-style: italic;
                                background url("../../static/imgs/icon.png") no-repeat -135px -190px

                    .control
                        height 20px
                        line-height normal
                        span
                            cursor pointer
                            display block
            .search
                height 40px
                margin-right 40px
                padding 0 40px 0 22px
                background-color #f2f2f2
                border-radius 40px
                position relative

                .search-tip
                    margin-top 40px

                .btn-search
                    position absolute
                    top 0
                    right 0
                    transition all .3s
                    cursor pointer
                    width 40px
                    height 40px
                    text-align center
                    font-size 25px
                    line-height 40px
                    background-color #f2f2f2
                    border-radius 40px
                    &:hover
                        color $red
                input
                    width 238px
                    height 20px
                    padding 10px 0
                    outline 0
                    border 0
                    transition width .6s
                    background-color #f2f2f2
                    color #333
                    font-size 14px

</style>
