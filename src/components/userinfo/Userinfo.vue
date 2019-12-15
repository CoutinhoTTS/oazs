<template>
  <div class="Userinfo">
    <div class="user_" @click="myself">
      <div class="user_photo">
        <img src="../../assets/user.png" alt="">
      </div>
      <div class="user_info">
        <div class="user_name"><i class="fa fa-user-o"></i><span>{{userinfo.realname}}</span><span>({{userinfo.username}})</span><span></span></div>
        <div class="user_com">{{userinfo.comname}}</div>
        <div class="user_phone"><van-icon name="phone-o"  />{{userinfo.mobile}}</div>
      </div>
    </div>
    <!--修改密码-->
    <div class="setpassword" @click="changepassword">
      <i class="fa fa-lock"></i><span>修改密码</span>
    </div>
    <!--联系客服-->
    <div class="cellkf" @click="cellkf">
      <i class="fa fa-headphones"></i><span>联系客服</span>
    </div>
    <!--关于-->
    <div class="about" @click="about">
      <i class="fa fa-podcast"></i><span>关于</span>
    </div>
    <!--扫一扫-->
    <!--<div class="Sweep" @click="Sweep">-->
      <!--<img src='../../assets/s.png'><span>扫一扫</span>-->
    <!--</div>-->
    <!--推荐给好友-->
    <div class="Recommend" @click="Recommend">
      <i class="fa fa-share-square-o" ></i><span>推荐给好友</span>
    </div>
    <!--退出登录-->
    <div class="power-off" @click="out">
      <i class="fa fa-power-off"></i><span>退出登录</span>
    </div>
    <van-popup v-model="show"><img src="../../assets/83E0F7E2962E7492D66C6AAFC9014E03.png" alt="">
    <div style="text-align: center">请分享此二维码</div></van-popup>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import {isLogin} from '../../api/Api'
import cookieUtil from '../../router/token'
export default {
  name: 'Userinfo',
  data () {
    return {
      userinfo: '',
      token: '',
      show: false
    }
  },
  created () {
    this.$store.dispatch('isshow', true)
    this.$store.dispatch('isshow_', true)
    this.token = this.$store.state.token
    let params = {
      token: this.token
    }
    isLogin(params).then((res) => {
      if (res.data.code === 2000) {
        this.userinfo = res.data.data.userinfo
      }
    })
  },
  methods: {
    out: function () {
      Dialog.confirm({
        title: '退出登录',
        message: '确定要退出当前登录状态吗？'
      }).then(() => {
        let arr = cookieUtil.getCookies('token')
        var istoken = ''
        if (arr) {
          istoken = unescape(arr)
        }
        let tok = ''
        tok = unescape(istoken)
        if (tok != null) {
          cookieUtil.setCookies('token', '')
          this.$router.go(0)
        }
      }).catch(() => {
      })
    },
    changepassword: function () {
      this.$router.push('/ChangePassword')
    },
    myself () {
      this.$router.push({
        path: '/archivedetails',
        query: {
          id: this.userinfo.id,
          modenum: 'archive',
          tit: '我的档案'
        }
      })
    },
    cellkf () {
      this.$router.push('/kefu')
    },
    about () {
      this.$router.push('/about')
    },
    Sweep () {
      Dialog({ message: '请使用微信扫码' })
    },
    Recommend () {
      this.show = true
    }
  }
}
</script>

<style scoped>
.Userinfo{
  width: 100%;
  background-color: #F2F2F2;
  /*overflow: hidden;*/
  margin-bottom: 3.125rem;
}
  .user_{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
  }
  .user_photo{
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .user_info{
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: start;
  }
.user_info>div{
  margin: 0.3rem 0;
}
  .user_photo>img{
    width: 60%;
  }
  .user_name{
    color: #3c3c3c;
    /*font-size: 0.8rem;*/
    font-size: 0.9rem;
  }
  .user_name>span:nth-child(2){
    font-size: 0.6rem;
    margin-left: 0.2rem;
  }
  .user_com{
    color: #3c3c3c;
    font-size: 0.8rem;
  }
  .user_phone{
    color: #3c3c3c;
    font-size: 0.8rem;
  }
  .setpassword,
  .cellkf,
  .about,
  .Recommend,
  .power-off,
  .Sweep{
    /*width: 100%;*/
    margin-top: 0.6rem;
    background-color: #fff;
    padding: 0.6rem 2rem;
    color: black;
    font-size: 0.8rem;
  }
  .power-off{
    border-bottom: 1px solid #F2F2F2;
    font-size: 0.8rem;
  }
  .setpassword>i,
  .cellkf>i,
  .about>i,
  .Recommend>i,
  .power-off>i,
  .Sweep>i{
    display: inline-block;
    width: 0.9rem;
    font-size: 0.9rem;
    text-align: center;
    margin-right: 1rem;
    color: #75c2ea;
  }
  .Sweep>img{
    width: 0.9rem;
    text-align: center;
    margin-right: 1rem;
    color: #75c2ea;
  }
</style>
