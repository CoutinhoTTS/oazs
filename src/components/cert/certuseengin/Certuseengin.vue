<template>
   <div>
     <div class="NavBar">
       <NavBar :titles="tit">
       </NavBar>
     </div>
     <!--搜索-->
     <Search_ class="search" @thiskeyword="thiskeyword" ref="cleankeyword"></Search_>
     <!--列表-->
     <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="certuseenginlist">
       <van-list
         v-model="loading_"
         :error.sync="error_"
         :finished="finished_"
         error-text="请求失败，点击重新加载"
         finished-text="加载完成"
         :offset="offset_"
         @load="onLoad"
       >
         <div v-for="(item, index) in list" :key="index" class="certuseenginlists">
           <div>
             <div>
               <i class="fa fa-bar-chart"></i><span>证书名:{{item.cert_name}}</span>
             </div>
             <div>
               <span>持证人:</span>
               <span>{{item.realname}}</span>
             </div>
             <div>
               <span>证书专业:</span>
               <span>{{item.cert_major}}</span>
             </div>
           </div>
           <div>
             <div>
               <span>证书编号:</span><span>{{item.cert_number}}</span>
             </div>
             <div>
               <span>项目名称:</span><span>{{item.enginname}}</span>
             </div>
           </div>
         </div>
       </van-list>
     </van-pull-refresh>
   </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Search_ from '@/components/search/Search_'
import {certuseengin} from '../../../api/Api'
export default {
  name: 'Certuseengin',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      tit: '项目使用记录',
      token: '',
      keyword: '',
      // 证书列表
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 1,
      list: [],
      page: 1,
      pagesize: 15
    }
  },
  created () {
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
      let params = {
        page: 1,
        pagesize: this.pagesize,
        keyword: this.keyword,
        token: this.token
      }
      certuseengin(params).then((res) => {
        if (res.data.code === 2000) {
          this.page = 1
          this.list = res.data.data.data.data
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
    onLoad () {
      this.page = this.page + 1
      let params = {
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
        token: this.token
      }
      certuseengin(params).then((res) => {
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
    }
  }
}
</script>

<style scoped>
.certuseenginlist{
  margin-top: 5.9rem;
  margin-bottom: 3.125rem;
}
  .certuseenginlists{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    border-bottom: 1px solid #ededed;
  }
.certuseenginlists>div{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem auto;
}
.certuseenginlists>div:first-child>div{
  width: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.certuseenginlists>div:last-child>div{
  width: 45%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.certuseenginlists>div>div>span:nth-child(2){
  margin-left: 0.4rem;
}
.certuseenginlists>div>div:last-child{
  text-align: right;
}
</style>
