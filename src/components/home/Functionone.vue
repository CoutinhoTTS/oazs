<template>
  <van-row class="functionone">
    <van-col span="6" @click.native="dealtw('handle')" ><van-icon name="replay" class="functionone_font1" :info="datas.handle" /><span>待办</span></van-col>
    <van-col span="6" @click.native="dealtw('flowsend')"><van-icon name="volume-o" class="functionone_font2" :info="datas.flowsend"/><span>单据提醒</span></van-col>
    <van-col span="6" @click.native="dealtw('todolist')"><van-icon name="notes-o" class="functionone_font3" :info="datas.todolist"/><span>提醒信息</span></van-col>
    <van-col span="6" @click.native="dealtw('emailm')"><van-icon name="free-postage" class="functionone_font4" :info="datas.emailm"/><span>邮件</span></van-col>
  </van-row>
</template>

<script>
import {indexflow} from '../../api/Api'
export default {
  name: 'Functionone',
  data () {
    return {
      token: '',
      datas: ''
    }
  },
  created () {
    this.token = this.$store.state.token
    let params = {
      token: this.token
    }
    indexflow(params).then((res) => {
      this.datas = res.data.data
    })
  },
  methods: {
    dealtw: function (e) {
      if (e === 'emailm') {
        this.$router.push({
          path: `/${e}`,
          query: {
            modenum: 'emailm'
          }
        })
      } else {
        this.$router.push({
          path: `/${e}`
        })
      }
    }
  }
}
</script>

<style scoped>
.functionone>div{
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top:1rem;
  padding-bottom: 1rem;
  background-color: #fff;
}
.functionone>div>i{
  display: inline-block;
  padding: 1rem;
  font-size: 1.3rem;
  border-radius: 1.6rem;
  color: white;
}
.functionone>div>span{
  font-size: 0.7rem;
  margin-top: 1rem;
}
  .functionone_font1{
    background-color: #54c8ff;
  }
.functionone_font2{
  background-color: #ff8e42;
}
.functionone_font3{
  background-color: #5eda6d;
}
.functionone_font4{
  background-color: #e92c4f;
}
</style>
