<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <!--搜索-->
    <Search_ class="search" @thiskeyword="thiskeyword" ref="cleankeyword"></Search_>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="list">
      <van-list
        v-model="loading_"
        :error.sync="error_"
        :finished="finished_"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :offset="offset_"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" class="lists" :key="index" @click="engindetails(item.id)" >
          <div>
            <div class="list_s">
              <div><i class="fa fa-bank"></i><span>账户名称：{{item.bankname}}</span></div>
            </div>
            <div class="list_s">
              <div><span>开户银行:</span><span>{{item.openname}}</span></div>
            </div>
            <div class="list_s">
              <div><span>账号:</span><span>{{item.bankaccount}}</span></div>
            </div>
            <div>
              <div><span>开户时间:</span><span>{{item.opendt}}</span></div>
              <div><span>经办人:</span><span>{{item.jingname}}</span></div>
            </div>
            <div>
              <div><span>现金账户:</span><span>{{item.iscash}}</span></div>
              <div><span>是否启用:</span><span>{{item.status}}</span></div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <van-popup v-model="shows_" class="bgcsss" :close-on-click-overlay="clickoverlays">
      <!--加载-->
      <van-loading type="spinner" color="#1989fa" />
    </van-popup>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Search_ from '@/components/search/Search_'
import {banklist} from '../../../api/Api'
export default {
  name: 'Financebank',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      token: '',
      tit: '银行信息',
      page: 0,
      pagesize: 15,
      status_: '',
      keyword: '',
      barisshow: true,
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 100,
      list: [],
      succ: false,
      modenum: '',
      show: false,
      shows_: false,
      clickoverlays: false,
      type: 'revise'
    }
  },
  created () {
    this.modenum = this.$route.query.modenum
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
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
        page: 1,
        pagesize: this.pagesize,
        keyword: this.keyword,
        status: '',
        type: this.type
      }
      banklist(params).then((res) => {
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
          this.show = false
          this.shows_ = false
        } else {
          this.loading_ = false
          this.error_ = true
          this.show = false
          this.shows_ = false
        }
      })
        .catch(() => {
          this.shows_ = false
          this.$toast('出错了！')
        })
    },
    onLoad () {
      this.page = this.page + 1
      let params = {
        token: this.token,
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
        status: '',
        type: this.type
      }
      banklist(params).then((res) => {
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
    onCancel () {
      this.show = false
    },
    onConfirm (e) {
      this.status_ = e.value
      this.onRefresh()
    },
    engindetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/financebankdetails',
        query: {
          id: id,
          modenum: that.modenum,
          tit: that.tit
        }
      })
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
    document.body.scrollTop = this.scrollTop
  },
  deactivated () {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }
}
</script>

<style scoped>
  .list_s>div{
    max-width: 90%;
  }
</style>
