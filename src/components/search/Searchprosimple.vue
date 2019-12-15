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
        <div v-for="(item, index) in list" class="searchalllists" :key="index"  >
          <div>
            <div>
              <div><span>业绩类型:</span><span>{{item.type}}</span></div>
            </div>
            <div>
              <div><span>中标企业:</span><span>{{item.wbidname}}</span></div>
            </div>
            <div>
              <div><span>项目负责人:</span><span>{{item.manager}}</span></div>
              <div><span>项目编号:</span><span>{{item.pro_num}}</span></div>
            </div>
            <div>
              <div><span>项目名称:</span><span>{{item.projectname}}</span></div>
            </div>
            <div>
              <div><span>建设单位:</span><span>{{item.develop_organ}}</span></div>
            </div>
            <div>
              <div><span>中标金额:</span><span>{{item.wbidmoney}}</span></div>
              <div><span>中标日期:</span><span>{{item.wbiddt}}</span></div>
            </div>
            <div>
              <div><span>开工日期:</span><span>{{item.startdt}}</span></div>
              <div><span>竣工日期:</span><span>{{item.endddt}}</span></div>
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
import {searchprosimple} from '../../api/Api'
export default {
  name: 'Searchprosimple',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      token: '',
      tit: '业绩(简单)查询',
      first: 0,
      placeholder: '中标企业名称/项目名称/项目负责人',
      page: 0,
      pagesize: 15,
      keyword: '',
      list: [],
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 300,
      scrollTop: ''
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
      searchprosimple(param).then((res) => {
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
        searchprosimple(param).then((res) => {
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
        searchprosimple(param).then((res) => {
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
  },
  deactivated () {
    document.documentElement.scrollTop = 0
  }
}
</script>

<style scoped>

</style>
