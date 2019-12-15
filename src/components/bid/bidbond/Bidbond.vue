<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" :barisshow="barisshow" @showprop="showprop">
      </NavBar>
    </div>
    <!--搜索-->
    <Search_ class="search" @thiskeyword="thiskeyword" ref="cleankeyword"></Search_>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="bidbondlist">
      <van-list
        v-model="loading_"
        :error.sync="error_"
        :finished="finished_"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :offset="offset_"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" class="bidbondlists" :key="index" @click="bidbonddetails(item.id)" >
          <div>
            <div class="bidbondlistsrowfi">
              <div><i class="fa fa-money"></i><span>投标项目：{{item.bidname}}</span></div>
            </div>
            <div class="bidbondlistsrowsco">
              <div><span>开户行:</span><span>{{item.open_bank}}</span></div>
              <div><span>开户账号:</span><span>{{item.acc_number}}</span></div>
            </div>
            <div class="bidbondlistsrowthi">
              <div><span>收取单位:</span><span></span></div>
              <div v-html="item.status_name"></div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <!--分类搜索-->
    <van-popup v-model="show" position="bottom" >
      <div class="rightclass">
        <van-dropdown-menu >
          <van-dropdown-item v-model="value1" :options="option1" @change="changevalue"/>
          <van-dropdown-item v-model="value2" :options="option2" @change="changevalue01"/>
        </van-dropdown-menu>
        <van-dropdown-menu >
          <van-dropdown-item v-model="time_type" :options="option3" @change="changevalue02" class="changetime"/>
          <div class="date"><span @click="cstrtime">{{strtime}} </span><i class="jiange">-</i><span @click="cendtime"> {{endtime}}</span></div>
        </van-dropdown-menu>
        <div class="datetimexz" v-show="dateshow">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            @confirm="confirm"
            @cancel="cancel"
          />
        </div>
        <div class="btngroup" >
          <van-button type="info" size="small" @click="sesrch">搜索</van-button>
          <van-button type="danger" size="small" @click="closes">取消</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Search_ from '@/components/search/Search_'
import {bidbondlist} from '../../../api/Api'
export default {
  name: 'bidbond',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      tit: '保证金管理',
      token: '',
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 100,
      list: [],
      barisshow: true,
      show: false,
      // 请求参数
      page: 0,
      pagesize: 15,
      keyword: '',
      status: -1,
      state: -1,
      paydt_start: '',
      paydt_end: '',
      time_type: '',
      //  下拉选择
      value1: '-1',
      value2: '-1',
      option1: [
        {text: '审核状态', value: '-1'}
      ],
      option2: [
        {text: '保证金状态', value: '-1'}
      ],
      // 时间选择
      currentDate: new Date(),
      option3: [
        {text: '交/退款时间', value: ''},
        {text: '交款时间', value: '1'},
        {text: '退回时间', value: '2'}
      ],
      // 时间选择器显示
      dateshow: false,
      // 初始开始和结束时间
      strtime: '选择开始时间',
      endtime: '选择结束时间',
      // 判断是开始还是结束时间
      isstrorend: 0,
      modenum: '',
      // 审核
      list_st: [],
      succ: false,
      scrollTop: ''
    }
  },
  created () {
    this.modenum = this.$route.query.modenum
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
  },
  methods: {
    onRefresh () {
      let params = {
        token: this.token,
        page: 1,
        pagesize: this.pagesize,
        keyword: this.keyword,
        status: this.status,
        state: this.state,
        paydt_start: this.paydt_start,
        paydt_end: this.paydt_end,
        time_type: this.time_type
      }
      bidbondlist(params).then((res) => {
        if (res.data.code === 2000) {
          this.page = 1
          this.list_st = []
          this.option1 = [
            {text: '审核状态', value: '-1'}
          ]
          this.option2 = [
            {text: '保证金状态', value: '-1'}
          ]
          var status = res.data.data.status
          for (var key in status) {
            this.option1.push({
              text: status[key],
              value: key
            })
          }
          var state = res.data.data.state
          for (var key1 in state) {
            this.option2.push({
              text: state[key1],
              value: key1
            })
          }
          this.list = res.data.data.data.data
          this.show = false
          this.isLoading_ = false
          if (this.list.length >= res.data.data.data.total) {
            this.finished_ = true
            this.loading_ = false
          } else {
            this.finished_ = false
          }
        }
      })
    },
    onLoad () {
      this.page = this.page + 1
      let params = {
        token: this.token,
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
        status: this.status,
        state: this.state,
        paydt_start: this.paydt_start,
        paydt_end: this.paydt_end,
        time_type: this.time_type
      }
      bidbondlist(params).then((res) => {
        if (res.data.code === 2000) {
          this.option1 = [
            {text: '审核状态', value: '-1'}
          ]
          this.option2 = [
            {text: '保证金状态', value: '-1'}
          ]
          var status = res.data.data.status
          for (var key in status) {
            this.option1.push({
              text: status[key],
              value: key
            })
          }
          var state = res.data.data.state
          for (var key1 in state) {
            this.option2.push({
              text: state[key1],
              value: key1
            })
          }
          this.list = [...this.list, ...res.data.data.data.data]
          this.show = false
          this.loading_ = false
          if (this.list.length >= res.data.data.data.total) {
            this.finished_ = true
          }
        } else {
          this.loading_ = false
          this.error_ = true
        }
      })
    },
    thiskeyword (e) {
      this.keyword = e
      this.onRefresh()
    },
    bidbonddetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/bidbonddetails',
        query: {
          id: id,
          modenum: that.modenum,
          tit: that.tit
        }
      })
    },
    // 打开模态
    showprop (e) {
      this.show = e
    },
    changevalue (value) {
      this.status = value
    },
    changevalue01 (value) {
      this.state = value
    },
    changevalue02 (value) {
      this.time_type = value
      if (value !== 1 && value !== 2) {
        this.strtime = '选择开始时间'
        this.endtime = '选择结束时间'
      }
    },
    // 时间选择
    confirm (value) {
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
      if (this.time_type) {
        this.isstrorend = 1
        this.dateshow = true
      } else {
        this.$toast('请先选着时间类型')
      }
    },
    //  选着结束时间
    cendtime () {
      if (this.time_type) {
        if (this.strtime === '选择开始时间') {
          this.$toast('请先选择开始时间')
        } else {
          this.isstrorend = 2
          this.dateshow = true
        }
      } else {
        this.$toast('请先选着时间类型')
      }
    },
    //  搜索
    sesrch () {
      if (this.strtime !== '选择开始时间' && this.endtime !== '选择结束时间') {
        this.paydt_start = this.strtime
        this.paydt_end = this.endtime
        this.chushihua()
      } else if (this.strtime === '选择开始时间' && this.endtime === '选择结束时间') {
        this.paydt_start = ''
        this.paydt_end = ''
        this.chushihua()
      } else {
        this.$toast('开始时间和结束时间必须同时存在或都不存在')
      }
    },
    // 关闭搜索框
    closes () {
      this.show = false
    },
    //  初始化列表
    chushihua () {
      this.finished_ = false
      this.page = 1
      let params = {
        token: this.token,
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
        status: this.status,
        state: this.state,
        paydt_start: this.paydt_start,
        paydt_end: this.paydt_end,
        time_type: this.time_type
      }
      bidbondlist(params).then((res) => {
        if (res.data.code === 2000) {
          this.option1 = [
            {text: '审核状态', value: '-1'}
          ]
          this.option2 = [
            {text: '保证金状态', value: '-1'}
          ]
          var status = res.data.data.status
          for (var key in status) {
            this.option1.push({
              text: status[key],
              value: key
            })
          }
          var state = res.data.data.state
          for (var key1 in state) {
            this.option2.push({
              text: state[key1],
              value: key1
            })
          }
          this.list = []
          this.list = res.data.data.data.data
          this.show = false
          for (var i = 0; i < this.list.length; i++) {
            var arr = ((this.list[i].status_name || '').split('>')[1] || '').split('<')[0]
            this.list_st.push({name: '', is: ''})
            if ((this.list[i].status_name || '').split('>').length === 5) {
              this.list_st[i].name = ((this.list[i].status_name || '').split('>')[2] || '').split('<')[0]
              this.list_st[i].is = 2
            } else {
              if ((this.list[i].status_name || '').split('>')[2]) {
                this.list_st[i].name = arr
                this.list_st[i].is = 0
              } else {
                this.list_st[i].name = arr
                this.list_st[i].is = 1
              }
            }
            this.succ = true
          }
          this.loading_ = false
          if (this.list.length >= res.data.data.data.total) {
            this.finished_ = true
          }
        }
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'Work') {
      to.meta.isBack = false
    }
    next()
  },
  activated () {
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    if (!this.$route.meta.isBack) {
      Object.assign(this.$data, this.$options.data())
      this.token = this.$store.state.token
      this.modenum = this.$route.query.modenum
    }
    this.$route.meta.isBack = true
    document.documentElement.scrollTop = this.scrollTop
    document.body.scrollTop = this.scrollTop
  },
  deactivated () {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }
}
</script>

<style scoped>
.rightclass{
  width: 100vw;
  background-color: #fff;
  height: 100vh;
}
  .downclsaa>div{
    width: 100%;
    height: 2rem;
  }
.downclsaa>div>select{
  width: 100%;
  height: 100%;
}
  .datetimexz{
    width: 100%
  }
  .date{
    width: 70%;
    text-align: center;
    line-height: 50px;
    font-size: 0.8rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .btngroup{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0.5rem;
  }
  .changetime{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0.5rem;
    font-size: 0.8rem;
  }
  .jiange{
    text-align: center;
    margin:auto 0.2rem;
  }
  .bidbondlist{
    margin-top: 5.9rem;
    margin-bottom: 3.125rem;
  }
  .bidbondlists{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
.bidbondlists>div{
  background-color: #f5f5f5;
  padding: 0.2rem;
  border-radius: 0.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
  .bidbondlistsrowfi{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    margin: 0.3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
.bidbondlists>div>div{
  width: 100%;
}
  .bidbondlistsrowsco,
  .bidbondlistsrowthi{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0.3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  i{
    font-size: 1.2rem;
  }
.bidbondlistsrowfi>div>span:nth-child(2),
.bidbondlistsrowsco>div>span:nth-child(2),
.bidbondlistsrowthi>div>span:nth-child(2){
  margin-left: 0.4rem;
}
</style>
