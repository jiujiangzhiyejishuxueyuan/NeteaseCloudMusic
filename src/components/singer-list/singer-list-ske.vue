<template>
    <ul id="singer-list-ske" class="flex flex-wrap singer-list">
        <li class="singer-item" v-for="index in num" :key="index">
            <div class="cover ske-ani"></div>
            <div class="ske-name ske-ani"></div>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "singer-list-ske",
        props: {
            num: {
                type: Number,
                default: () => 20
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #singer-list-ske
    .ske-name
        border-radius 10px
        margin-top 10px
        height 25px

</style>