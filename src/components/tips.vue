<template>
    <div class="tips" v-if="active">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: ['active'],
    data() {
        return {

        }
    },
    methods: {
        show: function() {

        }
    }
}

</script>

<style>
.tips {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    height: 0.88rem;
    line-height: 0.88rem;
    width: 80%;
    text-align: center;
}
</style>
