<template>
  <div style="margin-bottom: 3.125rem">
    <div class="imgis">
      <img v-lazy="img" >
    </div>
    <!--高级联动查询-->
    <div class="searcgj">
        <div>
          <div><i class="fa fa-building-o"></i>
            <span>企业综合查询</span></div>
          <button class="btnsearch" @click="searchmultiple__">立即查询</button>
        </div>
        <div>
         <div> <i class="fa fa-calculator"></i>
           <span>高级查询</span></div>
          <button class="btnsearch" @click="searchprosenior__">立即查询</button>
        </div>
    </div>
    <!--查询-->
    <div class="searchall">
      <van-row type="flex" justify="space-around">
        <van-col span="5" class="" @click.native="searchuserlist">
          <i class="fa fa-user-o searchusercert" ></i>
          <span>查人员</span>
        </van-col>
        <van-col span="5" class="" @click.native="searchcompanylist">
          <i class="fa fa-calendar searchcompany"></i>
          <span>查企业</span>
        </van-col>
        <van-col span="5" class="" @click.native="searchqualitylist">
          <i class="fa fa-edit searchquality"></i>
          <span>查资质</span>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-col span="5" class="" @click.native="searchproseniorlist">
          <i class="fa fa-calculator searchprosimple"></i>
          <span>业绩(高级)查</span>
        </van-col>
        <van-col span="5" class="" @click.native="Searchprosimple">
          <i class="fa fa-search-minus searchprosenior"></i>
          <span>业绩(简单)查</span>
        </van-col>
        <van-col span="5" class="" @click.native="Searchmultiple">
          <i class="fa fa-building-o searchmultiple"></i>
          <span>综合查</span>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      img: require('../../assets/banner1.png')
    }
  },
  created () {
    this.$store.dispatch('isshow', true)
    this.$store.dispatch('isshow_', true)
  },
  methods: {
    searchuserlist () {
      this.$router.push('/searchusercertlist')
    },
    searchcompanylist () {
      this.$router.push('/searchcompanylist')
    },
    searchqualitylist () {
      this.$router.push('/searchqualitylist')
    },
    searchproseniorlist () {
      this.$router.push('/searchprosenior')
    },
    Searchmultiple () {
      this.$router.push('/searchmultiple')
    },
    Searchprosimple () {
      this.$router.push('/searchprosimple')
    },
    searchprosenior__ () {
      this.$router.push('/searchprosenior')
    },
    searchmultiple__ () {
      this.$router.push('/searchmultiple')
    }
  }
}
</script>

<style scoped>
  .searcgj{
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  .searcgj>div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #0088cd;
    color: white;
    padding: 0.5rem 0.5rem;
    margin: 0.5rem 0;
    border-radius: 0.3rem;
  }
  .btnsearch{
    background-color: #fff;
    border-radius: 0.2rem;
    border: none;
    color: #0088cd;
    font-size: 0.8rem;
  }
  .imgis{
    width: 100%;
  }
  .imgis>img{
    width: 100%;
  }
  .searchall>div{
    margin: 0.8rem auto;
  }
  .searchall>div>div{
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
  }
  .searchall>div>div>i{
    font-size: 1.3rem;
    display: inline-block;
    padding: 0.5rem;
    border-radius: 0.4rem;
  }
  .searchusercert{
    background-color: #30b1ff;
    color: white;
  }
  .searchcompany{
    background-color: #e56847;
    color: white;
  }
  .searchquality{
    background-color: #f61f41;
    color: white;
  }
  .searchprosimple{
    background-color: #d100f6;
    color: white;
  }
  .searchprosenior{
    background-color: #0fe9b3;
    color: white;
  }
  .searchmultiple{
    background-color: #c1e900;
    color: white;
  }
  .searchall span{
    font-size: 0.8rem;
  }
</style>
