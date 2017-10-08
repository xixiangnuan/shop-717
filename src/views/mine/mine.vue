<template>
  <div class="main">
    <div class="main-tit">
      <p>
        <em class="icon iconfont icon-settings" @click="go_to_settings"></em>
        <span>我的717商城</span>
      </p>
      <dl @click="denglu">
        <dt><img src="../../imgs/main/dt.png" alt=""></dt>
        <dd>路飞</dd>
      </dl>
    </div>
    <div class="main-cont">
      <p>
        <span>
          <em class="icon iconfont icon-shop"></em>
          我的店铺
        </span>
        <b>
          <em class="icon iconfont icon-right"></em>
        </b>
      </p>
      <div class="cont-icon">
        <dl>
          <dt>
            <em class="icon iconfont icon-send"></em>
          </dt>
          <dd>待付款</dd>
        </dl>
        <dl>
          <dt>
            <em class="icon iconfont icon-pay"></em>
          </dt>
          <dd>待发货</dd>
        </dl>
        <dl>
          <dt>
            <em class="icon iconfont icon-deliver"></em>
          </dt>
          <dd>待收货</dd>
        </dl>
        <dl>
          <dt>
            <em class="icon iconfont icon-recharge"></em>
          </dt>
          <dd>售后</dd>
        </dl>
        <dl>
          <dt>
            <em class="icon iconfont icon-form"></em>
          </dt>
          <dd>我的订单</dd>
        </dl>
      </div>
    </div>
    <div class="main-list">
      <p>
        <span>
          <em class="icon iconfont icon-form"></em>账户余额
        </span>
        <b>
          <em class="icon iconfont icon-right"></em>
        </b>
      </p>
      <p class="addresses" @click="addresses">
        <span>
          <em class="icon iconfont icon-location"></em>地址管理
        </span>
        <b>
          <em class="icon iconfont icon-right"></em>
        </b>
      </p>
      <p>
        <span>
          <em class="icon iconfont icon-service"></em>我的客服
        </span>
        <b>
          <em class="icon iconfont icon-right"></em>
        </b>
      </p>
    </div>
    <div class="main-add">
      <h3>热门推荐</h3>
      <div class="mine_recommend">
        <a href="javascript:;">
          <dl>
            <dt>
              <img src="../../imgs/list1.png" alt="">
            </dt>
            <dd>
              <h5>
                当时就觉得返回都是返回假的课就是发喝点水健康1L1*2/瓶
              </h5>
              <h6>￥
                <small>258.00</small>
                <em class="icon iconfont icon-cart"></em>
              </h6>
            </dd>
          </dl>
        </a>
        <a href="javascript:;">
          <dl>
            <dt>
              <img src="../../imgs/list1.png" alt="">
            </dt>
            <dd>
              <h5>
                当时就觉得返回都是返回假的课就是发喝点水健康1L1*2/瓶
              </h5>
              <h6>￥
                <small>258.00</small>
                <em class="icon iconfont icon-cart"></em>
              </h6>
            </dd>
          </dl>
        </a>
        <a href="javascript:;">
          <dl>
            <dt>
              <img src="../../imgs/list1.png" alt="">
            </dt>
            <dd>
              <h5>
                当时就觉得返回都是返回假的课就是发喝点水健康1L1*2/瓶sdsvcd
              </h5>
              <h6>￥
                <small>258.00</small>
                <em class="icon iconfont icon-cart"></em>
              </h6>
            </dd>
          </dl>
        </a>
      </div>
      <p class="mine_nomore">没有更多了喔~~~^.^</p>
    </div>
  </div>
</template>
<script>

// import good from '../../components/good.vue'
export default {
  // data(){
  //   return{
  //     good_list:[]
  //   }
  // },
  methods: {
    denglu() {
      this.$router.push("/zhuce")
    },
    addresses(){
      this.$router.push("/address")
    },
    go_to_settings(){
      this.$router.push({name:'loginout'})
    }
  }
}
</script>
<style scoped lang="scss">
.main {
  overflow-y: scroll;
}

.main-tit {
  height: 3rem;
  background: url("../../imgs/main/ban.png") no-repeat;
  background-size: 100% 3rem;

  p {
    width: 100%;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    color: #fff;
    position: relative;
    em {
      position: absolute;
      left: .2rem;
      top: 0;
    }
    span {
      font-size: 0.32rem;
    }
  }
  dl {
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    dt {
      width: 1.2rem;
      height: 1.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    dd {
      color: #fff;
      font-size: .26rem;
      padding-top: .2rem;
    }
  }
}

.main-cont {
  height: 2.8rem;
  p {
    height: 1.3rem;
    color: #FC4141;
    padding: 0 .2rem;
    line-height: 1.3rem;
    position: relative;
    span {
      padding-left: .5rem;
      em {
        font-size: .4rem;
        font-weight: 600;
        position: absolute;
        left: .2rem;
      }
    }
    b {
      position: absolute;
      right: .2rem;
      top: 0;
    }
  }
}

.cont-icon {
  display: flex;
  align-items: center;
  height: 1.5rem;
  box-sizing: border-box;
  dl {
    flex: 1;
    text-align: center;
  }
}

.main-list {
  height: 3rem;
  border-top: .1rem solid #eee;
  box-sizing: border-box;
  p {
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid #eee;
    padding: 0 .2rem;
    position: relative;
    b {
      position: absolute;
      right: .2rem;
      top: 0;
    }
  }
}

.main-add h3 {
  border-top: .1rem solid #eee;
  width: 100%;
  padding: .2rem 0;
  height: 1rem;
  background: #fff;
  text-align: center;
  font-weight: 400;
  font-size: 0.3rem;
}
.main-add .mine_recommend {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  border-top: .1rem solid #eee;
}
.main-add .mine_recommend a {
  display: block;
  width: 46%;
  height: 4rem;
  margin: 0.1rem;
  background: #fff;
  color: #333;
}
.main-add .mine_recommend a dl {
  width: 100%;
  height: 100%;
}
.main-add .mine_recommend a dl dt {
  width: 100%;
  height: 3rem;
}
.main-add .mine_recommend a dl dt img {
  width: 100%;
  height: 100%;
}
.main-add .mine_recommend a dl dd h5 {
  font-size: 0.22rem;
  font-weight: 400;
  display: -webkit-box;
  word-break: break-all;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-indent: 2;
}
.main-add .mine_recommend a dl dd h6 {
  font-size: 0.24rem;
  font-weight: 400;
  color: red;
  padding: 0 0.1rem 0.1rem 0.1rem;
}
.main-add .mine_recommend a dl dd h6 em {
  float: right;
  font-size: 0.3rem;
  display: block;
}
.main-add .mine_nomore {
  display: block;
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.24rem;
}
</style>
