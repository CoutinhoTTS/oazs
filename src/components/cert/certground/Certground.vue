<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit">
      </NavBar>
    </div>
    <!--搜索-->
    <Search_ class="search" @thiskeyword="thiskeyword" ref="cleankeyword"></Search_>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="certgroundlist">
      <van-list
        v-model="loading_"
        :error.sync="error_"
        :finished="finished_"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :offset="offset_"
        @load="onLoad"
      >
        <div class="certgroundlist_" v-for="(item, index) in list" :key="index" @click="Certgrounddetails(item.id)">
          <div><div><i class="fa fa-address-book-o"></i><span>{{item.title}}</span></div>
          <div><span>{{item.personname}}</span></div>
            <div><span>项目名称:</span><span>{{item.projectname}}</span></div>
          </div>
          <div>
            <div>
              <span>开始/结束时间:</span><marquee  color="#2dd5ff" direction="left" scrollamount="3" align="absmiddle" height="100%" ><span class="marquees">{{item.enddt}}至{{item.optdt}}</span></marquee></div>
            <div v-if="item.isground ===1" ><span class="isg">已出场</span></div>
            <div v-if="item.isground ===0" ><span class="nog">未出场</span></div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Search_ from '@/components/search/Search_'
import {groundlist} from '../../../api/Api'
export default {
  name: 'Certground',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      tit: '出场管理',
      token: '',
      keyword: '',
      // 证书列表
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 1,
      list: [],
      page: 0,
      pagesize: 15,
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
    thiskeyword (e) {
      this.keyword = e
      this.onRefresh()
    },
    onRefresh () {
      let params = {
        page: 1,
        pagesize: this.pagesize,
        keyword: this.keyword,
        token: this.token
      }
      groundlist(params).then((res) => {
        if (res.data.code === 2000) {
          this.page = 1
          this.list = res.data.data.data.data
          this.isLoading_ = false
          if (this.list.length >= res.data.data.data.total) {
            this.loading_ = false
            this.finished_ = true
          } else {
            this.finished_ = false
          }
        }
      })
    },
    onLoad () {
      this.page = this.page + 1
      let params = {
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
        token: this.token
      }
      groundlist(params).then((res) => {
        if (res.data.code === 2000) {
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
    Certgrounddetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/certgrounddetails',
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
  .certgroundlist{
    margin-top: 6.5rem;
    margin-bottom: 3.125rem;
  }
  .certgroundlist_{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    border-bottom: 1px solid #ededed;
  }
  .certgroundlist_>div:last-child,
  .certgroundlist_>div:first-child{
    margin: 0.5rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .certgroundlist_>div:first-child>div{
    width: 30%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .certgroundlist_>div:last-child>div{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .certgroundlist_>div:last-child>div:first-child{
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .certgroundlist_>div:last-child>div:first-child>span{
    margin-right: 0.3rem;
  }
  .certgroundlist_>div:last-child>div:last-child,
  .certgroundlist_>div:first-child>div:last-child{
    text-align: right;
  }
  .isg{
    display: inline-block;
    background-color: #008ddd;
    color: white;
    padding: 0.1rem;
    border-radius: 0.2rem;
  }
  .nog{
    display: inline-block;
    background-color: #e56847;
    color: white;
    padding: 0.1rem;
    border-radius: 0.2rem;
  }
  .certgroundlist_>div>div>span:nth-child(2){
    margin-left: 0.4rem;
  }
  .marquees{
    color: #2dd5ff;
  }
  .certgroundlist_>div>div>i{
    font-size: 1rem;
  }

</style>
