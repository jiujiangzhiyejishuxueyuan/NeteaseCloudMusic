<template>
    <div id="user">
        <div class="header-info">
            <div class="background-blur" v-if="user">
                <img :src="(user.profile.backgroundUrl||user.profile.avatarUrl)+'?param=100y100'">
            </div>
            <div class="container header-inner flex">
                <div class="avatar-box" @click="$router.replace(`/user/home?id=${user.profile&&user.profile.userId}`)">
                    <img :src="user.profile&&user.profile.avatarUrl+'?param=400y400'" alt="" title="主页">
                </div>
                <div class="info-inner" v-if="user.profile">
                    <div class="info-inner-header flex align-center">
                        <span class="user-name">
                            {{user.profile.nickname}}
                        </span>
                        <span class="user-type vip" v-if="user.profile.vipType===10" title="付费音乐包"></span>
                        <span class="user-type svip" v-if="user.profile.vipType===11" title="黑胶会员"></span>
                        <span class="lv" :title="'等级'+user.level">
                            <i>lv.</i>{{user.level}}
                        </span>
                        <span class="gender man" v-if="user.profile.gender===1" title="男"></span>
                        <span class="gender woman" v-if="user.profile.gender===2" title="女"></span>
                        <div class="control flex" v-if="userInfo&&(userInfo.userId!==user.profile.userId)">
<!--                            <span class="message item">发消息</span>-->
                            <span class="follow item" v-if="!user.profile.followed" @click="follow(1)">关注</span>
                            <span class="followed item" v-else @click="follow(0)"><span class="t">已关注</span> <span class="t-h">取消关注</span></span>
                        </div>
                        <router-link :to="`/music/artist/${user.profile.artistId}`" class="artist block"
                                     v-if="user.profile.artistId">查看歌手页
                        </router-link>
                    </div>
                    <div class="info-user-type flex flex-wrap">
                        <div class="authen flex" v-for="(anthen,index) in user.profile.allAuthTypes" :key="index">
                            <i class="sign" :class="anthen.type===4?'person':'v'" v-if="anthen.desc" title="官方认证"></i>
                            {{anthen.desc}}
                            <span class="tag" v-for="(tag,index) in anthen.tags" :key="index">{{tag}}</span>
                        </div>
                    </div>
                    <div class="info-count flex">
                        <div class="item event-count" @click="$router.push(`/user/dynamic?id=${user.profile.userId}`)">
                            <span class="count">{{user.profile.eventCount}}</span>
                            <span class="title">动态</span>
                        </div>
                        <div class="item follow-count" @click="$router.push(`/user/follows?id=${user.profile.userId}`)">
                            <span class="count">{{user.profile.follows}}</span>
                            <span class="title">关注</span>
                        </div>
                        <div class="item followed-count" @click="$router.push(`/user/followeds?id=${user.profile.userId}`)">
                            <span class="count">{{user.profile.followeds}}</span>
                            <span class="title">被关注</span>
                        </div>
                    </div>
                    <div class="signature ellipse" :title="user.profile.signature">个人简介：{{user.profile.signature || '无'}}</div>
                    <div class="area" v-if="user.profile.province">
                        地区: {{areaList.province_list[user.profile.province]}}-{{areaList.city_list[user.profile.city]?areaList.city_list[user.profile.city]:areaList.county_list[user.profile.city]}}
                        <span class="age" v-if="user.profile.birthday>0">年龄: {{birthday}}后</span>
                    </div>
                    <div class="social flex" v-if="user.bindings.url">
                        社交网络: <a :href="user.bindings.url" target="_blank" title="新浪微博"></a>
                    </div>

                </div>
            </div>
        </div>
        <transition name="view">
            <router-view :user="user.profile"></router-view>
        </transition>
    </div>
</template>

<script>
    import {reqLoginState, reqUserInfo} from "@/api";
    import areaList from '@/api/area-list'
    import {follow} from "@/api";

    export default {
        data() {
            return {
                user: '',
                areaList,
                userInfo: ''
            }
        },
        created() {
            reqLoginState().then(res => {
                this.userInfo = res.profile
            }).catch(err => {
              err.toString()
            })
            this.render()
        },
        inject:['reload'],
        methods: {
            render() {
                this.id = this.$route.query.id
                let id = this.id
                reqUserInfo(id).then(res => {
                    document.title = res.profile.nickname + ' - 用户 - 网易云音乐'
                    this.user = res
                    this.user.bindings.forEach(item => {
                        if (item.url) {
                            this.user.bindings = item
                        }
                    })
                }).catch(() => this.$router.replace({name:'404'}))
            },
            follow(t) {
                follow(this.user.profile.userId,t).then(() => {
                    this.user.profile.followed = !this.user.profile.followed
                })
            }
        },
        computed: {
            birthday() {
                let year = new Date(this.user.profile.birthday).getFullYear()
                year = year % 100
                if(year%10>=5) {
                    return year-year%10 + 5
                } else {
                    return year-year%10 || '00'
                }
            }
        },
        watch: {
            $route() {
                this.render()
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $red = #E91E63
    #user
        .section-header
            text-align left
            position relative
            border-bottom 2px solid $red
            margin 0 0 20px 0
            .section-header-title
                font-size 24px
        .my-playlist
            margin-top 20px
            .songlist-inner
                margin-bottom 10px
        .record
            .section-header
                margin 0
            .record-footer
                color #666
                font-size 14px
                padding 5px 0
                text-align right
            .control
                position absolute
                right 0
                top 10px
                .item
                    cursor pointer
                    &.disabled
                        color #999999
                        &:hover
                            color #000
            .total
                margin-left 10px
                font-size 14px
        .header-info
            margin-bottom 40px
            padding 60px 0
            position relative
            .background-blur
                position absolute;
                top 0
                right 0
                bottom 0
                left 0
                overflow hidden
                opacity .3
                z-index -1
                img
                    width 100%
                    filter blur(30px)
            .avatar-box
                cursor pointer
                width 20%
                img
                    width 100%

            .info-inner
                margin-left 30px
                text-align left
                width 78%
                .social
                    margin-top 10px
                    color #666
                    line-height 22px
                    a
                        margin-left 5px
                        display block
                        width 20px
                        height 20px
                        background url("../../static/imgs/weibo.png")
                .area
                    margin-top 10px
                    font-size 13px
                    color #666
                    .age
                        margin-left 20px
                .signature
                    margin-top 20px
                    font-size 13px
                    color #666
                .info-count
                    margin-top 6px
                    color  #666
                    text-align center
                    .item
                        border-left 1px solid rgba(0,0,0,.2)
                        min-width 100px
                        height 50px
                        cursor pointer
                        .count
                            font-size 24px
                        &>span
                            display block
                        &:hover
                            color $red
                        &.event-count
                            border none
                .info-user-type
                    margin-top 10px
                    padding-bottom 10px
                    border-bottom 1px solid rgba(0,0,0,.1)
                    .authen
                        margin-right 20px
                    .tag
                        font-size 12px
                        color rgba(0,0,0,.4)
                        margin-left 10px
                        padding 0 2px
                        border 1px solid rgba(0,0,0,.4)
                    .sign
                        display block
                        width 68px
                        height 20px
                        margin-right 5px
                        background url("../../static/imgs/icon.png")
                        &.person
                            background-position 150px -480px
                        &.v
                            background-position 0 -480px
                .info-inner-header
                    position relative
                    .user-type
                        display block
                        height 36px
                        margin-left 15px
                        background-size 100% 20px
                        background-repeat no-repeat
                        background-position center
                        &.svip
                            width 38px
                            background-image url(http://p1.music.126.net/DjfcGsYjT1HqrIQk9YdV7Q==/109951163322550511.png)
                        &.vip
                            width 20px
                            background-image url(http://p1.music.126.net/l81wKgnHwl3n0ayI7iVVXA==/109951163322560971.png)
                    .lv
                        border 1px #e03a24 solid
                        border-radius 10px
                        margin-left 15px
                        display block
                        height 19px
                        overflow hidden
                        padding  0 10px
                        line-height 19px
                        color #e03a24
                        font-size 14px;
                        font-style italic
                        font-weight 600
                        i
                            font-size 16px
                            font-weight 700
                    .gender
                        width 20px
                        height 20px
                        margin-left 15px
                        &.man
                            background url("../../static/imgs/man.png")
                        &.woman
                            background url("../../static/imgs/woman.png")
                    .control
                        .item
                            text-align center
                            cursor pointer
                            display block
                            padding 4px 0
                            width 80px
                            margin-left 20px
                            border-radius 5px
                            border 2px solid rgba(255,255,255,.4)
                            &:hover
                                background rgba(255,255,255,.5)
                            &.followed .t-h
                                display none
                            &.followed:hover
                                .t
                                    display none
                                .t-h
                                    display inline
                    .artist
                        position absolute
                        right 0
                        padding 5px 15px
                        margin-left 100px
                        border-radius 5px
                        border 2px solid rgba(255,255,255,.4)
                        cursor pointer
                        &:hover
                            background rgba(255,255,255,.5)
                    .user-name
                        font-size 25px
                        font-weight 500
</style>
