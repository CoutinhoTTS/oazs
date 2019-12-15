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
        <div v-for="(item, index) in list" class="searchalllists" :key="index" @click="thiscompanydetails(item.com_id, item.com_name)" >
          <div>
            <div>
              <div><i class="fa fa-building-o"></i><span>{{item.com_name}}</span></div>
              <div><span>法人:</span><span>{{item.legal_person}}</span></div>
            </div>
            <div>
              <div><span>注册地:</span><span>{{item.province_name}}</span></div>
              <div><span></span><span></span></div>
            </div>
            <div>
              <div><span>统一社会信用代码:</span><span>{{item.credit_code}}</span></div>
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
import {searchcompany} from '../../api/Api'
export default {
  name: 'Searchcompanylist',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      tit: '企业查询',
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
      offset_: 300,
      scrollTop: '',
      placeholder: '企业名称/法人/统一社会信用代码'
    }
  },
  created () {
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
  },
  mounted () {
    this.$refs.placeho.placehold(this.placeholder)
    this.handleScroll()
  },
  methods: {
    thiskeyword (e) {
      this.keyword = e
      this.onRefresh()
    },
    onRefresh () {
      this.first = 1
      this.page = 1
      let param = {
        token: this.token,
        page: this.page,
        pagesize: this.pagesize,
        first: this.first,
        keyword: this.keyword
      }
      searchcompany(param).then((res) => {
        if (res.data.code === 2000) {
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
      if (this.first === 1) {
        this.page = this.page + 1
        let param = {
          token: this.token,
          page: this.page,
          pagesize: this.pagesize,
          first: this.first,
          keyword: this.keyword
        }
        searchcompany(param).then((res) => {
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
      } else {
        this.page = this.page + 1
        let param = {
          token: this.token,
          page: this.page,
          pagesize: this.pagesize,
          first: this.first,
          keyword: this.keyword
        }
        searchcompany(param).then((res) => {
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
    thiscompanydetails (id, name) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/searchcompanydetails',
        query: {
          id: id,
          name: name,
          tit: that.tit
        }
      })
    },
    handleScroll () {
      var windowHeight = document.documentElement.clientHeight
      var scrollHeight = document.documentElement.scrollHeight
      this.offset_ = scrollHeight - windowHeight + 1
      if (scrollHeight - windowHeight === 0) {
        this.offset_ = 300
      }
    }
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
      this.handleScroll()
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

</style>
