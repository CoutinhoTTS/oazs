<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" :barisshow="barisshow" @showprop="showprop">
      </NavBar>
    </div>
    <!--搜索-->
    <Search_ class="search" @thiskeyword="thiskeyword" ref="cleankeyword"></Search_>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="bidlistlist">
      <van-list
        v-model="loading_"
        :error.sync="error_"
        :finished="finished_"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :offset="offset_"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" class="bidlistlists" :key="index" @click="bidlistdetails(item.id)" >
          <div>
            <div>
              <div><i class="fa fa-align-right"></i><span>项目名称：{{item.name}}</span></div>
            </div>
            <div>
              <div><span>项目类型:</span><span>{{item.btype}}</span></div>
              <div><span>项目编号:</span><span>{{item.number}}</span></div>
            </div>
            <div>
              <div><span>项目地址:</span><span>{{item.address}}</span></div>
              <div>
                <div><span v-html="item.status_name"></span></div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <!--分类搜索-->
    <van-popup v-model="show" position="right" >
      <div class="rightclass">
        <van-dropdown-menu >
          <van-dropdown-item v-model="value1" :options="option1" @change="changevalue"/>
          <van-dropdown-item v-model="value2" :options="option2" @change="changevalue01"/>
        </van-dropdown-menu>
        <van-dropdown-menu >
          <van-dropdown-item v-model="value3" :options="option3" @change="changevalue02"/>
          <van-dropdown-item v-model="value4" :options="option4" @change="changevalue03"/>
        </van-dropdown-menu>
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
import {bidlists} from '../../../api/Api'
export default {
  name: 'Bidlist',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      tit: '投标信息',
      token: '',
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 1,
      list: [],
      barisshow: true,
      show: false,
      // 请求参数
      page: 0,
      pagesize: 15,
      keyword: '',
      option1: [
        {text: '审核状态', value: '-1'}
      ],
      option2: [
        {text: '管理状态', value: '0'}
      ],
      option3: [
        {text: '投标状态', value: '0'}
      ],
      option4: [
        {text: '选择时间', value: '0'}
      ],
      value1: '-1',
      value2: '0',
      value3: '0',
      value4: '0',
      modenum: '',
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
    // 打开模态
    showprop (e) {
      this.show = e
    },
    // 关键字
    thiskeyword (e) {
      this.keyword = e
      this.onRefresh()
    },
    //  刷新
    onRefresh () {
      this.bidlists_()
    },
    onLoad () {
      this.page = this.page + 1
      let params = {}
      if (this.value1 === '-1') {
        params = {
          token: this.token,
          page: this.page,
          pagesize: this.pagesize,
          keyword: this.keyword,
          type: this.value2,
          status: '',
          bid_status: this.value3,
          bid_time: this.value4
        }
      } else {
        params = {
          token: this.token,
          page: this.page,
          pagesize: this.pagesize,
          keyword: this.keyword,
          type: this.value2,
          status: this.value1,
          bid_status: this.value3,
          bid_time: this.value4
        }
      }
      bidlists(params).then((res) => {
        if (res.data.code === 2000) {
          this.option1 = [
            {text: '审核状态', value: '-1'}
          ]
          this.option2 = [
            {text: '管理状态', value: '0'}
          ]
          this.option3 = [
            {text: '投标状态', value: '0'}
          ]
          this.option4 = [
            {text: '选择时间', value: '0'}
          ]
          var status = res.data.data.status
          for (var key in status) {
            this.option1.push(
              {
                text: status[key],
                value: key
              }
            )
          }
          var type = res.data.data.type
          for (var key1 in type) {
            this.option2.push(
              {
                text: type[key1],
                value: key1
              }
            )
          }
          var bidstatus = res.data.data.bid_status
          for (var key2 in bidstatus) {
            this.option3.push(
              {
                text: bidstatus[key2],
                value: key2
              }
            )
          }
          var bidtime = res.data.data.bid_time
          for (var key3 in bidtime) {
            this.option4.push(
              {
                text: bidtime[key3],
                value: key3
              }
            )
          }
          this.list = [...this.list, ...res.data.data.data.data]
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
    changevalue (value) {
      this.value1 = value
    },
    changevalue01 (value) {
      this.value2 = value
    },
    changevalue02 (value) {
      this.value3 = value
    },
    changevalue03 (value) {
      this.value4 = value
    },
    sesrch () {
      this.show = false
      this.bidlists_()
    },
    closes () {
      this.show = false
    },
    //  初始化数据
    bidlists_ () {
      this.page = 1
      let params = {}
      if (this.value1 === '-1') {
        params = {
          token: this.token,
          page: this.page,
          pagesize: this.pagesize,
          keyword: this.keyword,
          type: this.value2,
          status: '',
          bid_status: this.value3,
          bid_time: this.value4
        }
      } else {
        params = {
          token: this.token,
          page: this.page,
          pagesize: this.pagesize,
          keyword: this.keyword,
          type: this.value2,
          status: this.value1,
          bid_status: this.value3,
          bid_time: this.value4
        }
      }
      bidlists(params).then((res) => {
        if (res.data.code === 2000) {
          this.option1 = [
            {text: '审核状态', value: '-1'}
          ]
          this.option2 = [
            {text: '管理状态', value: '0'}
          ]
          this.option3 = [
            {text: '投标状态', value: '0'}
          ]
          this.option4 = [
            {text: '选择时间', value: '0'}
          ]
          var status = res.data.data.status
          for (var key in status) {
            this.option1.push(
              {
                text: status[key],
                value: key
              }
            )
          }
          var type = res.data.data.type
          for (var key1 in type) {
            this.option2.push(
              {
                text: type[key1],
                value: key1
              }
            )
          }
          var bidstatus = res.data.data.bid_status
          for (var key2 in bidstatus) {
            this.option3.push(
              {
                text: bidstatus[key2],
                value: key2
              }
            )
          }
          var bidtime = res.data.data.bid_time
          for (var key3 in bidtime) {
            this.option4.push(
              {
                text: bidtime[key3],
                value: key3
              }
            )
          }
          this.list = []
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
    // 详情
    bidlistdetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/bidlistdetails',
        query: {
          id: id,
          modenum: that.modenum,
          tit: that.tit
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
  height: 100vh;
}
.btngroup{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem;
}
  .bidlistlist{
    margin-top: 5.9rem;
    margin-bottom: 3.125rem;
  }
  .bidlistlists{
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  .bidlistlists>div{
    padding: 0.2rem;
    border-radius: 0.2rem;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
.bidlistlists>div>div{
  width: 100%;
 display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.3rem 0;
}
.bidlistlists>div>div>div{
  max-width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bidlistlists>div>div>div>span:nth-child(2){
  margin-left: 0.4rem;
}
</style>
bidlist
