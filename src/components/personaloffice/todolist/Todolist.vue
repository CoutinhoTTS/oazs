<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit">
      </NavBar>
    </div>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="list" style="margin-top: 2.875rem">
      <van-list
        v-model="loading_"
        :error.sync="error_"
        :finished="finished_"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :offset="offset_"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" class="lists" :key="index" @click="engindetails(item.mid, item.modenum, item.modejs, item.modename)" >
          <div>
            <div class="list_s">
              <div><i class="fa fa-bell-o"></i><span>类型：{{item.modename}}</span></div>
            </div>
            <div>
              <div><span>提醒时间:</span><span>{{item.tododt}}</span></div>
              <div><span>状态:</span><span v-if="item.status === 1">已读</span><span v-else style='color: red;'>未读</span></div>
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
import {todolist} from '../../../api/Api'
export default {
  name: 'Goodm',
  components: {
    NavBar
  },
  data () {
    return {
      token: '',
      tit: '提醒信息',
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
    thiskeyword (e) {
      this.keyword = e
      this.onRefresh()
    },
    onRefresh () {
      this.shows_ = true
      let params = {
        token: this.token,
        page: 1,
        pagesize: this.pagesize
      }
      todolist(params).then((res) => {
        if (res.data.code === 2000) {
          this.list_st = []
          this.page = 1
          this.list = res.data.data.data
          this.isLoading_ = false
          if (this.list.length >= res.data.data.total) {
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
        pagesize: this.pagesize
      }
      todolist(params).then((res) => {
        if (res.data.code === 2000) {
          this.list = [...this.list, ...res.data.data.data]
          this.loading_ = false
          if (this.list.length >= res.data.data.total) {
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
    engindetails (id, mun, mo, mod) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.$router.push({
        path: `/${mo}details`,
        query: {
          id: id,
          modenum: mun,
          tit: mod
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
