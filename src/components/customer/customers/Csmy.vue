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
              <div><i class="fa fa-user-circle"></i><span>客户名称：{{item.name}}</span></div>
            </div>
            <div>
              <div><span>所属人:</span><span>{{item.createname}}</span></div>
              <div><span>客户类型:</span><span>{{item.type}}</span></div>
            </div>
            <div>
              <div><span>客户单位:</span><span>{{item.unitname}}</span></div>
              <div><span>联系手机:</span><span>{{item.mobile}}</span></div>
            </div>
            <div class="list_s">
              <div><span>是否标⭐:</span><span v-if="item.isstat === 1">是</span><span v-else>否</span></div>
              <div><span>是否共享:</span><span>{{item.shateid}}</span></div>
            </div>
            <div>
              <div><span>合同数:</span><span>{{item.htshu}}</span></div>
              <div><span>销售总额:</span><span>{{item.moneyz}}</span></div>
            </div>
            <div>
              <div><span>代收金额:</span><span>{{item.moneyd}}</span></div>
              <div><span>最后跟进:</span><span>{{item.lastdt}}</span></div>
            </div>
            <div>
              <div></div>
              <div><span>状态:</span><span v-if="item.status === 0" style="color: green">已停用</span><span v-else style="color: red">已启用</span></div>
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
import {consumerlist} from '../../../api/Api'
export default {
  name: 'Archive',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      token: '',
      tit: '我的客户',
      page: 0,
      pagesize: 15,
      type: 1,
      status_: '',
      order: '',
      sort: '',
      columns: [
        {
          text: '我的客户',
          value: 1
        },
        {
          text: '我全部的客户',
          value: 2
        },
        {
          text: '我标⭐的客户',
          value: 3
        },
        {
          text: '我停用的客户',
          value: 4
        },
        {
          text: '我创建的客户',
          value: 5
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
        type: this.type
      }
      consumerlist(params).then((res) => {
        if (res.data.code === 2000) {
          document.documentElement.scrollTop = 0
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
        page: 1,
        pagesize: this.pagesize,
        keyword: this.keyword,
        type: this.type
      }
      consumerlist(params).then((res) => {
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
      this.type = e.value
      this.onRefresh()
    },
    engindetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/csmydetails',
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
