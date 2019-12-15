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
        <div v-for="(item, index) in list" class="lists" :key="index" >
          <div>
            <div class="list_s">
              <div><i class="fa fa-pencil-square-o"></i><span>名称：{{item.name}}</span></div>
            </div>
            <div>
              <div><span>规格:</span><span>{{item.guige}}</span></div>
              <div><span>型号:</span><span>{{item.xinghao}}</span></div>
            </div>
            <div>
              <div><span>分类:</span><span>{{item.path}}</span></div>
              <div><span>类型:</span><span>{{item.type_name}}</span></div>
            </div>
            <div>
              <div><span>日期:</span><span>{{item.applydt}}</span></div>
              <div><span>操作人:</span><span>{{item.optname}}</span></div>
            </div>
            <div>
              <div><span>数量:</span><span>{{item.count}}</span></div>
              <div><span>对应仓库:</span><span>{{item.depotname}}</span></div>
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
import {goodsslist, goodstypelist} from '../../../api/Api'
export default {
  name: 'Goods',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      token: '',
      tit: '出入库详情',
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
    goodstypelist(param).then((res) => {
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
      goodsslist(params).then((res) => {
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
      goodsslist(params).then((res) => {
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
  },
  deactivated () {
    document.documentElement.scrollTop = 0
  }
}
</script>

<style scoped>
  .list_s>div{
    max-width: 90%;
  }
</style>
