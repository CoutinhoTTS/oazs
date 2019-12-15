<template>
 <div>
   <div class="NavBar">
     <NavBar :titles="tit" :barisshow="barisshow" @showprop="showprop">
     </NavBar>
   </div>
   <!--搜索-->
   <Search_ class="search" @thiskeyword="thiskeyword" ref="cleankeyword"></Search_>
   <!--列表-->
   <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="bidworklist">
     <van-list
       v-model="loading_"
       :error.sync="error_"
       :finished="finished_"
       error-text="请求失败，点击重新加载"
       finished-text="加载完成"
       :offset="offset_"
       @load="onLoad"
     >
       <div v-for="(item, index) in list" class="bidworklists" :key="index" @click="bidworklistdetails(item.id)" >
       <div>
         <div>
           <div><i class="fa fa-file-pdf-o"></i><span>项目：{{item.bidname}}</span></div>
         </div>
         <div>
           <div><span>标题:</span><span>{{item.title}}</span></div>
           <div><span>等级:</span><span>{{item.grade}}</span></div>
         </div>
         <div>
           <div><span>督导人:</span><span>{{item.ddname}}</span></div>
         <div v-html="item.status_name">
         </div>
         </div>
       </div>
       </div>
     </van-list>
   </van-pull-refresh>
   <!--分类搜索-->
   <van-popup v-model="show" position="bottom" >
     <van-picker
       show-toolbar
       title="审核状态"
       :columns="columns"
       @cancel="onCancel"
       @confirm="onConfirm"
     />
   </van-popup>
 </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Search_ from '@/components/search/Search_'
import {bidworklist} from '../../../api/Api'
export default {
  name: 'bidmywork',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      barisshow: true,
      tit: '我的任务',
      token: '',
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 1,
      list: [],
      page: 0,
      pagesize: 15,
      keyword: '',
      type: '1',
      status: '-1',
      show: false,
      modenum: '',
      // 状态选择
      columns: [{
        text: '全部',
        value: -1
      }],
      list_st: [],
      succ: false,
      scrollTop: ''
    }
  },
  created () {
    this.modenum = this.$route.query.modenum
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
  },
  methods: {
    showprop (e) {
      this.show = e
    },
    thiskeyword (e) {
      this.keyword = e
      this.onRefresh()
    },
    Myworklist () {
      this.page = 1
      let params = {
        token: this.token,
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
        status: this.status,
        type: this.type
      }
      bidworklist(params).then((res) => {
        if (res.data.code === 2000) {
          this.list = res.data.data.data.data
          this.columns = [{
            text: '全部',
            value: -1
          }]
          this.list_st = []
          var status = res.data.data.status
          for (var key in status) {
            this.columns.push({
              text: status[key],
              value: key
            })
          }
          this.isLoading_ = false
          if (this.list.length >= res.data.data.data.total) {
            this.finished_ = true
            this.loading_ = false
          } else {
            this.finished_ = false
          }
        }
      })
    },
    onRefresh () {
      this.Myworklist()
    },
    onLoad () {
      this.page = this.page + 1
      let params = {
        token: this.token,
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
        status: this.status,
        type: this.type
      }
      bidworklist(params).then((res) => {
        if (res.data.code === 2000) {
          this.list = [...this.list, ...res.data.data.data.data]
          this.columns = [{
            text: '全部',
            value: -1
          }]
          var status = res.data.data.status
          for (var key in status) {
            this.columns.push({
              text: status[key],
              value: key
            })
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
      this.status = e.value
      this.show = false
      this.onRefresh()
    },
    // 详情
    bidworklistdetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/bidworkdetails',
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
.bidworklist{
  margin-top: 5.9rem;
  margin-bottom: 3.125rem;
}
  .bidworklists{
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
.bidworklists>div{
  padding: 0.2rem;
  border-radius: 0.2rem;
  background-color: #f5f5f5;
}
.bidworklists>div>div{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.3rem 0;
}
.bidworklists>div>div>div{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bidworklists>div>div>div>span:nth-child(2){
  margin-left: 0.4rem;
}
</style>
