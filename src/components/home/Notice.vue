<template>
   <div class="notice">
     <van-row class="notice_all">
       <van-col span="6" class="notice_title">通知公告:</van-col>
       <van-col span="15" class="notice_text animated fadeIn " v-show="num === 0" >
         <div  v-for="(item, index) in otices[0]" :key="index" @click="noticedata(item.id)">
           <div>{{item.title}}</div>
           <span>[{{item.indate}}]</span>
         </div>
       </van-col>
       <van-col span="15" class="notice_text animated fadeIn " v-show="num === 1" >
         <div  v-for="(items, indexs) in otices[1]" :key="indexs" @click="noticedata(items.id)">
           <div>{{items.title}}</div>
           <span>[{{items.indate}}]</span>
         </div>
       </van-col>
       <van-col span="3" @click.native="noticelist"><van-icon name="arrow"  /></van-col>
     </van-row>
   </div>
</template>

<script>
import {inforlist} from '../../api/Api'
export default {
  name: 'Notice',
  data () {
    return {
      otices: [],
      token: '',
      num: 0
    }
  },
  created () {
    this.token = this.$store.state.token
    let params = {
      token: this.token,
      page: 1,
      pagesize: 4,
      type: 0
    }
    inforlist(params).then((res) => {
      let otices = res.data.data.data.data
      for (var j = 0; j < 2; j++) {
        this.otices.push([])
        for (var i = j * 2; i < (j * 2) + 2; i++) {
          if (otices[i]) {
            this.otices[j].push(otices[i])
          }
        }
      }
      var that = this
      setInterval(() => {
        if (that.num === 0) {
          that.num = 1
        } else {
          that.num = 0
        }
      }, 10000)
    })
  },
  methods: {
    noticelist () {
      this.$router.push({
        path: '/infor',
        query: {
          modenum: 'infor'
        }
      })
    },
    noticedata (id) {
      this.$router.push({
        path: '/infordetails',
        query: {
          id: id,
          modenum: 'infor',
          tit: '通知公告'
        }
      })
    }
  }
}
</script>

<style scoped>
.notice{
  width: 100%;
  height: 10vh;
  background-color: #fff;
}
.notice_all{
  height: 100%;
  width: 100%;
  line-height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.notice_title{
  font-size: 0.8rem;
  font-weight: bold;
  padding-left: 1rem;
}
.notice_text{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

}
.notice_text>div{
  height: 3vh;
  font-size: 0.8rem;
  line-height: 3vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  width: 100%;
}
.notice_text>div>div{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  padding-right: 0.2rem;
}
.notice_text>div>span{
  color: #75c2ea;
}
.notice_all>div{
  overflow: hidden;
  height: 100%;
}
  .notice_all>div:last-child>i{
    float: right;
    margin: auto 1rem;
    line-height: 10vh;
  }
</style>
