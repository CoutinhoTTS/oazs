<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit">
      </NavBar>
    </div>
    <!--搜索-->
    <Search_ class="search" @thiskeyword="thiskeyword" ref="cleankeyword"></Search_>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="certpersonalllist">
      <van-list
        v-model="loading_"
        :error.sync="error_"
        :finished="finished_"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :offset="offset_"
        @load="onLoad"
      >
        <div class="certpersonall" v-for="(item, index) in list" :key="index" @click="Certpersonalldetails(item.id)">
          <div >
           <div class="personName">
             <i class="fa fa-address-card-o"></i>
             <span class="personN">{{item.realname}}</span>
           </div>
            <div class="persontel">
              <span class="fa fa-mobile-phone"></span>
              <span>{{item.mobile}}</span>
            </div>
            <div class="personedu">
              <span>{{item.xueli}}</span>
            </div>
          </div>
          <div>
            <div><span>身份证号:</span><span>{{item.idcard}}</span></div>
            <div class="certsnum">持证:<span>{{item.cert_num}}</span></div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Search_ from '@/components/search/Search_'
import {personList} from '../../../api/Api'
export default {
  name: 'Certpersonall',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      token: '',
      tit: '人员',
      // 证书列表
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 1,
      list: [],
      page: 0,
      pagesize: 15,
      keyword: '',
      status: 1,
      modenum: '',
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
    thiskeyword (e) {
      this.keyword = e
      this.onRefresh()
    },
    onRefresh () {
      let params = {
        token: this.token,
        page: 1,
        pagesize: this.pagesize,
        keyword: this.keyword,
        status: this.status
      }
      personList(params).then((res) => {
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
        token: this.token,
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
        status: this.status
      }
      personList(params).then((res) => {
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
    // 详情
    Certpersonalldetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/certpersonalldetails',
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
.certpersonall{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  border-bottom: 1px solid #ededed;
}
.certpersonalllist{
  margin-top: 6.5rem;
  margin-bottom: 3.125rem;
}
  .certpersonall>div:first-child{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .personName{
    width: 30%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
  }
  .personName>i{
    font-size: 1.2rem;
  }
.personName>span{
  margin-left: 0.5rem;
}
  .persontel{
    width: 40%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
  }
.persontel>span:first-child{
  font-size: 1.3rem;
  margin-right: 0.5rem;
  color: #2dd5ff;
}
  .personedu{
    width: 20%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end ;
    align-items: center;
  }
  .certpersonall>div:nth-child(2){
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 0.4rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .certsnum>span{
    color: #2dd5ff;
    margin-left: 0.2rem;
  }
</style>
