<template>
  <div class="functiontwo_all">
    <Title :Tname = 'Tname' :isshow = 'isshow' class="functiontwo_"></Title>
    <van-row class="functiontwo">
      <van-col span="6" @click.native="cosfininfom"><van-icon name="balance-pay" class="functiontwo_bgc1" /><span>费用报销</span></van-col>
      <van-col span="6" @click.native="goodmuse"><van-icon name="notes-o" class="functiontwo_bgc2" /><span>物品领用</span></van-col>
      <van-col span="6" @click.native="Leave"><van-icon name="records" class="functiontwo_bgc3" /><span>请假</span></van-col>
      <van-col span="6" @click.native="Overtime"><van-icon name="underway-o" class="functiontwo_bgc4" /><span>加班</span></van-col>
    </van-row>
    <van-row class="functiontwo">
      <van-col span="6"  @click.native="Businesstravel"><van-icon name="send-gift-o" class="functiontwo_bgc1" /><span>出差</span></van-col>
      <van-col span="6" @click.native="sealapl"><van-icon name="desktop-o" class="functiontwo_bgc2" /><span>印章使用</span></van-col>
      <van-col span="6" @click.native="dailymy"><van-icon name="description" class="functiontwo_bgc4" /><span>工作日报</span></van-col>
      <van-col span="6" @click.native="allwork" ><van-icon name="plus" class="functiontwo_bgc5" /><span>更多</span></van-col>
    </van-row>
  </div>
</template>

<script>
import Title from '@/components/title/Title'
export default {
  name: 'Functiontwo',
  components: {
    Title
  },
  data () {
    return {
      Tname: '常用功能',
      isshow: false
    }
  },
  methods: {
    allwork: function () {
      this.$router.push('/Work')
    },
    Leave () {
      this.$router.push('/Leave')
    },
    cosfininfom () {
      this.$router.push({
        path: '/cosfininfom',
        query: {
          modenum: 'cosfininfom'
        }
      })
    },
    goodmuse () {
      this.$router.push({
        path: '/goodmuse',
        query: {
          modenum: 'goodmuse'
        }
      })
    },
    sealapl () {
      this.$router.push({
        path: '/sealapl',
        query: {
          modenum: 'sealapl'
        }
      })
    },
    dailymy () {
      this.$router.push({
        path: '/dailymy',
        query: {
          modenum: 'dailymy'
        }
      })
    },
    Overtime () {
      this.$router.push({
        path: '/overtime',
        query: {
          modenum: 'kqinfojb'
        }
      })
    },
    Businesstravel () {
      this.$router.push({
        path: '/businesstravel'
      })
    }
  }
}
</script>

<style scoped>
.functiontwo_all{
  width: 100vw;
  margin-top: 1rem;
  background-color: #fff;
}
.functiontwo>div{
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top:0.5rem;
  background-color: #fff;
}
.functiontwo{
  margin: 1rem auto;
}
.functiontwo>div>i{
  display: inline-block;
  padding: 0.5rem;
  font-size: 1.3rem;
  border-radius: 0.3rem;
  color: white;
}
.functiontwo>div>span{
  font-size: 0.7rem;
  margin: 0.5rem auto;
}
.functiontwo_bgc1{
    background-color: #36d296;
  }
.functiontwo_bgc2{
  background-color: #2dd5ff;
}
.functiontwo_bgc3{
  background-color: #ff8e42;
}
.functiontwo_bgc4{
  background-color: #d2c810;
}
  .functiontwo_bgc5{
    color: #5c5c5c !important;
    border:1px solid #a6a6a6;
  }

</style>
