<template>
    <div class="shouye">
        <header class="home-header">
            <b><img src="../../imgs/nav1.png" alt=""></b>
            <input type="text" @focus="go_to_search" placeholder="请输入您要购买的商品">
            <p>
                <span>
                    <em class="icon iconfont icon-shop"></em>
                    <sub>我的店铺</sub>
                </span>
                <span>
                    <em class="icon iconfont icon-message"></em>
                    <sub>消息</sub>
                </span>
            </p>
            
        </header>
        <div class="home-section main" @scroll="can_i_query && load_more()" ref="main">
            <div class="main-wrap">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <img src="../../imgs/banner.png" alt="">
                        </div>
                        <div class="swiper-slide">
                            <img src="../../imgs/banner.png" alt="">
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                <div class="home-list">
                    <dl>
                        <dt><img src="../../imgs/list1.png" alt=""></dt>
                        <dd>家乡味道</dd>
                    </dl>
                    <dl>
                        <dt><img src="../../imgs/list2.png" alt=""></dt>
                        <dd>进口食品</dd>
                    </dl>
                    <dl>
                        <dt><img src="../../imgs/list3.png" alt=""></dt>
                        <dd>牛奶乳品</dd>
                    </dl>
                    <dl>
                        <dt><img src="../../imgs/list4.png" alt=""></dt>
                        <dd>茶果冲饮</dd>
                    </dl>
                    <dl>
                        <dt><img src="../../imgs/list5.png" alt=""></dt>
                        <dd>休闲零食</dd>
                    </dl>
                    <dl>
                        <dt><img src="../../imgs/list6.png" alt=""></dt>
                        <dd>米面粮油</dd>
                    </dl>
                    <dl>
                        <dt><img src="../../imgs/list7.png" alt=""></dt>
                        <dd>调味调料</dd>
                    </dl>
                    <dl>
                        <dt><img src="../../imgs/list8.png" alt=""></dt>
                        <dd>酒水饮料</dd>
                    </dl>
                </div>
                <div class="trends">
                    <span>商城<br>动态</span>
                    <p>
                        <ul>
                            <li>绿色无公害，无污染，无添加，天然有机蔬菜源头吃得放心，健康第一，安全保障，确保蔬菜新鲜</li>
                        </ul>
                    </p>
                </div>
                <div class="preference">
                    <span>
                        <em class="icon iconfont icon-refund"></em>
                        <b>天天特惠</b>
                        <i>每天都有惊喜</i>
                    </span>
                    <span>
                        <b>更多</b>
                        <em class="icon iconfont icon-list"></em>
                    </span>
                </div>
                <div class="home-day">
                    <div class="day-left">
                        <img src="../../imgs/day1.png" alt="">
                    </div>
                    <div class="day-right">
                        <img src="../../imgs/day2.png" alt="">
                        <img src="../../imgs/day3.png" alt="">
                    </div>
                </div>
               
                <div class="hometown">
                    <div class="town-tit">
                        <span>
                            <em class="icon iconfont icon-refund"></em>
                            <b>进口食品</b>
                        </span>
                        <span>
                            <i>更多</i>
                            <em class="icon iconfont icon-list"></em>
                        </span>
                    </div>
                    <div class="town-cons">
                         
                         <good-comp v-for="items in goods_list" @tips-active="tips_active" :key="items.id" :id="items.goods_id" :url="items.obj_data" :name="items.goods_name" :price="items.discount_price"></good-comp> 
                    </div>
                    <div class="loading">{{is_finished}}</div>
                </div>
            </div>
            
        </div>
        <tips-comp :active="active">添加成功</tips-comp>
    </div>
</template>
<script>
import axios from 'axios'
import "../../../mock/mock"
import tips from '../../components/tips.vue'
import good from '../../components/good.vue'

export default {
    name: 'home',
    data() {
        return {
            goods_list:[],
            can_i_query:true,
            channel_id:0,
            is_finished:'loading...',
            active: false
        }
    },
    components:{
        "tips-comp":tips,
        "good-comp":good
    },
    created(){
        axios.post('/mall/index/getGoodsChannel',{channel_id: 1}).then((res)=>{
            // console.log(res)
            this.channel_id++;
            this.goods_list=[...res.data.data[0].data.data]
            // console.log(this.goods_list)
        })
    },
    methods:{
        tips_active(data){
            if(data){
                this.active=true
            }else{
                this.active=false
            }
        },
        go_to_search(){
            this.$router.push('/search')
        },
        load_more(){
            let main=this.$refs.main;
           
            let total_height=main.querySelector(".main-wrap").offsetHeight;
            let main_height=main.offsetHeight;
            let scroll_top=main.scrollTop;
            // console.log(total_height-scroll_top-main_height)
            if(total_height-scroll_top-main_height<20){
                console.log('到底了')
                this.can_i_query=false;
                setTimeout(()=>{
                     axios.post('/mall/index/getGoodsChannel',{channel_id:this.channel_id}).then((res)=>{
                        this.channel_id++;
                        this.goods_list=[...this.goods_list,...res.data.data[1].data.data];
                        this.can_i_query=true;
                        if(this.channel_id>=3){
                            this.is_finished='我是有底线的'
                             this.can_i_query=false;
                        }
                        
                    })
                },1000)
               
            }
            // console.log(this.goods_list)
        }
    },
    mounted:function(){
        let swiper=new Swiper('.swiper-container',{
            pagination: ".swiper-pagination",
            autoplay: 2000,
            loop: true
        })
    }
}
</script>
<style lang="scss">
.loading{
    line-height: 44px;
    text-align: center;
}
.shouye{
    display: flex;
    flex-direction: column;
}
.home-header{
    width: 100%;
    height: .59rem;
    display: table;
    position: relative;
    border-bottom: 0.5px solid #ccc;
    box-sizing: border-box;
    b{
        height: .35rem;
        padding-left: .1rem;
        margin-top: 0.05rem;
        img{
            height: .35rem;
        }
    }
    input{
        width: 45%;
        height: .4rem;
        position: absolute;
        left: 20%;
        top: 0.05rem;
        background-color: #F5F5F5;
        border: none;
        padding-left: .1rem;
        &::-webkit-input-placeholder{
            text-align: center;
            color: #ccc;
            font-size: .16rem;
        }

    }
    p{
        display: inline-block;
        height: .44rem;
        align-items: center;
        padding-right: .1rem;
        position: absolute;
        right: .1rem;
        span{
            padding: 0 0.05rem;
            display: table-cell;
            text-align: center;
            color: #FC4141;
            em{
                display: block;
                width: 100%;
                font-size: 0.2rem;
            }
            sub{
                display: block;
                width: 100%;
                font-style: normal;
                font-size: .1rem;
            }
        }
    }
    
}
.home-section,
main
{
    overflow-y: scroll;
    flex: 1;
}
.swiper-container{
    width: 100%;
    border-bottom: .1rem solid #F6F5F5;
    .swiper-slide{
        height: 2.5rem;
        width: 100%;
        img{
            height: 100%;
            width: 100%;
        }
    }
}
.home-list{
    padding: .1rem 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    dl{
        width: 25%;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 0.1rem 0;
        dt{
            height: .6rem;
            width: .6rem;
            img{
                height: 100%;
                width: 100%;
            }
        }
        dd{
            padding-top: 0.05rem;
        }
    }
}
.trends{
    display: flex;
    box-sizing: border-box;
    span{
        width: 18%;
        color: #FF6D00;
        text-align: center;
        font-weight: bold;
    }
    p{
        flex: 1;
        border: 0.5px solid #ccc;
        font-size: .18rem; 
        margin-right: .2rem;
        padding: 0.06rem;
        border-radius: 0.05rem;
    }
}
.preference{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .1rem;
    border-top: .1rem solid #eee;
    span:nth-child(1){
        color: #FF6D00;
        i{
            font-style: normal;
        }
        b{
            font-size: .24rem;
        }
        em{
            font-size: .3rem;
        }
    }
}
.home-day{
    height: 3rem;
    background: #eee;
    box-sizing: border-box;
    padding-top: .1rem;
    padding-bottom: .1rem;
    .day-left{
        float: left;
        width: 50%;
        height: 100%;
        padding-right: .1rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .day-right{
        float:right;
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        img{
            height: 50%;
            width: 100%;
            &:nth-child(1){
                padding-bottom: 0.05rem;
            }
            &:nth-child(2){
                padding-top: 0.05rem;
            }
        }
    }
}
.hometown{
    box-sizing: border-box;
    .town-tit{
        text-align: center;
        padding: .1rem;
        position: relative;
        span{
            &:nth-child(1){
                color:#FF6D00;
                em{
                    font-size: .3rem;
                }
                b{
                    font-size: .26rem;
                }
            }
            &:nth-child(2){
                position: absolute;
                right: .1rem;
                em{
                    font-size: .2rem;
                }
                i{
                    font-style: normal;
                    font-size: .16rem;
                }
            }
        }
    }
    .town-cons{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        box-sizing: border-box;
        dl{
            width: 50%;
            border: 0.05rem solid #eee;
            display: flex;
            flex-direction: column;
            dt{
                width: 100%;
                img{
                    width: 100%;
                }
            }
            dd{
                p{
                    height: .75rem;
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
                span{
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    padding: 0 .1rem;
                    i{
                        font-style: normal;
                        color: #EA1313;
                    }
                }
            }
        }
    }
    
    
}
</style>

