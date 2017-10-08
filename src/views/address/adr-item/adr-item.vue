<template>
<!-- 抽出来的   新增收货地址 -->
    <section>
        <p>
            <span>{{item.name}}</span>
            <span>{{item.phone.slice(0,3)+'****'+item.phone.slice(-4)}}</span>
        </p>
        <div class="add-ress">
            {{item.province+' '+item.city+' '+item.district+' '+item.street}}
        </div>
        <div class="add-bot">
            <div class="defalut">
                <span class='check'></span>
                默认地址
            </div>
            <div class="add-list">
                <span>
                    <i class="icon iconfont icon-copy"></i>编辑</span>
                <span>
                    <i class="icon iconfont icon-upload"></i>删除</span>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: ['item'],
    methods: {
        set_def(item) {
            this.$emit('set-def', item)
        }
    }
}
</script>
<style lang="scss" scoped>
section {
    p {
        height: 0.8rem;
        line-height: 0.8rem;
        padding-left: .2rem;
    }
    .add-ress {
        padding: 0 .2rem;
        flex: 1;
    }
    .add-bot {
        height: .9rem;
        line-height: .9rem;
        border-top: 1px solid #eee;
        padding: 0 .2rem;
        .defalut {
            float: left;
        }
        .add-list {
            float: right;
            span {
                padding: 0 .1rem;
                i {
                    padding-right: .1rem;
                }
            }
        }
    }
}
</style>
