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
              <div><i class="fa fa-newspaper-o"></i><span>名称：{{item.title}}</span></div>
            </div>
            <div>
              <div><span>编号:</span><span>{{item.num}}</span></div>
              <div><span>项目类型:</span><span>{{item.type}}</span></div>
            </div>
            <div class="list_s">
              <div><span>开始时间:</span><span>{{item.startdt}}</span></div>
            </div>
            <div class="list_s">
              <div><span>截止时间:</span><span>{{item.enddt}}</span></div>
            </div>
            <div>
              <div><span>负责人:</span><span>{{item.fuze}}</span></div>
              <div><span>进度:</span><span>{{item.progress}}%</span></div>
            </div>
            <div>
              <div></div>
              <div v-if="succ">
                <div v-if="list_st[index].is === 0"><span class="isno">待执行</span></div>
                <div v-if="list_st[index].is === 1"><span class="isyes">已完成</span></div>
                <div v-if="list_st[index].is === 2"><span class="isno_">执行中</span></div>
                <div v-if="list_st[index].is === 3"><span class="isyes">终止</span></div>
              </div>
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
import {projectlist} from '../../../api/Api'
export default {
  name: 'Projectfuze',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      token: '',
      tit: '我未完成的项目',
      page: 0,
      pagesize: 15,
      type: 3,
      status_: '',
      columns: [
        {
          text: '全部分类',
          value: ''
        },
        {
          text: '待执行',
          value: 0
        },
        {
          text: '已完成',
          value: 1
        },
        {
          text: '结束',
          value: 2
        },
        {
          text: '执行中',
          value: 3
        },
        {
          text: '已作废',
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
        type: this.type,
        status: this.status_
      }
      projectlist(params).then((res) => {
        if (res.data.code === 2000) {
          document.documentElement.scrollTop = 0
          this.list_st = []
          this.page = 1
          this.list = res.data.data.data.data
          for (var i = 0; i < this.list.length; i++) {
            this.list_st.push({name: '', is: ''})
            if (this.list[i].status === 0) {
              this.list_st[i].name = '待执行'
              this.list_st[i].is = 0
            } else if (this.list[i].status === 1) {
              this.list_st[i].name = '已完成'
              this.list_st[i].is = 1
            } else if (this.list[i].status === 3) {
              this.list_st[i].name = '执行中'
              this.list_st[i].is = 2
            } else if (this.list[i].status === 5) {
              this.list_st[i].name = '终止'
              this.list_st[i].is = 3
            }
            this.succ = true
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
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
        type: this.type,
        status: this.status_
      }
      projectlist(params).then((res) => {
        if (res.data.code === 2000) {
          // console.log(res)
          var len = this.list.length
          this.list = [...this.list, ...res.data.data.data.data]
          for (var i = len; i < this.list.length; i++) {
            this.list_st.push({name: '', is: ''})
            if (this.list[i].status === 0) {
              this.list_st[i].name = '待执行'
              this.list_st[i].is = 0
            } else if (this.list[i].status === 1) {
              this.list_st[i].name = '已完成'
              this.list_st[i].is = 1
            } else if (this.list[i].status === 3) {
              this.list_st[i].name = '执行中'
              this.list_st[i].is = 2
            } else if (this.list[i].status === 5) {
              this.list_st[i].name = '终止'
              this.list_st[i].is = 3
            }
            this.succ = true
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
      this.status_ = e.value
      this.onRefresh()
    },
    engindetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/projectadministrationdetails',
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
