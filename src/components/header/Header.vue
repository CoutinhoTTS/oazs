<template>
  <van-row>
    <van-col span="24" class="title_con"><img :src=logo alt=""><span>{{comtitle}}</span></van-col>
  </van-row>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      // 公司名称
      comtitle: '成都筑为建筑工程公司',
      // logo
      logo: ''
    }
  },
  created () {
    this.comtitle = this.$store.state.companyname
    this.logo = `http://demoapioazs.zhuwe.net/${this.$store.state.logo}`
  }
}
</script>

<style scoped>
  .title_con{
    height: 2.875rem;
    text-align: center;
    line-height: 2.875rem;
    background-color: #54c8ff;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: bolder;
  }
  .title_con>img{
    width: 1.8rem;
  }
  .title_con>span{
    margin-left: 1rem;
  }
</style>
