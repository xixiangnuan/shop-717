<template>
    <div class="mask" :class="{'active':isActive}">
        <h1><img src="http://img.zcool.cn/community/015e9b5786f9290000018c1b3e3eb8.gif" alt=""></h1>
    </div>
</template>
<script>
export default {
    name: 'mask-view',
    props: ['isActive'],
    data: function() {
        return {
            // isActive: false
        }
    }
}
</script>
<style lang="scss" >

    .mask{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.5);
        display: none;
        h1{
            color: #fff;
            transform: translate3d(-50%,-50%,0);
            position: absolute;
            left: 50%;
            top: 50%;
            img{
                width: 80%;
                margin-left: 10%;
            }
        }
    }
    .active{
        display: block;
    }
</style>

