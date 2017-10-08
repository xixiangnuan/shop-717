<template>
<!-- 分类页 -->
  <div class="list">
    <div class="list-head">
      <span>
        <input type="text" placeholder="请输入要购买的商品" @focus="go_to_search()">
        <em class="icon iconfont icon-refund"></em>
      </span>
      <i>
        <em class="icon iconfont icon-message"></em>
      </i>
    </div>
    <div class="list-section">
      <div class="list-left">
        <ul>
          <li v-for="(x,i) in catagory_list" :key="i">
            <router-link :to="{name:'catagory',params:{index:i}}">
              <em class="icon iconfont icon-recharge"></em>
              <span>{{x.title}}</span>
            </router-link>
            
          </li>
        </ul>
      </div>
      <div class="list-right">
        <dl v-for="(val,ind) in catagory_content" :key="ind">
          <dt><img :src="val.pic" alt=""></dt>
          <dd>{{val.name}}</dd>
        </dl>
        
        
      </div>
    </div>
    <masker-layer :isActive="masker_active"></masker-layer>

  </div>
</template>
<script>
import masker from '../../components/global_mask.vue';
export default {
  data(){
    return{
      masker_active:true,
      catagory_list:[],
      catagory_content:[]
    }
  },
  components:{
    "masker-layer":masker
  },
  created(){
    this.$http.post("/h5/mtop.relationrecommend.wirelessrecommend.recommend").then((res)=>{
      console.log(res)
      this.masker_active = false;
      // console.log(this.masker_active);
      this.catagory_list=[...res.data.data.result[0].moduleList];
      this.catagory_content=[...res.data.data.result[0].moduleList[0].items];
    })
  },
   watch:{
        "$route":function(n,o){
            let index = n.params.index;
            // this.catagory_content = [...this.catagory_list[index].items];
            if(this.catagory_list[index])this.catagory_content = [...this.catagory_list[index].items];
        }
    },
    methods:{
       go_to_search(){
            this.$router.push('/search')
        }
    }
}
</script>
<style scoped lang="scss">
.list{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.list-head {
  width: 100%;
  height: .59rem;
  display: table;
  border-bottom: 0.5px solid #ccc;
  box-sizing: border-box;
  line-height: .59rem;
  span {
    width: 80%;
    padding: 0 .2rem;
    position: absolute;
    input {
      width: 100%;
      border: none;
      background: #F6F6F6;
      text-align: center;
      height: .45rem;
      border-radius: 0.05rem;
    }
    em {
      position: absolute;
      left: 10%;
      top: 0;
      color: #999;
    }
  }
  i {
    position: absolute;
    right: .2rem;
  }
}
.list-section{
  width: 100%;
  overflow-y: scroll;
  flex: 1;
  .list-left{
    width: 35%;
    background: #eee;
    float: left;
    height: 100%;
    ul{
      width: 100%;
      .router-link-active{
          background: #fff;
          color: red;
        }
      li{
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        position: relative;
        box-sizing: border-box;
        text-align: center;
        a{
          background: #eee;
          color: #333;
        }
        em{
          position: absolute;
          left: .2rem;
        }
        span{
          padding-left: .2rem;
        }
        
      }
    }
  }
  .list-right{
    width: 65%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    dl{
      // margin: 1%;
      text-align: center;
      padding: .15rem;
      font-size: .24rem;
      dt{
        width: 1rem;
        height: 1rem;
        background: #eee;
        img{
          width: 100%;
          height: 100%;
        }
      }
      dd{
        padding-top: .15rem;
      }
    }
  }
}

</style>
