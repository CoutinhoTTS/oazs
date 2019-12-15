<template>
  <div >
    <div class="login_ban">
      <van-row type="flex" justify="center">
        <van-col span="22" >
          <div class="login_name">
            <img :src="logo" alt="">
            <div>
              <h3>{{com_name}}</h3>
            </div>
          </div>
          <div class="login_bans">
            <div v-show="islogin">
              <div><span>用户名:</span><input class="inputstyle"  v-model="user_name"  placeholder="用户名"></div>
              <div><span>密码:</span><input class="inputstyle" type="password" v-model="password_"  placeholder="请输入密码"></div>
            </div>
            <!--<div  v-show="!islogin">-->
              <!--<van-cell-group>-->
                <!--<van-field-->
                  <!--v-model="companyname"-->
                  <!--label="公司名"-->
                  <!--placeholder="请输入公司名称"-->
                <!--/>-->
                <!--<van-field-->
                  <!--v-model="department"-->
                  <!--label="部门"-->
                  <!--placeholder="请输入所在部门"-->
                <!--/>-->
                <!--<van-field-->
                  <!--v-model="name"-->
                  <!--label="姓名"-->
                  <!--placeholder="请输入姓名"-->
                <!--/>-->
                <!--<van-field-->
                  <!--v-model="phone_"-->
                  <!--label="手机号"-->
                  <!--placeholder="请输入手机号"-->
                  <!--:error-message="errormessage"-->
                <!--/>-->
                <!--<van-field-->
                  <!--v-model="sms"-->
                  <!--center-->
                  <!--clearable-->
                  <!--label="短信验证码"-->
                  <!--placeholder="请输入短信验证码"-->
                <!--&gt;-->
                  <!--<van-button slot="button" size="small" type="primary" @click.native="yanzhengma">发送验证码</van-button>-->
                <!--</van-field>-->
                <!--<van-field-->
                  <!--v-model="username_"-->
                  <!--label="用户名"-->
                  <!--placeholder="请输入用户名"-->
                  <!--error-message=""-->
                <!--/>-->
                <!--<van-field-->
                  <!--v-model="zpassworld"-->
                  <!--label="密码"-->
                  <!--placeholder="请输入密码"-->
                <!--/>-->
                <!--<van-field-->
                  <!--v-model="zpassworld_"-->
                  <!--label="确认密码"-->
                  <!--placeholder="请再次输入密码"-->
                <!--/>-->
              <!--</van-cell-group>-->
            <!--</div>-->
            <div class="login_btn">
              <div>
                <van-button v-if="islogin" type="info" size="small" @click.native="login_ing">登录</van-button>
                <!--<van-button v-if="!islogin" type="info" size="small" @click.native="zhuce">注册</van-button>-->
                <!--<span v-if="islogin" style="font-size: 0.8rem;color: #008ddd" @click="onlinezhuce">在线注册</span>-->
                <!--<span v-if="!islogin" style="font-size: 0.8rem;color: #008ddd" @click="onlinelogin">登录</span>-->
              </div>
            </div>
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col span="18">
          <span>Copyright ©2019</span>
          <a href="http://www.zhuwe.net" target="_blank">筑为智慧管理系统</a>
          <span> - 技术支持:</span>
          <a href="#" target="_blank">筑为智慧管开发团队</a>
          <span>客服热线：180-8106-8908</span>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import {login_, isLogin} from '../../api/Api'
import cookieUtil from '../../router/token'
import CryptoJS from 'crypto-js'
export default {
  name: 'Login',
  data () {
    return {
      // 公司名称
      com_name: '筑为智慧管理系统',
      // logo
      logo: require('../../assets/logo2.png'),
      user_name: '',
      password_: '',
      isshow: '',
      islogin: true,
      reg: /^[1]([3-9])[0-9]{9}$/,
      errormessage: '',
      first: 0
    }
  },
  created () {
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', false)
    this.isshow = this.$store.state.hfshow
    this.$emit('childhomeValue', this.isshow)
    this.user_name = cookieUtil.getCookies('username')
    let pas = cookieUtil.getCookies('password')
    this.password_ = this.getDAes(pas)
  },
  methods: {
    login_ing: function () {
      if (this.user_name === '' && this.password_ === '') {
        this.$toast('请输入用户名和密码')
      } else if (this.user_name === '') {
        this.$toast('请输入用户名')
      } else if (this.password_ === '') {
        this.$toast('请输入密码')
      } else {
        let param = {
          username: this.user_name,
          pass: this.password_
        }
        let that = this
        login_(param).then((res) => {
          if (res.data.code === 2500) {
            let token = res.data.data
            token = escape(token)
            cookieUtil.setCookies('token', token)
            let arr = cookieUtil.getCookies('token')
            that.$store.dispatch('tokens', arr)
            that.$store.dispatch('isshow', true)
            that.isshow = this.$store.state.hfshow
            that.$emit('childByValue', that.isshow)
            cookieUtil.setCookies('username', this.user_name)
            let pas = this.getAES(this.password_)
            cookieUtil.setCookies('password', pas)
            isLogin({token: token}).then((resp) => {
              if (resp.data.code === 2000) {
                this.$store.dispatch('companyname', resp.data.data.userinfo.comname)
                this.$store.dispatch('companylogo', resp.data.data.userinfo.logo)
              }
            })
            that.$toast('登录成功')
            setTimeout(() => {
              that.$router.push('/Home')
            }, 1000)
          } else {
            that.$toast(res.data.message)
          }
        })
      }
    },
    getAES: function (data) {
      let keyStr = '123456789ABCDEFG'
      let key = CryptoJS.enc.Utf8.parse(keyStr)
      let srcs = CryptoJS.enc.Utf8.parse(data)
      let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      return encrypted.toString()
    },
    getDAes: function (data) {
      let keyStr = '123456789ABCDEFG'
      let key = CryptoJS.enc.Utf8.parse(keyStr)
      let decrypt = CryptoJS.AES.decrypt(data, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
      return decryptedStr.toString()
    }
  }
}
</script>

<style scoped>
.login_ban{
  width: 100vw;
  background-color: #ffffff;
  padding-top: 20vh;
}
  .login_bans{
    width: 90%;
    background-color: #fff;
    margin: 0 auto;
    border: 0.05rem solid #ededed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .login_ban>div:last-child{
    text-align: center;
    margin-top: 1rem;
    color: black;
    font-size: 0.6rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0.3rem 0;
  }
.login_bans>div:first-child{
  width: 100%;
}
  .login_bans>div:first-child>div{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0.3rem 0;
    margin: 0.6rem auto;
  }
.login_bans>div:first-child>div>span{
  font-size: 0.8rem;
  display: inline-block;
  width: 20%;
}
.login_bans>div:first-child>div>input{
  font-size: 0.8rem;
  height: 1.8rem;
  width: 75%;
  padding-left: 0.3rem;
}
.login_name{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.login_name>img{
  width: 20%;
}
  .login_bans{
    padding: 1rem;
  }
  .login_btn a{
    font-size: 0.6rem;
  }
  .login_btn{
    margin: 0.6rem auto;
  }
  .inputstyle{
    background-color: #fff!important;
    border: 0.065rem solid #e1e1e1;
  }
</style>
