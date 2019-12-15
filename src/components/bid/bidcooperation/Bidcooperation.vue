<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <!--搜索-->
    <Search_ class="search" @thiskeyword="thiskeyword" ref="cleankeyword"></Search_>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="bidcooperationlist">
      <van-list
        v-model="loading_"
        :error.sync="error_"
        :finished="finished_"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :offset="offset_"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" class="bidcooperationlists" :key="index" @click="bidcooperdetails(item.id)" >
          <div>
            <div>
              <div><i class="fa fa-leanpub"></i><span>投标项目：{{item.bidname}}</span></div>
              <div>
              </div>
            </div>
            <div>
              <div><span>单位名称:</span><span>{{item.name}}</span></div>
              <div><span>法人:</span><span>{{item.legalperson}}</span></div>
            </div>
            <div>
              <div><span>联系人:</span><span>{{item.person}}</span></div>
              <div><span>联系电话:</span><span>{{item.tel}}</span></div>
              <div><span>合作方式:</span><span>{{item.type}}</span></div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Search_ from '@/components/search/Search_'
import {bidcooperationlist} from '../../../api/Api'
export default {
  name: 'Bidcooperation',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      tit: '合作企业管理',
      token: '',
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 1,
      list: [],
      page: 0,
      pagesize: 15,
      keyword: '',
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
      let param = {
        token: this.token,
        page: 1,
        pagesize: this.pagesize,
        keyword: this.keyword
      }
      bidcooperationlist(param).then((res) => {
        if (res.data.code === 2000) {
          this.page = 1
          this.list = []
          this.list = res.data.data.data
          this.isLoading_ = false
          if (this.list.length >= res.data.data.total) {
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
      let param = {
        token: this.token,
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword
      }
      bidcooperationlist(param).then((res) => {
        if (res.data.code === 2000) {
          this.list = [...this.list, ...res.data.data.data]
          this.loading_ = false
          if (this.list.length >= res.data.data.total) {
            this.finished_ = true
          }
        } else {
          this.loading_ = false
          this.error_ = true
        }
      })
    },
    bidcooperdetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/bidcooperationdetails',
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
  .bidcooperationlist{
    margin-top: 5.9rem;
    margin-bottom: 3.125rem;
  }
  .bidcooperationlists{
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
  .bidcooperationlists>div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    border-radius: 0.2rem;
    background-color: #f5f5f5;
  }
  .bidcooperationlists>div>div{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0.3rem 0;
  }
  .bidcooperationlists>div>div>div>span:nth-child(2){
    margin-left: 0.4rem;
  }
  .bidcooperationlists>div>div>div{
    max-width: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
