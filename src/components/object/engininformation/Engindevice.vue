<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit">
      </NavBar>
    </div>
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
              <div><i class="fa fa-gear"></i><span>编号：{{item.number}}</span></div>
            </div>
            <div>
              <div><span>名称:</span><span>{{item.name}}</span></div>
              <div><span>设备型号:</span><span>{{item.marking}}</span></div>
            </div>
            <div>
              <div><span>生产厂家:</span><span>{{item.factory}}</span></div>
              <div><span>单位:</span><span>{{item.unit}}</span></div>
            </div>
            <div>
              <div><span>价格(元):</span><span>{{item.price}}</span></div>
              <div><span>供应商:</span><span>{{item.customer}}</span></div>
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
import {engindevicelist, enginstufftypelist} from '../../../api/Api'
export default {
  name: 'Enginstuff',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      token: '',
      tit: '设备信息',
      page: 0,
      pagesize: 15,
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 100,
      list: [],
      modenum: '',
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
    onRefresh () {
      this.shows_ = true
      let params = {
        token: this.token,
        page: 1,
        pagesize: this.pagesize
      }
      engindevicelist(params).then((res) => {
        if (res.data.code === 2000) {
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
      engindevicelist(params).then((res) => {
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
      enginstufftypelist({token: this.token}).then((res) => {
        if (res.data.code === 2000) {
          this.columns = [
            {
              text: '全部分类',
              value: ''
            }
          ]
          this.status = res.data.data
          for (var i = 0; i < this.status.length; i++) {
            this.columns.push(
              {
                text: this.status[i].name,
                value: this.status[i].id
              }
            )
          }
        }
      })
    },
    engindetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/Engindevice',
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
  .list_s>div{
    max-width: 90%;
  }
  .list{
    margin-top: 2.95rem;
  }
</style>
