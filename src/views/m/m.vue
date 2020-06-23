<template>
    <div>

    </div>
</template>

<script>
    import {reqLoginState, reqUserPlaylist} from "@/api";

    export default {
        beforeRouteEnter(to,from,next) {
            reqLoginState().then(res => {
                let id = res.profile.userId
                reqUserPlaylist(id).then(res => {
                    let id = res.playlist[0].id
                    next({path: `/my/m/playlist?id=${id}`})
                })
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
