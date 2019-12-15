<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" :barisshow="barisshow" @showprop="showprop">
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
            <div>
              <div><i class="fa fa-file-text"></i><span>合同编号：{{item.num}}</span></div>
            </div>
            <div>
              <div><span>客户名称:</span><span>{{item.custname}}</span></div>
              <div><span>拥有者:</span><span>{{item.optname}}</span></div>
            </div>
            <div>
              <div><span>签约日期:</span><span>{{item.signdt}}</span></div>
              <div><span>合同金额(元):</span><span>{{item.money}}</span></div>
            </div>
            <div >
              <div><span>生效日:</span><span>{{item.startdt}}</span></div>
              <div><span>截止日:</span><span>{{item.enddt}}</span></div>
            </div>
            <div>
              <div><span>合同类型:</span><span>{{item.type}}</span></div>
              <div><span>状态:</span><span v-if="item.state_name === '生效中'">生效中<br/>{{item.day}}天后过期</span>
                <span v-else>{{item.state_name}}</span></div>
            </div>
            <div>
              <div><span>待收/付金额(元):</span><span>{{item.money}}</span></div>
              <div><span>创建人:</span><span>{{item.optname}}</span></div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <van-popup v-model="show" position="bottom" >
      <van-picker
        show-toolbar
        title="状态"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-popup v-model="shows_" class="bgcsss" :close-on-click-overlay="clickoverlays">
      <!--加载-->
      <van-loading type="spinner" color="#1989fa" />
    </van-popup>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Search_ from '@/components/search/Search_'
import {custractlist} from '../../../api/Api'
export default {
  name: 'Csmycustract',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      token: '',
      tit: '我下属的合同',
      page: 0,
      pagesize: 15,
      type: 6,
      status_: '',
      order: '',
      sort: '',
      columns: [
        {
          text: '下属所有合同',
          value: 6
        },
        {
          text: '已过期',
          value: 7
        }
      ],
      keyword: '',
      barisshow: true,
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 100,
      list: [],
      list_st: [],
      succ: false,
      modenum: '',
      show: false,
      shows_: false,
      clickoverlays: false
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
        type: this.type,
        signdt: ''
      }
      custractlist(params).then((res) => {
        if (res.data.code === 2000) {
          document.documentElement.scrollTop = 0
          this.page = 1
          this.list = res.data.data.data.data
          for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].ispay === 0) {
              if (this.list[i].type === 0) {
                this.list[i].money = `待收款${this.list[i].money}`
              } else {
                this.list[i].money = `待付款${this.list[i].money}`
              }
            } else if (this.list[i].ispay === 1) {
              if (this.list[i].type === 0) {
                this.list[i].money = '已全部收款'
              } else {
                this.list[i].money = '已全部付款'
              }
            } else {
              if (this.list[i].type === 0) {
                this.list[i].money = `待收款${this.list[i].money - this.list[i].moneys}`
              } else {
                this.list[i].money = `待付款${this.list[i].money - this.list[i].moneys}`
              }
            }
          }
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
        page: 1,
        pagesize: this.pagesize,
        keyword: this.keyword,
        type: this.type,
        signdt: ''
      }
      custractlist(params).then((res) => {
        if (res.data.code === 2000) {
          var len = this.list.length
          this.list = [...this.list, ...res.data.data.data.data]
          for (var i = len; i < this.list.length; i++) {
            if (this.list[i].ispay === 0) {
              if (this.list[i].type === 0) {
                this.list[i].money = `待收款${this.list[i].money}`
              } else {
                this.list[i].money = `待付款${this.list[i].money}`
              }
            } else if (this.list[i].ispay === 1) {
              if (this.list[i].type === 0) {
                this.list[i].money = '已全部收款'
              } else {
                this.list[i].money = '已全部付款'
              }
            } else {
              if (this.list[i].type === 0) {
                this.list[i].money = `待收款${this.list[i].money - this.list[i].moneys}`
              } else {
                this.list[i].money = `待付款${this.list[i].money - this.list[i].moneys}`
              }
            }
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
    onCancel () {
      this.show = false
    },
    onConfirm (e) {
      this.type = e.value
      this.onRefresh()
    },
    engindetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/csbranchcustractdetails',
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

</style>
