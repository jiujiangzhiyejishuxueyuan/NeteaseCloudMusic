<template>
    <ul id="fix-btn">
      <li  v-for="(link,index) in list"  :key="index">
        <a :href="link.url" target="_blank" :title="link.name">
          <Icon :type="link.icon"/>
        </a>
      </li>
    </ul>
</template>

<script>
    export default {
        name: "fix-btn",
        data() {
          return {
            list: [
              {
                name: 'GitHub',
                url: 'https://github.com/jiujiangzhiyejishuxueyuan/NeteaseCloudMusic',
                icon: 'logo-github'
              },
              {
                name: '播放器',
                url: '/music/player',
                icon: 'md-musical-notes'
              }
            ]
          }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #fix-btn
        position fixed
        bottom 80px
        right 30px
        z-index 9999
        font-size 40px
        a
            display block
            background rgba(0,0,0,.5)
            color #fff
            margin-bottom 2px
            z-index 9999
            padding 0 10px
            &:hover
                color #ffffff
                background rgba(0,0,0,.8)

</style>