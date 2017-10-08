<template>
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
</template>
<script>
import tips from './tips.vue';
export default {
    props: ['url', 'name', 'price', 'id'],
    methods: {
        add_to_cart() {
            this.$http.post("/user/Cart/addCart", { goods_id: 123, key_code: 123 }).then((res) => {
                console.log(res.data)
                if (res.data == 1) {
                    let data = {
                        id: this.id,
                        price: this.price,
                        name: this.name,
                        url: this.url,
                        count:1,
                    }


                    this.$store.commit("add_to_cart",data)
                    this.$emit("tips-active", true)
                }
                setTimeout(() => {
                    this.$emit("tips-active", false)
                }, 1000)
            })
        },
        good_details() {
            this.$router.push({
                name: "details",
                query: {
                    id: this.id
                }
            })
        }
    }
}
</script>
<style>

</style>
