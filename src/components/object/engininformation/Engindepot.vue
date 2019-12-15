<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" >
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
        <div v-for="(item, index) in list" class="lists" :key="index">
          <div>
            <div class="list_s">
              <div><i class="fa fa-home"></i><span>名称：{{item.name}}</span></div>
            </div>
            <div>
              <div><span>编号:</span><span>{{item.num}}</span></div>
              <div><span>排序:</span><span>{{item.sort}}</span></div>
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
import {engindepotlist} from '../../../api/Api'
export default {
  name: 'Engindepot',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      token: '',
      tit: '仓库信息',
      page: 0,
      pagesize: 15,
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 100,
      list: [],
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
      engindepotlist(params).then((res) => {
        if (res.data.code === 2000) {
          this.page = 1
          this.list = res.data.data
          this.isLoading_ = false
          this.finished_ = true
          this.loading_ = false
          this.shows_ = false
        } else {
          this.loading_ = false
          this.error_ = true
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
      engindepotlist(params).then((res) => {
        if (res.data.code === 2000) {
          this.list = [...this.list, ...res.data.data]
          this.loading_ = false
          this.finished_ = true
        } else {
          this.loading_ = false
          this.error_ = true
        }
      })
    }
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
