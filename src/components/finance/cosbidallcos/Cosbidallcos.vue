<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" :barisshow="barisshow" @showprop="showprop">
      </NavBar>
    </div>
    <!--搜索-->
    <Search_ class="search" @thiskeyword="thiskeyword" ref="cleankeyword"></Search_>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="bidworklist">
      <van-list
        v-model="loading_"
        :error.sync="error_"
        :finished="finished_"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :offset="offset_"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" class="bidworklists" :key="index" @click="bidcoslistdetails(item.id)" >
          <div>
            <div>
              <div><i class="fa fa-file-pdf-o"></i><span>投标项目：{{item.bidname}}</span></div>
            </div>
            <div>
              <div><span>费用名:</span><span>{{item.name}}</span></div>
              <div><span>费用金额(万元):</span><span>{{item.money}}</span></div>
            </div>
            <div>
              <div><span>经办人:</span><span>{{item.jingbanname}}</span></div>
              <div v-html="item.status_name">
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <!--分类搜索-->
    <van-popup v-model="show" position="bottom" >
      <van-picker
        show-toolbar
        title="审核状态"
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
import {bidcoslist} from '../../../api/Api'
export default {
  name: 'Cosbidallcos',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      barisshow: true,
      tit: '投标费用',
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
      status: '',
      show: false,
      // 状态
      columns: [],
      succ: false,
      list_st: [],
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
    showprop (e) {
      this.show = e
    },
    bidcoslist () {
      this.page = 1
      let param = {
        token: this.token,
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
        status: this.keyword
      }
      bidcoslist(param).then((res) => {
        if (res.data.code === 2000) {
          this.columns = []
          this.list_st = []
          var statu = res.data.data.status
          for (var key in statu) {
            this.columns.push({
              text: statu[key],
              value: key
            })
          }
          this.list = res.data.data.data.data
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
    thiskeyword (e) {
      this.keyword = e
      this.onRefresh()
    },
    onLoad () {
      this.page = this.page + 1
      let params = {
        token: this.token,
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
        status: this.status
      }
      bidcoslist(params).then((res) => {
        if (res.data.code === 2000) {
          this.list = [...this.list, ...res.data.data.data.data]
          this.columns = []
          var status = res.data.data.status
          for (var key in status) {
            this.columns.push({
              text: status[key],
              value: key
            })
          }
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
    onRefresh () {
      this.bidcoslist()
    },
    onCancel () {
      this.show = false
    },
    onConfirm (e) {
      this.status = e.value
      this.show = false
      this.onRefresh()
    },
    bidcoslistdetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/bidallcosdetails',
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
  .bidworklist{
    margin-top: 5.9rem;
    margin-bottom: 3.125rem;
  }
  .bidworklists{
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  .bidworklists>div{
    padding: 0.2rem;
    border-radius: 0.2rem;
    background-color: #f5f5f5;
  }
  .bidworklists>div>div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0.3rem 0;
  }
  .bidworklists>div>div>div{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bidworklists>div>div>div>span:nth-child(2){
    margin-left: 0.4rem;
  }
</style>
