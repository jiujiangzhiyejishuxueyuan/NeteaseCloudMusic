<template>
    <div id="not-found">
        <div class="container">
            <img src="http://cdnmusic.migu.cn/v3/static/img/common/error/404.gif" alt="">
            <p>{{s}}秒后自动跳转</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                s: 3
            }
        },
        mounted() {
            setInterval(() => {
                this.s--
                if(this.s===0) {
                    this.$router.replace('/music')
                }
            },1000)
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    #not-found
        .container
            min-width 1200px
            overflow hidden
            img
                margin 150px auto
</style>
