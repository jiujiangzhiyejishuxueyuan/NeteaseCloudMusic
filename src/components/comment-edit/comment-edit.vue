<template>
    <div class="comment-edit flex">
        <div class="user-face img-box">
            <img :src="userInfo.avatarUrl+'?param=50y50'" alt="" v-if="userInfo.avatarUrl&&!userInfo.defaultAvatar">
            <img src="../../static/imgs/no-login.png" alt="" v-else>
        </div>
        <div class="edit-inner flex align-center">
            <textarea
                    maxlength="140"
                    class="edit-input"
                    cols="80"
                    rows="10"
                    placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。"
                    v-model="value"
            ></textarea>
            <button class="comment-submit on" @click="submitComment" v-if="userInfo&&userInfo.userId">
                发表评论
            </button>
            <button class="comment-submit disabled" v-else>请先登陆</button>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        computed: {
            ...mapState(['userInfo'])
        },
        data() {
            return {
                value: ''
            }
        },
        methods: {
            submitComment() {
                this.$emit('submit',this.value)
                this.value = ''
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $blue = #00a1d6
    $blueh = #00b5e5
    .comment-edit
        .user-face
            width 50px
            height 50px
            border-radius 50%
            overflow hidden
        .edit-inner
            margin-left 40px
            width 100%
        .comment-submit
            margin-left 10px
            width 70px
            height 64px
            padding 4px 15px
            font-size 14px
            color #fff
            border-radius 4px
            text-align center
            min-width 60px
            vertical-align top
            cursor pointer
            background-color #00a1d6
            border 1px solid #00a1d6
            transition .1s
            user-select none
            outline none
            &.disabled
                background #999999
                color #fff
                border none
            &.on:hover
                background $blueh
        .edit-input
            font-size 12px
            display inline-block
            box-sizing border-box
            background-color #f4f5f7
            border 1px solid #e5e9ef
            overflow auto
            border-radius 4px
            color #555
            width 100%!important
            height 65px
            transition 0s
            padding 5px 10px
            outline none
            line-height normal
            &:hover,&:focus
                background #fff
                border-color  $blue
</style>
