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
              <div><i class="fa fa-file-word-o"></i><span>签署人：{{item.uname}}</span></div>
            </div>
            <div class="list_s">
              <div><span>部门:</span><span>{{item.dept_name}}</span></div>
              <div><span>合同名称:</span><span>{{item.name}}</span></div>
            </div>
            <div>
              <div><span>签署单位:</span><span>{{item.company}}</span></div>
              <div><span>合同类型:</span><span>{{item.httype}}</span></div>
            </div>
            <div class="list_s">
              <div><span>开始时间:</span><span>{{item.startdt}}</span></div>
            </div>
            <div>
              <div><span>截止时间:</span><span>{{item.enddt}}</span></div>
            </div>
            <div>
              <div><span>提前终止日期:</span><span>{{item.tqenddt}}</span></div>
              <div><span>状态:</span><span v-if="item.state_name === '已终止'" class="isno">{{item.state_name}}</span>
                <span v-if="item.state_name === '已过期'" class="isyes">{{item.state_name}}</span>
                <span v-if="item.state_name === '生效中'" class="isyes">{{item.state_name}}</span></div>
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
import {userractlist} from '../../../api/Api'
export default {
  name: 'Userract',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      token: '',
      tit: '人员合同',
      page: 0,
      pagesize: 15,
      type: 4,
      status_: '',
      order: '',
      sort: '',
      columns: [
        {
          text: '全部分类',
          value: 0
        },
        {
          text: '30天内过期',
          value: 1
        },
        {
          text: '生效中',
          value: 2
        },
        {
          text: '已终止',
          value: 3
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
        sort: this.sort,
        order: this.order
      }
      userractlist(params).then((res) => {
        if (res.data.code === 2000) {
          document.documentElement.scrollTop = 0
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
        page: 1,
        pagesize: this.pagesize,
        keyword: this.keyword,
        type: this.type,
        sort: this.sort,
        order: this.order
      }
      userractlist(params).then((res) => {
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
        path: '/userractdetails',
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
