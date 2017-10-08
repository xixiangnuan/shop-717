<template>
<!-- 地址管理后跳转收货地址页，新增收货地址 -->
    <div class="address">
        <div class="add-body">
            <div class="add-tit">
                <i class="icon iconfont icon-back" @click="back"></i>
                <span>收货地址</span>
            </div>
            <div class="add-cont">
                <adr-item v-for="(item,index) in address_list" :key="item.name" :item="item" @set-def="set_def"></adr-item>
            </div>
        </div>

        <div class="add-btn" @click="add_ress_list">
            <p>新增地址
                <span>+</span>
            </p>
        </div>
    </div>
</template>
<script>
import adr_item from './adr-item/adr-item.vue'
import token from '../../utils/getcookie'

export default {
    data() {
        return {
            address_list:[]
        }
    },
    created(){
        this.$http.post('/get_address_list',{token:token()}).then((res)=>{
            this.address_list = res.data;
        })
    },
    methods:{
        add_ress_list(){
            this.$router.push("/delivery")
        },
        back(){
            this.$router.go(-1)
        },
        set_def(item){
            this.address_list.forEach((val)=>{
                if(val.name==item.name){
                    val.is_default=true;
                }else{
                    val.is_default=false;
                }
            })
        }
    },
    components:{
        'adr-item':adr_item
    }
}
</script>
<style lang="scss" scoped>
.address {
    background: #eee;
    height: 100%;
    width: 100%;
}

.add-tit {
    height: .88rem;
    text-align: center;
    border-bottom: 1px solid #eee;
    background: #fff;
    line-height: .88rem;
    i {
        position: absolute;
        left: .2rem;
    }
}

.add-cont {
    box-sizing: border-box;
    background: #fff;
    height: 2.9rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
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

.check {
    border-width: 0;
    background-color: #fc4141;
    width: .4rem;
    height: .4rem;
    border-radius: 50%;
    display: inline-block;
    line-height: .4rem;
    text-align: center;
    &:after {
        content: '✔';
        color: #fff;
    }
}

.add-btn {
    width: 100%;
    background: #eee;
    height: 1.4rem;
    text-align: center;
    font-size: .3rem;
    line-height: 1.4rem;
    position: fixed;
    bottom: 1rem;
    left: 0;
    p {
        height: 1rem;
        width: 60%;
        background: #FC4141;
        border-radius: .5rem;
        color: #fff;
        line-height: 1rem;
        margin-left: 20%;
    }
}
</style>
