import Vue from 'vue'
import VueRouter from 'vue-router'
import entry from '../views/index/entry.vue'
import home from '../views/home/home.vue'
import catagory from '../views/list/list.vue'
import cart from '../views/cart/cart.vue'
import mine from '../views/mine/mine.vue'
import search from '../views/search/search.vue'
import result from '../views/result/result.vue'
import details from '../views/details/details.vue'
import zhuce from '../views/zhuce/zhuce.vue'
import address from '../views/address/address.vue'
import delivery from '../views/delivery/delivery.vue'
import loginout from '../views/loginout/loginout.vue'




Vue.use(VueRouter);

let routes = [
    {
        path: '*',
        redirect: '/entry/home'
    },
    {
        name: 'entry',
        path: '/entry',
        component: entry,
        children: [
            {
                name: 'home',
                path: 'home',
                component: home
            },
            {
                name: 'catagory',
                path: 'catagory/:index?',
                component: catagory
            },
            {
                name: 'cart',
                path: 'cart',
                component: cart
            },
            {
                name: 'mine',
                path: 'mine',
                component: mine
            },
            {
                name: 'result',
                path: 'result',
                component: result
            }
        ]
    },
    {
        name: 'search',
        path: '/search',
        component: search
    },
    {
        name: 'details',
        path: '/details',
        component: details
    },
    {
        name: 'zhuce',
        path: '/zhuce',
        component: zhuce
    },
    {
        name: 'loginout',
        path: '/loginout',
        component: loginout
    },
    {
        name: 'address',
        path: '/address',
        component: address,

    },
    {
        name: "delivery",
        path: "/delivery",
        component: delivery
    }


]

const router = new VueRouter({
    routes
})
router.beforeEach(function (to, from, next) {

    console.log(to)
    if (to.name == 'mine') {
        let cookie_list = document.cookie.split(';');
        let tocken = null;
        console.log(cookie_list)
        for (let i = 0; i < cookie_list.length; i++) {
            if (cookie_list[i].indexOf('1505B-tocken') > -1) {
                tocken = cookie_list[i].split('=')[1]
            }
        }
        console.log(tocken)
        if (!tocken) {
            next({
                path: '/zhuce'
            })
        } else {
            next()
        }
    } else {
        next()
    }
    if (to.name == 'zhuce') {
        next()
        return;
    }

})
export default router