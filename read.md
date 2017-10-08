# 个人信息
    姓名：程茜
    性别：女
    出生日期：1993/07/17
    电话：17600450093


# 项目总结

* 项目主要分为四部分，首页、分类、购物车、我的。每块内容由vue-router搭建出一个单独的路由，底部是路由导航。先用vue搭建整个项目框架。复用的部分单独作为一个路由存在，方便所需时调用，减少代码冗余。运用vuex做数据管理。localStorage做账号及各账号数据的存储功能。数据请求使用了axios，开发过程中用axios-mock-adapter模拟数据接口，并用webpack打包工具。
这个app可以实现、查看搜索商品、添加购物车
* 使用了es6、vue、mock、vuex、router-loader、swiper、vue-router、axios、Gulp技术



* 首页主要是页面排版、后台数据渲染及头部的搜索页跳转this.$router.push('页面名')，单独的good.vue文件放反复使用的渲染片段
    <dl>
        <dt @click="good_details"><img :src="'http://www.lb717.com/'+url"></dt>
        <dd>
            <p>{{name}}</p>
            <span>
                <i>￥ {{price}}</i>
                <em class="icon iconfont icon-cart" @click="add_to_cart"></em>
            </span>
        </dd>
    </dl>
    主页面使用时：
     <good-comp v-for="items in goods_list" @tips-active="tips_active" :key="items.id" :id="items.goods_id" :url="items.obj_data" :name="items.goods_name" :price="items.discount_price"></good-comp> 

    上拉加载时<div class="home-section main" @scroll="can_i_query && load_more()" ref="main"></div>在script中methods利用延迟加载数据
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
        }

    点击购物车图标时，判断是否为用户登陆状态，登陆状态下，将商品的各项参数，以及用户登录返回的token提交给mock，添加成功后将数据提交给vuex的store


* 分类页分为左右两部分，点击做列表分类，改变右边类种。利用axios拦截器请求数据，通过路由传参进行参数匹配、数据渲染，实现产品列表效果
    左边数据渲染
        <ul>
          <li v-for="(x,i) in catagory_list" :key="i">
            <router-link :to="{name:'catagory',params:{index:i}}">
              <em class="icon iconfont icon-recharge"></em>
              <span>{{x.title}}</span>
            </router-link>
            
          </li>.
        </ul>
    右边数据请求
        <dl v-for="(val,ind) in catagory_content" :key="ind">
          <dt><img :src="val.pic" alt=""></dt>
          <dd>{{val.name}}</dd>
        </dl>
* 购物车
    首先进行判断，如果当前状态为登录状态，则获取cookie中的登录信息，作为请求参数，向后台发送请求，后台通过登录信息，获取本地存储中相关数据并返回。如果没有登录则显示购物车为空。通过v-model来控制变量改变产品数量的增减，使用自定义过滤器来过滤金额
    beforeRouteEnter(to, from, next) { 
		let ls = window.localStorage;
		let token = document.cookie.match(/token=(\d+)/);
		if (token) {
			axios.post('/cart/list', { token: token[1] }).then((res) => {
				store.dispatch('set_cart_list', res.data);
				next()
			})
		} else {
			next()
		}
	}

* 我的页面
    我的页面中有两大部分，地址管理和登录注册。显示登录注册页面，进入路由前通过获取cookie信息判断是否为登录状态没有账号先注册后登陆，若token已存在表示已登录直接进入页面
    beforeRouteEnter(to,from,next){
        let cookie = document.cookie;
        if(cookie.indexOf('token')!=-1){
            next()
        }else{
             next('/login')
        }
    }
    判断用户登录
    register(){
            let telReg = /^1(3|5|7|8)\d{9}$/;
            if(telReg.test(this.phone_number)&&this.password){
                this.$http.post("/register",{
                    phone_number:this.phone_number,
                    password:this.password
                }).then((params)=>{
                    this.is_login=true;
                    console.log(params)
                })
            }else{
                alert('注册信息有误')
            }
        },
        login(){
            this.$http.post("/login",{
                phone:this.login_phone,
                password:this.login_password
            }).then((res)=>{
                console.log(res.data);
                document.cookie="1505B-tocken="+res.data.tocken;
                this.$router.push({name:"mine"})
            })
        }
    点击地址管理跳转路由，点击新增地址跳转新增地址页，进行信息填写
        <div class="add-btn" @click="add_ress_list">
            <p>新增地址
                <span>+</span>
            </p>
        </div>
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
##### 在mock中处理邮寄地址
        请求全国省份城市信息
        import address_info from '../src/service/address.json'
        mocker.onPost('/get_address_info').reply(delay(address_info));


        新加邮寄地址
        mocker.onPost('/add_new_address').reply(config=>{
            let params = JSON.parse(config.data);
            console.log(params)
            let ls = localStorage;
            if(ls.getItem('address-list')){
                let add_list = JSON.parse(ls.getItem('address-list'));
                params.id = (add_list[params.token].length+1);
                add_list[params.token].push(params);
                ls.setItem('address-list',JSON.stringify(add_list));
            }else{
                let obj={};
                params.id =1;
                obj[params.token] = [params];
                ls.setItem('address-list',JSON.stringify(obj));
            }
        return [200,1]
        })
        请求邮寄地址列表
        mocker.onPost('/get_address_list').reply(config=>{
            let token = JSON.parse(config.data).token;
            console.log(token)
            let ls = localStorage;
            let add_list = JSON.parse(ls.getItem('address-list'));
            return [200,add_list&& add_list[token]]
        })

        编辑邮寄地址信息
        mocker.onGet('/edit_delivery_info').reply(config=>{
            let delivery_id = config.id;
            let token = config.token;
            
            let ls = localStorage;
            let list = JSON.parse(ls.getItem('address-list'))[token];
            console.log(JSON.parse(ls.getItem('address-list')))
            
            let res=[];
            if(list){
                list.forEach(item=>{
                    if(item.id==delivery_id){
                        res = item
                    }
                })
            }
            
            return new Promise(function (resolve, reject) {
                let timer = setTimeout(() => {
                    resolve([200, res])
                    clearTimeout(timer)
                }, random(0, 3500))
            })
        })

        删除邮寄地址信息
        mocker.onGet('/delete_delivery_info').reply(config=>{
            let delivery_id = config.id;
            let token = config.token;
            
            let ls = localStorage
            let delivery_list = JSON.parse(ls.getItem('address-list'));
            let list = delivery_list[token];
            
            let delivery_index;
            if(list){
                list.forEach((item,index)=>{
                    if(item.id===delivery_id){
                        delivery_index = index
                    }
                })
            }

            list.splice(delivery_index,1);
            delivery_list[token] = list;

            ls.setItem('address-list',JSON.stringify(delivery_list))
            
            return new Promise(function (resolve, reject) {
                let timer = setTimeout(() => {
                    resolve([200,'success'])
                    clearTimeout(timer)
                }, random(0, 3500))
            })
        })



