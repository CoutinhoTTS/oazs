<template>
  <div id="app">
    <div class="header_" v-if="hfshow">
      <Header class="header_all"></Header>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    <!--<router-view v-on:childByValue="childByValue" @childhomeValue = "childhomeValue"/>-->
    <Footer class="Footer" v-if="hfshow_"></Footer>
  </div>
</template>

<script>
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import $ from 'jquery'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      top: '',
      hfshow: this.$store.state.hfshow,
      hfshow_: this.$store.state.hfshow_
    }
  },
  created () {
    $(document).on('click', '.van-nav-bar__title', () => {
      this.top = document.documentElement.scrollTop
      var len = parseInt(this.top / 10)
      for (var i = 0; i < len + 1; i++) {
        if (this.top <= 10) {
          this.top = 0
        } else {
          this.top = this.top - 10
        }
        document.documentElement.scrollTop = this.top
        document.body.scrollTop = this.top
      }
    })
  },
  updated () {
    this.hfshow = this.$store.state.hfshow
    this.hfshow_ = this.$store.state.hfshow_
  },
  methods: {
  }
}

window.onload = function () {
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault()
  })
}
</script>
<style>
  .header_{
    width: 100%;
    height: 3rem;
  }
  .header_all{
    width: 100%;
    height: 3rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .NavBar{
    width: 100vw;
    height: 3rem;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 100;
  }
  .search{
    width: 100%;
    position: fixed;
    top: 2.95rem;
    left: 0;
    background-color: #fff;
    z-index: 100;
  }
  .isno{
    color: #2dd5ff;
  }
  .isyes{
    color: #e56847;
  }
  .isno_{
    color: red;
  }
  .personN{
    color: #0088cd;
  }
  .van-list i{
    font-size: 1.2rem;
    /*color: #afafaf;*/
  }
  .datails_pull{
    margin-top: 2.95rem;
    margin-bottom: 3.125rem;
  }
  .explian{
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    word-wrap:break-word;
    color: #7e7e7e;
  }
  .explian_{
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    word-wrap:break-word;
  }
  .requir{
    color: red;
  }
  .personname{
    color: #0088cd;
  }
  .bg_c{
    display: inline-block;
    padding: 0.1rem;
    border-radius: 0.2rem;
    background-color: #008ddd;
    color: white;
  }
  .bg_c_{
    display: inline-block;
    padding: 0.1rem;
    border-radius: 0.2rem;
    background-color: #f66f4b;
    color: white;
  }
  .bg_c__{
    display: inline-block;
    padding: 0.1rem;
    border-radius: 0.2rem;
    background-color: #f61f41;
    color: white;
  }
  .datailsList{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
  }
  .datailsList>div{
    width: 100%;
    display: flex;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ededed;
  }
  .datailsList>div>div:first-child{
    margin-left: 1rem;
  }
  .datailsList>div>div:last-child{
    margin-right: 1rem;
    max-width: 70%;
  }
  .srarchlist__{
    margin-top: 2.95rem;
  }
  .srarchlist_{
    margin-bottom: 3.125rem;
  }
  .srarchlist{
    margin-top: 5.9rem;
    margin-bottom: 3.125rem;
  }
  .searchalllists{
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  .searchalllists>div{
    background-color: #f7f8fa;
    padding: 0.2rem;
    border-radius: 0.2rem;
  }
  .searchalllists>div>div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
  }
  .searchalllists>div>div>div>span:nth-child(2){
    margin-left: 0.4rem;
  }
  .searchalllists>div>div>div>i{
    font-size: 1.2rem;
  }
  .bgcsss{
    background-color: transparent;
  }
  .listall_{
    margin-bottom: 3.125rem;
  }
  .van-dropdown-item{
    z-index: 2000!important;
  }
  .list{
    margin-top: 5.9rem;
    margin-bottom: 3.125rem;
  }
  .lists{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  .lists>div{
    background-color: #f5f5f5;
    padding: 0.2rem;
    border-radius: 0.2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .lists>div>div{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0.3rem 0;
  }
  .lists>div>div>div{
    max-width: 65%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .lists>div>div>div:nth-child(2){
    margin-left: 0.5rem;
  }
  .lists>div>div>div>span:nth-child(2){
    margin-left: 0.4rem;
  }
  .vue-html5-editor{
    z-index: 200!important;
  }
</style>
