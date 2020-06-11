<template>
    <div class="recommend-today recommend-item section">
        <div class="container">
            <div class="section-header flex justify-between">
                <div class="title">
                    <h1>个性化推荐</h1>
                </div>
            </div>
            <div class="list-box">
                <ul class="list-inner flex flex-wrap justify-between">
                    <li class="item">
                        <div class="item-box">
                            <div class="main-box">
                                <div class="title">
                                    {{today.ch}}
                                </div>
                                <div class="content">
                                    {{today.td}}
                                </div>
                            </div>
                        </div>
                        <div class="title">
                            每日歌曲推荐
                        </div>
                    </li>
                    <li class="item" v-for="index in 6" :key="index">
                        <div class="item-box">
                            <div class="main-box">
                                <img src="https://p1.music.126.net/NM8LUQLozehwPCOEDzH5Pg==/109951164960715408.jpg" alt="">
                            </div>
                            <div class="play-box">
                                <img src="../../../static/imgs/btn-play.png" alt="">
                            </div>
                            <p class="play-count">
                                <Icon type="ios-headset" />
                                100w
                            </p>
                        </div>
                        <div class="title">
                            【六一记忆】经典中国动画，臻乐重现
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        computed: {
            today() {
                let date = new Date()
                let day
                switch (date.getDay()) {
                    case 0:
                        day = "星期天";
                        break;
                    case 1:
                        day = "星期一";
                        break;
                    case 2:
                        day = "星期二";
                        break;
                    case 3:
                        day = "星期三";
                        break;
                    case 4:
                        day = "星期四";
                        break;
                    case 5:
                        day = "星期五";
                        break;
                    case 6:
                        day = "星期六";

                }
                return {
                    td: date.getDay()!=0 ? date.getDay() : 7,
                    ch: day
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .recommend-today
        .main-box
            background #FAFAFA
            .content
                font-size 100px
                color #C62F2F
</style>
