<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit">
      </NavBar>
    </div>
    <!--搜索-->
    <Search_ class="search" @thiskeyword="thiskeyword" ref="cleankeyword"></Search_>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="certtrainlist">
      <van-list
        v-model="loading_"
        :error.sync="error_"
        :finished="finished_"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :offset="offset_"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" :key="index" class="certtrainlists" @click="certtraindetails(item.id)">
        <div>
        <div><i class="fa fa-indent"></i><span>{{item.content}}</span></div>
        <div><span>机构:</span><span>{{item.mechanism}}</span></div>
        <div><span>地点:</span><span>{{item.address}}</span></div>
        </div>
        <div>
        <div><span>[{{item.enroll_dt}}]</span></div>
        <div><span>费用(元):</span><span>{{item.money}}</span></div>
        <div v-if="item.isenroll === 1" ><span>状态:</span><span class="isenroll">已报名</span></div>
        <div v-if="item.isenroll === 0" ><span>状态:</span><span class="isenroll_">未报名</span></div>
        </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Search_ from '@/components/search/Search_'
import {trainlist} from '../../../api/Api'
export default {
  name: 'Certtrain',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      token: '',
      // 证书列表
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 1,
      list: [],
      page: 0,
      pagesize: 15,
      keyword: '',
      tit: '培训管理',
      modenum: '',
      scrollTop: ''
    }
  },
  created () {
    this.modenum = this.$route.query.modenum
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    this.token = this.$store.state.token
  },
  methods: {
    onRefresh () {
      let params = {
        token: this.token,
        page: 1,
        pagesize: this.pagesize,
        keyword: this.keyword
      }
      trainlist(params).then((res) => {
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
        token: this.token,
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword
      }
      trainlist(params).then((res) => {
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
    thiskeyword (e) {
      this.keyword = e
      this.onRefresh()
    },
    // 详情
    certtraindetails (id) {
      var that = this
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.$router.push({
        path: '/certtraindetails',
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
  .certtrainlist{
    margin-top: 5.9rem;
    margin-bottom: 3.125rem;
  }
  .certtrainlists{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    border-bottom: 1px solid #ededed;
  }
  .certtrainlists>div{
    margin: 0.5rem auto;
  }
  .certtrainlists>div:first-child,
  .certtrainlists>div:last-child{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .certtrainlists>div:first-child>div>span:last-child{
    margin-left: 0.4rem;
  }
  .certtrainlists>div:first-child>div,
  .certtrainlists>div:last-child>div{
    width: 30%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .certtrainlists>div:first-child>div:last-child,
  .certtrainlists>div:last-child>div:last-child{
    text-align: right;
  }
  .certtrainlists>div:last-child>div>span:nth-child(2){
    margin-left: 0.4rem;
  }
  .isenroll{
    display: inline-block;
    background-color: #0094dd;
    padding: 0.1rem;
    border-radius: 0.1rem;
    color: white;
  }
  .isenroll_{
    display: inline-block;
    background-color: #e56847;
    padding: 0.1rem;
    border-radius: 0.1rem;
    color: white;
  }
</style>
