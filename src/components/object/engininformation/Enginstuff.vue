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
            <div class="list_s">
              <div><i class="fa fa-wrench"></i><span>材料名称：{{item.name}}</span></div>
            </div>
            <div>
              <div><span>材料类型:</span><span>{{item.type}}</span></div>
              <div><span>计量单位:</span><span>{{item.unit}}</span></div>
            </div>
            <div>
              <div><span>规格型号:</span><span>{{item.specs}}</span></div>
              <div><span>重量(kg):</span><span>{{item.weight}}</span></div>
            </div>
            <div>
              <div><span>价格(元):</span><span>{{item.price}}</span></div>
              <div><span>税率(%):</span><span>{{item.tax_rate}}</span></div>
            </div>
            <div>
              <div><span>含税价(元):</span><span>{{item.rate_price}}</span></div>
              <div v-if="item.status === '1'"><span>状态:</span><span :class="[item.status === '1' ? 'bg_c': '']">启用</span></div>
              <div v-else><span>状态:</span><span :class="[item.status !== '1' ? 'bg_c__': '']">禁用</span></div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <van-popup v-model="show" position="bottom" >
      <van-picker
        show-toolbar
        title="分类"
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
import {enginstufflist, enginstufftypelist} from '../../../api/Api'
export default {
  name: 'Enginstuff',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      token: '',
      tit: '材料信息',
      page: 0,
      pagesize: 15,
      status_: '',
      columns: [
        {
          text: '全部分类',
          value: ''
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
        class: this.status_
      }
      enginstufflist(params).then((res) => {
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
        pagesize: this.pagesize,
        keyword: this.keyword,
        class: this.status_
      }
      enginstufflist(params).then((res) => {
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
    onCancel () {
      this.show = false
    },
    onConfirm (e) {
      this.status_ = e.text
      this.onRefresh()
    },
    engindetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/enginstuffdetails',
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
      this.$refs.cleankeyword.clkeyword('')
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
</style>
