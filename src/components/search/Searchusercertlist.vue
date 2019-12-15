<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <Search_ class="search" @thiskeyword="thiskeyword" ref="placeho"></Search_>
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="srarchlist">
      <van-list
        v-model="loading_"
        :error.sync="error_"
        :finished="finished_"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :offset="offset_"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" class="searchalllists" :key="index" @click="thisuserdetails(item.cert_id)" >
          <div>
            <div>
              <div><i class="fa fa-user-o"></i><span>{{item.realname}}</span></div>
              <div><span>证书名:</span><span>{{item.cert_tec_name}}</span></div>
            </div>
            <div>
              <div><span>证书专业:</span><span>{{item.reg_major}}</span></div>
              <div><span>证书编号:</span><span>{{item.cert_code}}</span></div>
            </div>
            <div>
              <div><span>注册号(执业印章号)</span><span>{{item.reg_cert_code}}</span></div>
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
import {searchusercert} from '../../api/Api'
export default {
  name: 'searchusercertlist',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      tit: '人员查询',
      token: '',
      first: 0,
      page: 0,
      pagesize: 15,
      keyword: '',
      list: [],
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 10,
      scrollTop: '',
      placeholder: '持证人姓名/证书名称/证书编号/注册号(执业印章号)'
    }
  },
  created () {
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
  },
  mounted () {
    this.$refs.placeho.placehold(this.placeholder)
    // this.handleScroll()
  },
  methods: {
    thiskeyword (e) {
      this.keyword = e
      this.onRefresh()
    },
    onRefresh () {
      this.loading_ = true
      this.finished_ = false
      this.first = 1
      this.page = 1
      let param = {
        token: this.token,
        page: this.page,
        pagesize: this.pagesize,
        first: this.first,
        keyword: this.keyword
      }
      searchusercert(param).then((res) => {
        if (res.data.code === 2000) {
          this.list = res.data.data.data.data
          this.isLoading_ = false
          this.loading_ = false
          if (this.list.length >= res.data.data.data.total) {
            this.finished_ = true
          } else {
            this.finished_ = false
          }
        }
      })
    },
    onLoad () {
      if (this.first === 1) {
        this.page = this.page + 1
        let param = {
          token: this.token,
          page: this.page,
          pagesize: this.pagesize,
          first: this.first,
          keyword: this.keyword
        }
        searchusercert(param).then((res) => {
          if (res.data.code === 2000) {
            this.first = 1
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
      } else if (this.first === 0) {
        this.page = this.page + 1
        let param = {
          token: this.token,
          page: this.page,
          pagesize: this.pagesize,
          first: this.first,
          keyword: this.keyword
        }
        searchusercert(param).then((res) => {
          if (res.data.code === 2000) {
            this.first = 1
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
      }
    },
    thisuserdetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/searchusercertdetails',
        query: {
          id: id,
          modenum: that.modenum,
          tit: that.tit
        }
      })
    }
    // handleScroll () {
    //   var windowHeight = document.documentElement.clientHeight
    //   var scrollHeight = document.documentElement.scrollHeight
    //   this.offset_ = scrollHeight - windowHeight + 1
    //   if (scrollHeight - windowHeight === 0) {
    //     this.offset_ = 300
    //   }
    // }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'Search') {
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
    }
    this.$route.meta.isBack = true
    document.documentElement.scrollTop = this.scrollTop
    document.body.scrollTop = this.scrollTop
  },
  deactivated () {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    this.loading_ = false
    this.finished_ = false
  }
}
</script>

<style scoped>
</style>
