<template>
  <div class="ChangePassword">
    <NavBar :titles="titles"></NavBar>
    <div class="Change">
      <van-field
        v-model="name"
        type="text"
        label="姓名"
        :disabled="disabled"
        placeholder=""
        required
      />
      <van-field
        v-model="realname"
        type="text"
        :disabled="disabled"
        label="用户名"
        placeholder=""
        required
      />
      <van-field
        v-model="phonetel"
        type="text"
        label="手机号"
        placeholder="请输入手机号"
      />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入新密码"
        />
        <van-field
          v-model="password_"
          type="password"
          label="确认密码"
          placeholder="确认密码"
        />
    </div>
    <div class="btn_">
      <button @click="isok">确认修改</button>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import {edituserinfo, edituserinfopost} from '../../api/Api'
export default {
  name: 'ChangePassword',
  components: {
    NavBar
  },
  data () {
    return {
      titles: '修改密码',
      oldpassword: '',
      password: '',
      password_: '',
      token: '',
      isshow: '',
      isshow_: '',
      name: '',
      realname: '',
      disabled: true,
      phonetel: ''
    }
  },
  created () {
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    this.token = this.$store.state.token
    let params = {
      token: this.token
    }
    edituserinfo(params).then((res) => {
      if (res.data.code === 2000) {
        this.name = res.data.data.realname
        this.realname = res.data.data.username
        this.phonetel = res.data.data.mobile
      }
    })
  },
  methods: {
    isok () {
      if (this.password === this.password_) {
        let param = {
          token: this.token,
          mobile: this.phonetel,
          pass: this.password
        }
        edituserinfopost(param).then((res) => {
          if (res.data.code === 2000) {
            this.$toast('修改成功！')
            setTimeout(() => {
              this.$router.go(0)
            }, 500)
          }
        })
      } else {
        this.$toast('两次密码必须相同')
      }
    }
  }
}
</script>

<style scoped>
.ChangePassword{
  width: 100%;
  height: 100vh;
}
  .Change{
    border: 1px solid #ededed;
    width: 80%;
    margin:30vh auto 0.5rem;
  }
  .btn_{
    width: 100%;
    text-align: center;
  }
  .btn_>button{
    display: inline-block;
    width: 7rem;
    padding: 0.3rem 0.6rem;
    background-color: #008ddd;
    color: white;
    border: none;
    border-radius: 0.3rem;
  }
</style>
