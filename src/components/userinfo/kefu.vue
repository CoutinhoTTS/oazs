<template>
  <div style="padding: 3rem 0 3.125rem">
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <div class="kefu">
      <div><span><i class="fa fa-headphones"></i><span>客服热线</span></span><span><a href="tel:18081069808">18081069808</a></span></div>
      <div><span><i class="fa fa-qq"></i><span>QQ质询</span></span><span><a href='http://wpa.qq.com/msgrd?v=3&uin=681932&site=qq&menu=yes&from=message&isappinstalled=0'>681932</a></span></div>
      <div>
        <span><i class="fa fa-weixin"></i><span>微信二维码</span></span>
        <div>
          <img src="../../assets/6196045603C719910FCED0345BCB78C9.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
export default {
  name: 'kefu',
  components: {
    NavBar
  },
  data () {
    return {
      tit: '客服'
    }
  },
  created () {
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
  }
}
</script>

<style scoped>
.kefu{
  width: 100%;
  background-color: #e1e1e1;
}
.kefu>div{
  padding: 0.3rem 1rem;
  margin: 0.2rem auto;
  background-color: #fff;
}
  .kefu i{
    color: rgba(29, 180, 255, 0.75);
    margin: auto 0.3rem;
  }
  .kefu>div:first-child,
  .kefu>div:nth-child(2){
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
  }
.kefu>div:nth-child(3){
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  font-size: 0.8rem;
}
.kefu>div:nth-child(3)>div{
  width: 100%;
}
.kefu>div:nth-child(3)>div>img{
  width: 100%;
}
</style>
