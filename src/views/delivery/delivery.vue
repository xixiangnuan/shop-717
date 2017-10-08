
<template>
<!-- 选择省份编辑收货信息页 -->
  <div class="delivery">
    <div class="deliv-tit">
      <i class="icon iconfont icon-back" @click="back"></i>
      <span>收货人</span>
    </div>
    <div class="deliv-cont">
      <div class="delive_ps">
        <p class="name">
          <input type="text" placeholder="收货人姓名" v-model.trim="name">
        </p>
        <p class="phone">
          <input type="text" placeholder="手机号" v-model.trim="phone">
        </p>
      </div>

      <nav class="nav">
        <div class="select">
          <select name="province" id="province_id" v-model="province">
            <span class="opt"></span>
            <option value="0">请选择省</option>
            <option v-for="x in list" :value="x.name" :key="x.name">{{x.name}}</option>
          </select>
        </div>
        <div class="select">
          <select name="city" id="city_id" v-model="city">
            <span class="opt"></span>
            <option value="0">请选择市</option>
            <option v-for="x in city_list" :value="x.name" :key="x.name">{{x.name}}</option>
          </select>
        </div>
      </nav>
      <section>
        <div class="select">
          <select name="district" id="district_id" v-model="district">
            <span class="opt"></span>
            <option value="0">请选择区</option>
            <option v-for="x in district_list" :value="x" :key="x">{{x}}</option>

          </select>
        </div>
      </section>
      <div class="addes">
        <p class="User_Adders">
          <input type="text" name="address" id="address" placeholder="详细地址" v-model="site">
        </p>
      </div>
      <div class="defc">
        <span :class="{'check':true}"></span>

        <p id="set_defalut">设为默认地址</p>
      </div>

      <div class="keep" @click="save">保存</div>
    </div>
    <tips :active="isActive">{{msg}}</tips>
  </div>
</template>
<script>
import token from '../../utils/getcookie.js'
import tips from '../../components/tips.vue'

export default {
  data() {
    return {
      phone: '',
      name: '',
      site: '',
      list: [],
      city_list: [],
      district_list: [],
      city: '',
      district: "",
      province: '',
      isActive:false,
      msg:''
    }
  },
  components:{
    'tips':tips
  },
  created() {
    let get_address_info = new Promise((resolve, reject) => {
      this.$http.post('/get_address_info').then((res) => {
        resolve(res.data)
      })
    })
    let edit_address_info = new Promise((resolve, reject) => {
      let id = this.$route.params.id;
      if(id){
        this.$http.get('/edit_delivery_info', { id: id, token: token() }).then((res) => {
          resolve(res.data)
        })
      }else{
        resolve(0)
      }
    })
    Promise.all([get_address_info, edit_address_info]).then((res) => {
      this.list = res[0];
      if(res[1]){
        this.name = res[1].phone;
        this.phone = res[1].phone;
        this.province = res[1].province;
        this.city = res[1].city;
        this.district = res[1].district;
        this.site = res[1].street;
      }
    })
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    save(){
      let reg_phone=/^1[345678]\d{9}$/;
       if(!this.name){
          this.tip('请输入收货人')
       }else if(!reg_phone.test(this.phone)){
          this.tip('请输入电话')
      }else if(!this.province||this.province=='请选择省'){
        this.tip('请选择省')
      }else if(!this.city||this.city=='请选择市'){
        this.tip('请选择省')
      }else if(!this.district||this.district=='请选择区'){
        this.tip('请选择省')
      }else if(!this.site){
        this.tip('请输入详细地址')
      }else{
      this.$http.post('/add_new_address',{
        name:this.name,
        phone:this.phone,
        province:this.province,
        city:this.city,
        district:this.district,
        street:this.site,
        token:token()
      }).then((res)=>{
        if(res.data==1){
          this.$router.push({name:'address'})
        }
      })}
    },
    tip(info){
        this.isActive = true;
        setTimeout(()=> {
                this.isActive = false
            }, 1500);
        this.msg = info;
    }
  },
  watch:{
    'province':function(n){
      if(n!='请选择省'){
        let list =  [];
         this.list.forEach((val)=>{
          if(val.name == n){
            list = val.city;
          }
        })
        this.city_list = list;
      }else{
          this.city = '请选择市';
        this.district = "请选择区";
      }
    },
    'city':function(n){
      if(n!='请选择市'){
        let list =  [];
         this.city_list.forEach((val)=>{
          if(val.name == n){
            list = val.area;
          }
        })
        this.district_list = list;
      }else{
        this.district = "请选择区";
      }
    }
  }
}
</script>
<style scoped lang="scss">
.check {
  border-width: 0;
  background-color: #fc4141;
  width: .4rem;
  height: .4rem;
  border-radius: 50%;
  line-height: .4rem;
  text-align: center;
  &:after {
    content: '✔';
    color: #fff;
  }
}

.delivery {
  background: #eee;
  height: 100%;
  width: 100%;
}

.deliv-tit {
  height: .75rem;
  background: #fff;
  border-bottom: 1px solid #eee;
  text-align: center;
  position: relative;
  line-height: .75rem;
  font-size: .3rem;
  i {
    position: absolute;
    left: .2rem;
  }
}

.deliv-cont {
  width: 100%;
  .delive_ps p {
    margin: .2rem;
    background: #fff;
    height: .9rem;
    input {
      padding-left: .2rem;
      height: 100%;
      width: 100%;
      border: none;
    }
  }
  .nav {
    width: 100%;
    height: .9rem;
    .select {
      width: 3.1rem;
      height: .9rem;
      overflow: hidden; // margin-left: .2rem;
      position: relative;
      float: left;
      select {
        background: #fff;
        border: none;
        margin-left: .2rem;
        width: 2.9rem;
        height: .9rem;
        .opt {
          display: inline-block;
          position: absolute;
          width: 10px;
          height: 10px;
          right: .1rem;
          top: .4rem;
          background: #000;
        }
      }
    }
  }
  section {
    width: 100%;
    height: .9rem;
    margin-top: .2rem;
    .select {
      width: 6rem;
      height: .9rem;
      overflow: hidden;
      margin-left: .2rem;
      position: relative;
      float: left;
      select {
        background: #fff;
        border: none;
        padding-left: .3rem;
        width: 6rem;
        height: .9rem;
        .opt {
          display: inline-block;
          position: absolute;
          width: 10px;
          height: 10px;
          right: .1rem;
          top: .4rem;
          background: #000;
        }
      }
    }
  }
  .addes {
    width: 6.4rem;
    height: .9rem;
    text-align: left;
    margin-top: .33rem;
    .User_Adders {
      margin: .2rem;
      input {
        border: none;
        width: 100%;
        line-height: .9rem;
        padding-left: .2rem;
      }
    }
  }
}

.defc {
  width: 100%;
  height: .5rem;
  margin-top: .3rem;
  padding-left: .2rem;
  position: relative;

  span {
    display: inline-block;
  }
  p {
    display: inline-block;
    font-size: .28rem;
  }
}

#address_id {
  border: none;
  width: 100%;
  line-height: .9rem;
}

.keep {
  width: 4.60rem;
  height: 1rem;
  margin-top: .5rem;
  margin-left: 0.9rem;
  background: #fc4141;
  text-align: center;
  line-height: 1rem;
  color: #fff;
  border-radius: .5rem;
  font-size: .36rem;
}
</style>

