import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store= new Vuex.Store({
    state:{
        cart_list:[
        ]
    },
    mutations:{
        add_to_cart(state, data) {
            let no_repeat = false; // 避免同一类目渲染多次 只数量增加
            let len = state.cart_list.length;
            for (let i = 0; i < len; i++) {
                if (state.cart_list[i].id == data.id) {
                    state.cart_list[i].count++;
                    no_repeat = true;
                }
            }
            if (!no_repeat) {
                state.cart_list.unshift(data);
            }
        },
        delItem(state,id){
            id.forEach((val)=>{
                state.cart_list = state.cart_list.filter((item)=>{
                    if(item.id != val){
                        return val;
                    }
                })
            })
        }
    }
})
export default store;