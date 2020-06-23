<template>
    <div id="my-playlist">

    </div>
</template>

<script>
    import {reqUserPlaylist} from "@/api";

    export default {
        props: {
            id: Number
        },
        data() {
            return {
                playlist: ''
            }
        },
        created() {

        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
