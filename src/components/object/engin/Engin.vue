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
               <div><i class="fa fa-newspaper-o"></i><span>项目名称：{{item.name}}</span></div>
               <div><span>项目状态:</span><span>{{item.state}}</span></div>
             </div>
             <div>
               <div><span>项目类型:</span><span>{{item.type}}</span></div>
               <div><span>计划工期(天):</span><span>{{item.duration}}</span></div>
             </div>
             <div>
               <div><span>工程造价(万元):</span><span>{{item.money}}</span></div>
               <div><span>所属单位:</span><span>{{item.company}}</span></div>
             </div>
             <div>
               <div><span>填报人:</span><span>{{item.realname}}</span></div>
               <div><span>填报时间:</span><span>{{item.applydt}}</span></div>
             </div>
             <div>
               <div><span>计划开始时间:</span><span></span></div>
               <div v-html="item.status_name">
               </div>
             </div>
           </div>
         </div>
       </van-list>
     </van-pull-refresh>
     <van-popup v-model="show" position="bottom" >
       <van-picker
         show-toolbar
         title="证书分类"
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
import {enginlist} from '../../../api/Api'
export default {
  name: 'Engin',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      token: '',
      tit: '项目立项',
      page: 0,
      pagesize: 15,
      type: 1,
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
        type: this.type,
        status: this.status_
      }
      enginlist(params).then((res) => {
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
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
        type: this.type,
        status: this.status_
      }
      enginlist(params).then((res) => {
        if (res.data.code === 2000) {
          this.columns = [
            {
              text: '全部分类',
              value: ''
            }
          ]
          this.status = res.data.data.status
          for (var key in this.status) {
            this.columns.push(
              {
                text: this.status[key],
                value: key
              }
            )
          }
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
    engindetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/engindetails',
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
