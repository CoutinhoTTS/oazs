<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" :barisshow="barisshow" @showprop="showprop">
      </NavBar>
    </div>
    <!--搜索-->
    <Search_ class="search" @thiskeyword="thiskeyword" ref="cleankeyword"></Search_>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="certcontlist">
      <van-list
        v-model="loading_"
        :error.sync="error_"
        :finished="finished_"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :offset="offset_"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" :key="index" class="certcontlists" @click="certcontdetails(item.id)">
          <div>
            <div><i class="fa fa-file-text-o"></i><span>{{item.contname}}</span></div>
            <div><span>合同编号:</span><span>{{item.num}}</span></div>
            <div><span>{{item.type}}</span></div>
          </div>
          <div>
            <div><span>合同状态:</span><span>{{item.is_sheng}}</span></div>
            <div v-html="item.status_name">
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <!--模态层-->
    <van-popup v-model="show" position="bottom" >
      <van-picker
        show-toolbar
        title="合同状态"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Search_ from '@/components/search/Search_'
import {certcontractlist} from '../../../api/Api'
export default {
  name: 'Certcontract',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      token: '',
      tit: '合同信息',
      show: false,
      keyword: '',
      barisshow: true,
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
      columns: [{
        key: '',
        text: '全部分类'
      }],
      modenum: '',
      scrollTop: ''
    }
  },
  created () {
    this.modenum = this.$route.query.modenum
    this.columns = [{
      key: '',
      text: '全部分类'
    }]
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
  },
  methods: {
    // 关键字
    thiskeyword (e) {
      this.keyword = e
      this.onRefresh()
    },
    // 分类
    showprop (e) {
      this.show = e
    },
    // 分类选择
    onCancel () {
      this.show = false
    },
    onConfirm (value, index) {
      this.status = value.key
      this.keyword = ''
      this.$refs.cleankeyword.clkeyword(this.keyword)
      this.onRefresh()
    },
    //  下拉刷新
    onRefresh () {
      let param = {
        page: 1,
        pagesize: this.pagesize,
        keyword: this.keyword,
        token: this.token,
        status: this.status
      }
      certcontractlist(param).then((res) => {
        if (res.data.code === 2000) {
          this.list_st = []
          this.page = 1
          this.show = false
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
      certcontractlist(param).then((res) => {
        if (res.data.code === 2000) {
          if (this.page === 1) {
            var sta = res.data.data.status
            for (var key in sta) {
              this.columns.push({
                key: key,
                text: sta[key]
              })
            }
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
    certcontdetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/certcontractdetails',
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
.certcontlist{
  margin-top: 5.9rem;
  margin-bottom: 3.125rem;
}
  .certcontlists{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #ededed;
    font-size: 0.8rem;
  }
.certcontlists>div{
  width: 100%;
  margin: 0.5rem auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
  .certcontlists>div>div>span:nth-child(2){
    margin-left: 0.4rem;
  }
.certcontlists>div:first-child>div:nth-child(2){
  width: 45%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.certcontlists>div:first-child>div:nth-child(1),
.certcontlists>div:first-child>div:nth-child(3){
  width: 22.5%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.certcontlists>div:first-child>div:nth-child(3){
  text-align: right;
}
</style>
