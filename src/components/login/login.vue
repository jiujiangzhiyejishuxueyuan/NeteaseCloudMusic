<template>
    <div class="login flex justify-center align-center">
        <div class="login-inner">
            <Icon type="md-close" @click="$emit('loginClose')" />
            <div class="title">
                登陆
            </div>
            <div class="form">
                <Input v-model="loginBody.phone" clearable size="large" placeholder="手机号" style="width: 300px" />
                <Input v-model="loginBody.pwd" password type="password" size="large" placeholder="密码" style="width: 300px" />
            </div>
            <div class="button" @click="login">登陆</div>
        </div>
    </div>
</template>

<script>
    import {checkRegister, phoneLogin} from "@/api";

    export default {
        name: "login",
        data() {
            return {
                loginBody:{
                    phone:'',
                    pwd:'',
                },
            }
        },
        inject:['reload'],
        methods: {
            login() {
                if(this.check()) {
                    checkRegister(this.loginBody.phone).then(res => {
                        if(res.exist===1) {
                            phoneLogin(this.loginBody.phone,this.loginBody.pwd).then(res=> {
                                if(res.code==200) {
                                    this.$Message.success('登陆成功')
                                    this.$emit('loginClose')
                                    this.reload()
                                    this.$store.commit('receive_userinfo',res.profile)
                                } else {
                                    this.$Message.error(res.message)
                                }
                            })
                        } else {
                            this.$Message.error('该手机号暂未注册，请先注册')
                        }
                    })

                }
            },
            check() {
                const regPhone = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
                const {loginBody} = this
                for (let key in loginBody) {
                    if(!loginBody[key].length) {
                        this.$Message.error('手机号或密码不能为空')
                        return false
                    }
                }
                if(!regPhone.test(loginBody.phone))  {
                    this.$Message.error('手机号格式错误')
                    return false
                }
                return true
            },
        },

    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.login
    position fixed
    top 0
    left 0
    z-index 1000
    width 100%
    height 100%
    background rgba(0,0,0,.4)
    .login-inner
        width 400px
        height 300px
        border-radius 10px
        background #fff
        padding 0 50px
        position relative
        .form
            margin-bottom 20px
        .ivu-icon-md-close
            position absolute
            top 0
            right 0
            display block
            width 20px
            height 20px
            border-radius 50%
            border 1px solid #333
            color #000
            font-size 20px
            cursor pointer
    .title
        padding 20px 0 30px
        font-size 20px
        color #000
    .ivu-input-wrapper
        margin-bottom 10px
    .tip
        text-align left
        color #fa4472
        font-size 12px
    .button
        width 100%
        background  #fa4472
        color #fff
        border none
</style>