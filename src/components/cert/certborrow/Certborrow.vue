<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit">
      </NavBar>
    </div>
    <!--搜索-->
    <Search_ class="search" @thiskeyword="thiskeyword" ref="cleankeyword"></Search_>
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="certborrowlist">
      <van-list
        v-model="loading_"
        :error.sync="error_"
        :finished="finished_"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :offset="offset_"
        @load="onLoad"
      >
        <div class="certborrowlists" v-for="(item, index) in list" :key="index" @click="Certborrowdetails(item.id)">
          <div>
            <div><i class="fa fa-book"></i><span>{{item.name}}</span></div>
            <div><span>申请人:</span><span class="personN">{{item.applyname}}</span></div>
            <div></div>
          </div>
          <div>
            <div><span>预计归还日期:</span><span>{{item.expect_returndt}}</span></div>
            <div v-html="item.status_name">
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
import {certborrowlist} from '../../../api/Api'
export default {
  name: 'Certborrow',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      tit: '证书借还',
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
      status: '',
      list_st: [],
      succ: false,
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
        page: 1,
        pagesize: this.pagesize,
        keyword: this.keyword,
        token: this.token,
        status: this.status
      }
      certborrowlist(param).then((res) => {
        if (res.data.code === 2000) {
          this.list_st = []
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
      let param = {
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
        token: this.token,
        status: this.status
      }
      certborrowlist(param).then((res) => {
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
    Certborrowdetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/certborrowdetails',
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
.certborrowlist{
  margin-top: 5.9rem;
  margin-bottom: 3.125rem;
}
.certborrowlists{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  border-bottom: 1px solid #ededed;
}
  .certborrowlists>div{
    width: 100%;
    margin: 0.5rem auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
.certborrowlists>div:first-child>div{
  width: 32%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.certborrowlists>div:first-child>div:first-child>span{
  margin-left: 0.4rem;
}
.certborrowlists>div>div>span:nth-child(2){
  margin-left: 0.4rem;
}
</style>
