<template>
<!-- 点击我的时   登录注册页 -->
    <div class="login-register">
        <div class="login" v-if="is_login">
            <div class="login-header">
                <span class="icon iconfont icon-back" @click="back_home"></span>
                <span>登录717</span>
                <span @click="go_to_register">注册</span>
            </div>
            <div class="login-wraper">
                <div class="login-input">
                    <p>
                        <i class="icon iconfont icon-people"></i>
                        <input type="text" name="" id="" placeholder="请输入您的手机号" v-model="login_phone">
                    </p>
                    <p>
                        <i class="icon iconfont icon-recharge"></i>
                        <input type="text" name="" id="" placeholder="请输入您的密码" v-model="login_password">
                    </p>
                </div>
                <div class="login-btn">
                    <input type="button" @click="login" value="立即登录">
                    <p>
                        <a href="javascript:;">忘记密码?</a>
                    </p>

                </div>
                <div class="login-other">
                    <div>
                        <p>使用第三方账号登录</p>
                    </div>
                    <ul>
                        <li>
                            <img src="../../imgs/loading/wechat.png" alt="wechat">
                            <span>微信</span>
                        </li>
                        <li>
                            <img src="../../imgs/loading/qq.png" alt="qq">
                            <span>QQ</span>
                        </li>
                        <li>
                            <img src="../../imgs/loading/sina.png" alt="weibo">
                            <span>微博</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="login" v-else>
            <div class="login-header">
                <span class="iconfont icon-back"></span>
                <span>注册717</span>
                <span @click="to_login">登录</span>
            </div>
            <div class="login-wraper">
                <div class="login-input">
                    <p>
                        <i class="iconfont icon-people"></i>
                        <input type="text" name="" id="" placeholder="请输入您的手机号" v-model.trim="phone_number">
                    </p>
                    <p>
                        <i class="iconfont icon-recharge"></i>
                        <input type="text" name="" id="" placeholder="请输入验证码" v-model.trim="verify_code">
                        <span class="valid" @click="get_verifycode">获取验证码</span>
                    </p>
                    <p>
                        <i class="iconfont icon-form"></i>
                        <input type="text" name="" id="" placeholder="请输入您的密码" v-model.trim="password">
                    </p>
                </div>
                <div class="login-btn">
                    <input type="button" @click="register" value="立即注册">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            is_login: true,
            phone_number:"",
            verify_code:'',
            password:'',
            login_phone:'',
            login_password:''
        }
    },
    methods:{
        back_home(){
            this.$router.push('/home')
        },
        to_login(){
            this.is_login = true
        },
        go_to_register(){
            this.is_login=false
        },
        get_verifycode(){
            this.$http.post("/verifycode",{pn:this.phone_number}).then(
                function(params){
                    console.log(params)
                }
            )
        },
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
    }
}
</script>
<style lang="scss" scoped>
@mixin paddingLR($left:.3rem, $right:.3rem) {
    padding-left: $left;
    padding-right: $right;
    box-sizing: border-box;
}
.login-register{
    width: 100%;
    height: 100%;
}

.login {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f4f4f4;
}

.login-header{
    width: 100%;
    height: 0.9rem;
    border-bottom: .01rem solid #ccc;
    background-color: #fff;
    padding-top: .3rem;
    position: relative;
    margin-bottom: .2rem;
    span {
        font-size: .34rem;
        position: absolute;
        top: .4rem;
        &:first-child {
            left: .3rem;
        }
        &:last-child {
            right: .3rem;
            color: #fc4141;
        }
        &:nth-child(2) {
            width: 100%;
            text-align: center;
        }
    }
}

.login-wraper{
    flex: 1;
    overflow-y: auto;
}

.login-input{
    @include paddingLR;
    background-color: #fff;
    margin-bottom: 1.2rem;
    p {
        height: 1.2rem;
        position: relative;
        border-bottom: 1px solid #eee;
        i {
            position: absolute;
            left: 0;
            top: .36rem;
            font-size: .5rem;
        }
        input {
            width: 100%;
            height: 100%;
            border-width: 0;
            background: none;
            text-indent: .65rem;
        }
        .valid{
            position: absolute;
            top: .2rem;
            right: 0;
            width: 2.02rem;
            font-size: .3rem;
            line-height: 0.78rem;
            border-radius: 30px;
            border: .01rem solid #fc4141;
            text-align: center;
            color: #fc4141;
        }
    }
}

.login-btn{
    text-align: center;
    input {
        width: 70%;
        line-height: 0.9rem;
        text-align: center;
        color: #fff;
        font-size: .3rem;
        border-radius: 30px;
        background-color: #fc4141;
        border-width: 0;
    }
    p {
        width: 5.5rem;
        margin: .3rem auto 0;
        text-align: right;
        a {
            font-size: .26rem;
            text-decoration: underline;
            color: #ccc;
        }
    }
}

.login-other{
    margin-top: 2rem;
    @include paddingLR(.75rem, .75rem);
    div {
        border-bottom: .01rem solid #ccc;
        position: relative;
        p {
            width: 3.36rem;
            position: absolute;
            font-size: .3rem;
            text-align: center;
            background-color: #f4f4f4;
            top: -.2rem;
            left: 24%;
        }
    }
    ul {
        display: flex;
        @include paddingLR(.2rem, .2rem);
        li {
            width: 33.3%;
            height: 2.8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            img {
                width: 0.8rem;
                height: 0.8rem;
            }
            span:last-child {
                font-size: .28rem;
                margin-top: .2rem;
            }
        }
    }
}
</style>


