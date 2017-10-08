import axios from 'axios'
import AxiosAdapter from 'axios-mock-adapter'
function random(min, max) {
    return Math.floor(Math.random() * (max - min)+1)+min
}

function delay(data){
    return function(){
        return new Promise(function(resolve,reject){
            let timer=setTimeout(()=>{
                resolve([200,data])
                clearTimeout(timer)
            },random(0,3500))
        })
    }
}

let mocker=new AxiosAdapter(axios);

//首页商品列表
import getGoodsChannel from '../src/service/goods_channel.js';
// import getGoodsChannel2 from '../service/goodChannel2.js';
mocker.onPost('/mall/index/getGoodsChannel',{
    channel_id:1
}).reply(200,{
    data:getGoodsChannel
});
mocker.onPost('/mall/index/getGoodsChannel',{
    channel_id:2
}).reply(200,{
    data:getGoodsChannel
})
mocker.onPost('/mall/index/getGoodsChannel',{
    channel_id:3
}).reply(200,{
    data:getGoodsChannel
})
//添加购物车
import addCart from '../src/service/data.json';
mocker.onPost('/user/Cart/addCart').reply((config)=>{
    let params = JSON.parse(config.data)
   
    let ls = localStorage;
    let user_token = params.token;
    let cart_info={};
    //cart_info.params.token = params.goods_info
    if(!ls.getItem('717-cart-info-list')){
        cart_info[user_token] = [];
    }else{
        cart_info = JSON.parse(ls.getItem('717-cart-info-list'))
    }
    if(cart_info[user_token]){
        cart_info[user_token].push(params.goods_info)
    }else{
        cart_info[user_token]=[params.goods_info]
    }
    
    
    localStorage.setItem('717-cart-info-list',JSON.stringify(cart_info));    
    
    return [200,addCart]

})
//请求分类页的数据
import catagory from '../src/service/catagory.json';
mocker.onPost('/h5/mtop.relationrecommend.wirelessrecommend.recommend').reply(function(){
    return new Promise(function(resolve,reject){
        setTimeout(()=>{
            resolve([200,catagory])
        },500)
    })
})

import data from '../src/service/data.json';
mocker.onPost('/user/Cart/addCart',{ goods_id: 123, key_code: 123 }).reply(function(){
    return [200,data]
})

//登陆注册
//验证码获取
mocker.onPost("/verifycode").reply(function(config){
    let phone=JSON.parse(config.data).pn;
    return [200,phone.slice(-4)]
})
mocker.onPost("/register").reply(function(config){
    let register_info=JSON.parse(config.data)
    let ls=localStorage;
    let register_history=[];
    if(!ls.getItem('register-info')){
        register_history.push(register_info)
    }else{
        register_history=JSON.parse(ls.getItem('register-info'));
        register_history.push(register_info)
    }
    ls.setItem("register-info",JSON.stringify(register_history))

    return [200,'success']
})
mocker.onPost("/login").reply(config=>{
    let login_info=JSON.parse(config.data)
    console.log(login_info)
    let ls=localStorage;
    let register_history=[] ;
    let is_right=false;
    if(ls.getItem("register-info")){
        register_history = JSON.parse(ls.getItem("register-info"))
    }
    register_history.forEach((item,index)=>{
        if(item.phone_number===login_info.phone && item.password===login_info.password){
            is_right=true
        }
    });
    if(is_right){
        return [200,{
            tocken:login_info.phone
        }]
    }else{
        return [500,'登陆信息有误']
    }
})
// mocker.onGet('/address/address-info').reply(function(config){
//     let token=config.token;
//     let ls=localStorage;
//     let adrObj=JSON.parse(ls.getItem('address-info'));
//     if(adrObj && adrObj[token] && adrObj[token].length!=0){
//         return [200,adrObj[token]];
//     }else{
//         return [200,[]]
//     }
// })

//请求全国省份城市信息
import address_info from '../src/service/address.json'
mocker.onPost('/get_address_info').reply(delay(address_info));


//新加邮寄地址
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
//请求邮寄地址列表
mocker.onPost('/get_address_list').reply(config=>{
    let token = JSON.parse(config.data).token;
    console.log(token)
    let ls = localStorage;
    let add_list = JSON.parse(ls.getItem('address-list'));
    return [200,add_list&& add_list[token]]
})

//编辑邮寄地址信息
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

//删除邮寄地址信息
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