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
              <div><i class="fa fa-ticket"></i><span>名称：{{item.title}}</span></div>
            </div>
            <div>
              <div><span>编号:</span><span>{{item.num}}</span></div>
              <div><span>品牌:</span><span>{{item.brand}}</span></div>
            </div>
            <div>
              <div><span>规格:</span><span>{{item.model}}</span></div>
              <div><span>来源:</span><span>{{item.laiyuan}}</span></div>
            </div>
            <div>
              <div><span>状态:</span><span>{{item.status}}</span></div>
              <div><span>分类:</span><span>{{item.path}}</span></div>
            </div>
            <div>
              <div><span>仓库:</span><span>{{item.ck_name}}</span></div>
              <div><span>使用人:</span><span>{{item.usename}}</span></div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <van-popup v-model="show" position="bottom" >
      <van-picker
        show-toolbar
        title="物品分类"
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
import {assetmlist, assetmtypelist} from '../../../api/Api'
export default {
  name: 'Assetm',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      token: '',
      tit: '固定资产',
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
      list_: [],
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
    var param = {
      token: this.token
    }
    assetmtypelist(param).then((res) => {
      if (res.data.code === 2000) {
        this.columns = [
          {
            text: '全部分类',
            value: ''
          }
        ]
        for (var i = 1; i < res.data.data.length; i++) {
          this.columns.push(
            {
              text: res.data.data[i].name,
              value: res.data.data[i].id
            }
          )
        }
      }
    })
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
        typeid: this.status_
      }
      assetmlist(params).then((res) => {
        if (res.data.code === 2000) {
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
        typeid: this.status_
      }
      assetmlist(params).then((res) => {
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
    cangku (item, fild) {
      var name_ = item[fild]
      return name_
    },
    engindetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/assetmdetails',
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
  .cangkus{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .cangkus>div{
    width: 50%;
    margin-left: 0!important;
  }
  .cangkus>div:nth-child(2n){
    text-align: right;
  }
  .cangkus>div>div>span:last-child{
    margin-left: 0.5rem;
  }
</style>
