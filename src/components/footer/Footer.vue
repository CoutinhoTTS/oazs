<template>
  <div>
    <div class="models" v-show="vshow" @click="closemodel">
    </div>
    <van-row class="footerbar" >
      <van-col span="5" @click.native="closemodel"><router-link to='/Home' tag='li' active-class ='activeClass'><van-icon name="wap-home" /><span>首页</span></router-link></van-col>
      <van-col span="5" @click.native="closemodel"><router-link to='/Work' tag='li' active-class ='activeClass'><van-icon name="apps-o" /><span>工作</span></router-link></van-col>
      <van-col span="4">
        <van-icon name="add-o" id="addobjs" @click.native="addobject"/>
        <div class="addobjs animated zoomIn" v-show="vshow">
          <div>
            <div @click="intoadd">
              <van-icon name="todo-list-o"/>
              <span>
              进度填报
            </span>
            </div>
            <div @click="intoadd_">
              <van-icon name="records"/>
              <span>
              施工日志
            </span>
            </div>
            <div @click="intoadd__">
              <van-icon name="notes-o"/>
              <span>
              安全日志
            </span>
            </div>
          </div>
          <div></div>
        </div>
      </van-col>
      <van-col span="5" @click.native="closemodel"><router-link to='/Search' tag='li' active-class ='activeClass'><van-icon name="search" /><span>查询</span></router-link></van-col>
      <van-col span="5" @click.native="closemodel"><router-link to='/Userinfo' tag='li' active-class ='activeClass'><van-icon name="contact" /><span>我的</span></router-link></van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      vshow: false
    }
  },
  methods: {
    addobject () {
      if (!this.vshow) {
        this.vshow = true
      } else {
        this.vshow = false
      }
    },
    closemodel () {
      if (this.vshow) {
        this.vshow = false
      }
    },
    intoadd () {
      this.$router.push({
        path: '/addprogress',
        query: {
          modenum: 'enginspeed'
        }
      })
      this.vshow = false
    },
    intoadd_ () {
      this.$router.push({
        path: '/addconstruction',
        query: {
          modenum: 'conprocessbuildlog'
        }
      })
      this.vshow = false
    },
    intoadd__ () {
      this.$router.push({
        path: '/addsecurity',
        query: {
          modenum: 'enginseclog'
        }
      })
      this.vshow = false
    }
  }
}
</script>

<style scoped>
  li{
    list-style: none;
  }
li.activeClass{
  background-color: #54c8ff;
  color: white;
}
.footerbar{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 200;
  border-top:1px solid #ececec;
}
  .footerbar li{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .footerbar>div:nth-child(3){
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .footerbar>div>li{
    padding-top: 0.2rem ;
    padding-bottom: 0.3rem ;
  }
  .footerbar>div:nth-child(3){
    padding-top: 0.2rem ;
    padding-bottom: 0.3rem ;
  }
  .footerbar>div>li>i{
    font-size: 1.5rem;
  }
  .footerbar>div:nth-child(3)>i{
    font-size: 2.5rem;
    color: #ff7b53;
  }
  .footerbar>div>li>span{
    font-size: 0.6rem;
  }
  .addobjs{
    position: absolute;
    width: 90vw;
    top: -190%;
    left: 5vw;
    z-index: 102;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .addobjs>div:last-child{
    border: 0.5rem solid transparent;
    border-top-color: rgb(217, 217, 217);
  }
  .addobjs>div:first-child{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0.5rem 0;
    border-radius: 0.8rem;
    background-color: rgb(217, 217, 217);
  }
  .addobjs>div>div{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .addobjs>div>div>i{
    font-size: 1.8rem;
    padding: 0.5rem;
    color: white;
  }
  .addobjs>div>div:first-child>i{
    background-color: #30b1ff;
    border-radius: 0.4rem;
  }
  .addobjs>div>div:nth-child(2)>i{
    background-color: #f61f41;
    border-radius: 0.4rem;
  }
  .addobjs>div>div:nth-child(3)>i{
    background-color: #ff8e42;
    border-radius: 0.4rem;
  }
  .addobjs>div>div>span{
    font-size: 0.9rem;
  }
  .models{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: transparent;
    z-index: 200;
  }
</style>
