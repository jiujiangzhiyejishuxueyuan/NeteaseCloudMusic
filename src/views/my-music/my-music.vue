<template>
    <div class="box">
        <div class="sc"></div>
    </div>
</template>

<script>
    export default {
        name: "my-music"
    }
</script>

<style  lang="stylus" rel="stylesheet/stylus">
    .box
        width: 150px;
        height: 200px;
        overflow: scroll;
        margin: 100px;
    .sc
        width: 30px;
        height: 300px;
        margin: 0 auto;
    /*滚动条整体样式*/
    .box::-webkit-scrollbar
        width: 10px;
        height: 1px;
    /*滚动条滑块*/
    .box::-webkit-scrollbar-thumb
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #535353;
    /*滚动条轨道*/
    .box::-webkit-scrollbar-track
        -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0);
        border-radius: 10px;
        background: #ccc;

</style>