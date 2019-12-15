<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" :barisshow="barisshow" @showprop="showprop">
      </NavBar>
    </div>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="datails_pull" >
      <van-list
        v-model="loading_"
        :error.sync="error_"
        :finished="finished_"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :offset="offset_"
      >
        <div v-for="(item, index) in list" class="datailsList_" :key="index"  >
          <div><div>星期:</div><div v-html="item.week" style="margin-left: 1rem"></div></div>
          <div class="datailsList__" v-for="(items, indexs) in hylist" :key="indexs">
              <div ><div>{{items.name}}:</div>
                <div v-html="hydate(item,items)"></div>
              </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <div class="datesearchs">
        <div class="date"><span @click="cstrtime">{{strtime}} </span><i class="jiange">-</i><span @click="cendtime"> {{endtime}}</span></div>
        <van-button type="info" size="small" @click="sesrch">搜索</van-button>
      </div>
      <div class="datetimexz" v-show="dateshow">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </div>
    </van-popup>
    <van-popup v-model="shows_" class="bgcsss" :close-on-click-overlay="clickoverlays">
      <!--加载-->
      <van-loading type="spinner" color="#1989fa" />
    </van-popup>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Search_ from '@/components/search/Search_'
import {meetviewlist, gethyname} from '../../../api/Api'
export default {
  name: 'Goodm',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      token: '',
      tit: '会议室情况',
      currentDate: new Date(),
      page: 0,
      pagesize: 15,
      status_: '',
      keyword: '',
      barisshow: true,
      isLoading_: false,
      finished_: true,
      error_: false,
      loading_: false,
      offset_: 100,
      list: [],
      modenum: '',
      show: false,
      shows_: false,
      clickoverlays: false,
      // 时间
      strtime: '选择开始时间',
      endtime: '选择结束时间',
      dateshow: false,
      isstrorend: '',
      begin: '',
      end: '',
      hylist: []
    }
  },
  created () {
    this.modenum = this.$route.query.modenum
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    this.onLoads_()
  },
  methods: {
    // 打开分类
    showprop () {
      this.show = true
    },
    thiskeyword (e) {
      this.keyword = e
      this.onRefresh()
    },
    onRefresh () {
      this.shows_ = true
      let params = {
        token: this.token,
        begin: this.begin,
        end: this.end
      }
      meetviewlist(params).then((res) => {
        if (res.data.code === 2000) {
          this.list = res.data.data.data
          this.strtime = res.data.data.begindt
          this.endtime = res.data.data.enddt
          this.isLoading_ = false
          this.show = false
          this.shows_ = false
        } else {
          this.$toast('出错了！')
          this.show = false
          this.shows_ = false
        }
      })
        .catch(() => {
          this.shows_ = false
          this.$toast('出错了！')
        })
    },
    onLoads_ () {
      let params = {
        token: this.token,
        begin: this.begin,
        end: this.end
      }
      meetviewlist(params).then((res) => {
        if (res.data.code === 2000) {
          this.list = [...this.list, ...res.data.data.data]
          this.strtime = res.data.data.begindt
          this.endtime = res.data.data.enddt
        } else {
          this.$toast('出错啦')
        }
      })
      let par = {
        token: this.token,
        page: 1,
        pagesize: 100,
        keyword: ''
      }
      gethyname(par).then((res) => {
        if (res.data.code === 2000) {
          this.hylist = res.data.data
        }
      })
    },
    onCancel () {
      this.show = false
    },
    onConfirm (value) {
      var y = value.getFullYear()
      var m = value.getMonth() + 1
      var d = value.getDate()
      if (m < 10) {
        m = `0${m}`
      }
      if (d < 10) {
        d = `0${d}`
      }
      var val = `${y}-${m}-${d}`
      if (this.isstrorend === 1) {
        this.strtime = val
        this.dateshow = false
      } else if (this.isstrorend === 2) {
        this.endtime = val
        this.dateshow = false
        if (this.strtime.replace(/[^0-9]/ig, '') >= this.endtime.replace(/[^0-9]/ig, '')) {
          this.endtime = '选择结束时间'
          this.$toast('结束时间必须大于开始时间')
        }
      }
    },
    // 取消选择
    cancel () {
      this.dateshow = false
    },
    //  选着开始的时间
    cstrtime () {
      this.isstrorend = 1
      this.dateshow = true
    },
    //  选着结束时间
    cendtime () {
      if (this.strtime === '选择开始时间') {
        this.$toast('请先选择开始时间')
      } else {
        this.isstrorend = 2
        this.dateshow = true
      }
    },
    sesrch () {
      if (this.strtime !== '选择开始时间' && this.endtime !== '选择结束时间') {
        this.begin = this.strtime
        this.end = this.endtime
        this.onRefresh()
      } else if (this.strtime === '选择开始时间' && this.endtime === '选择结束时间') {
        this.begin = ''
        this.end = ''
        this.$toast('请完整选择时间')
      } else {
        this.$toast('开始时间和结束时间必须同时存在或都不存在')
      }
    },
    // 会议
    hydate (item, items) {
      var hyname = `hyname_${items.id}`
      return item[hyname]
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'Work' || to.name === 'Home') {
      from.meta.keepAlive = false
    } else {
      from.meta.keepAlive = true
    }
    next()
  },
  activated () {
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    document.documentElement.scrollTop = this.scrollTop
  },
  deactivated () {
    document.documentElement.scrollTop = 0
  }
}
</script>

<style scoped>
  .list_s>div{
    max-width: 90%;
  }
  .itemcont{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .date{
    width: 60%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 0.8rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-right: 0.065rem solid #e5e5e5;;
  }
  .datetimexz{
    width: 100%;
  }
  .jiange{
    text-align: center;
    margin:auto 0.2rem;
  }
  .datesearchs{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-bottom: 0.065rem solid grey;
  }
  .datailsList__>div{
    width: 100%;
    display: flex;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .datailsList__>div>div:first-child{
    margin-left: 1rem;
  }
  .datailsList__>div>div:last-child{
    max-width: 70%;
  }
  .datailsList_{
    width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    margin: 1rem auto;
    border-radius: 0.5rem;
    background-color: #f5f5f5;
    padding: 0.3rem;
  }
  .datailsList_>div{
    width: 100%;
    display: flex;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    border-bottom: 1px solid #ededed;
  }
</style>
