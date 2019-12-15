<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" :barisshow="barisshow" @showprop="showprop" >
      </NavBar>
    </div>
    <!--搜索-->
    <Search_ class="search" @thiskeyword="thiskeyword" ref="cleankeyword"></Search_>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="certlist">
      <van-list
        v-model="loading_"
        :error.sync="error_"
        :finished="finished_"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :offset="offset_"
        @load="onLoad"
      >
        <div class="certalllist" v-for="(item, index) in list" :key="index" :data-id ="item.id" @click="thiscertdetails(item.id)">
          <div>
              <div>
                <i class="fa fa-vcard-o "></i>
                <span>{{item.cert_name}}</span>
                <span>{{item.realname}}</span>
              </div>
              <span>{{item.maturitydt}}</span>
          </div>
          <div>
            <span :class="[certgo[index] === 1? 'bg_c':certgo[index] === 2? 'bg_c_':'bg_c__']" >{{item.cert_goes}}</span>
            <span>编号:{{item.cert_number}}</span>
            <span>
              证书状态: <span :class="[certstatus[index] === 1? 'certstatus_':certstatus[index] === 2? 'certstatus':'certstatus__']">{{item.cert_status}}</span>
            </span>
          </div>
          <div>
            证书专业:{{item.cert_major_arr}}
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
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Search_ from '@/components/search/Search_'
import {certclass, certlist} from '../../../api/Api'
export default {
  name: 'Certificate',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      isshow: '',
      token: '',
      tit: '所有证书',
      barisshow: true,
      show: false,
      //  查证书
      page: 0,
      pagesize: 15,
      keyword: '',
      class: '',
      isout: 1,
      is_shate: 0,
      overdue: '',
      nature: '',
      boxname: '',
      // 证书分类
      columns: [{
        text: '全部',
        key: ''
      }],
      // 证书列表
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 1,
      list: [],
      // 证书去向
      certgo: [],
      // 证书状态
      certstatus: [],
      modenum: '',
      scrollTop: ''
    }
  },
  created () {
    this.modenum = this.$route.query.modenum
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    this.token = this.$store.state.token
    let pramas = {
      token: this.token
    }
    // 获取证书分类
    certclass(pramas).then((res) => {
      if (res.data.code === 2000) {
        for (var i = 0; i < res.data.data.length; i++) {
          this.columns.push({
            text: res.data.data[i].name,
            key: res.data.data[i].id
          })
        }
      }
    })
  },
  methods: {
    showprop (e) {
      this.show = e
    },
    onCancel () {
      this.show = false
    },
    // 分类选中
    onConfirm (value, index) {
      if (value.text === '全部') {
        this.class = ''
      } else {
        this.class = value.text
      }
      this.keyword = ''
      this.$refs.cleankeyword.clkeyword(this.keyword)
      this.onRefresh()
    },
    // 下拉刷新
    onRefresh () {
      let pramas = {
        token: this.token,
        page: 1,
        pagesize: this.pagesize,
        keyword: this.keyword,
        class: this.class,
        isout: this.isout,
        is_shate: this.is_shate,
        overdue: this.overdue,
        nature: this.nature,
        boxname: this.boxname
      }
      this.certgo = []
      this.certstatus = []
      certlist(pramas).then((res) => {
        if (res.data.code === 2000) {
          this.page = 1
          this.list = []
          this.finished_ = false
          this.list = res.data.data.data.data
          for (var i = 0; i < this.list.length; i++) {
            this.list[i].cert_major_arr = this.list[i].cert_major_arr.join('/')
            if (this.list[i].cert_goes === 1) {
              this.list[i].cert_goes = '在册'
              this.certgo.push(1)
            } else if (this.list[i].cert_goes === 2) {
              this.list[i].cert_goes = '借出'
              this.certgo.push(2)
            } else if (this.list[i].cert_goes === 3) {
              this.list[i].cert_goes = '遗失'
              this.certgo.push(3)
            }
            if (this.list[i].cert_status === 1) {
              this.list[i].cert_status = '空闲'
              this.certstatus.push(1)
            } else if (this.list[i].cert_status === 2) {
              this.list[i].cert_status = '在用'
              this.certstatus.push(2)
            } else if (this.list[i].cert_status === 3) {
              this.list[i].cert_status = '未知'
              this.certstatus.push(3)
            } else {
              this.list[i].cert_status = ''
              this.certstatus.push('')
            }
          }
          this.isLoading_ = false
          if (this.list.length >= res.data.data.data.total) {
            this.loading_ = false
            this.finished_ = true
          } else {
            this.finished_ = false
          }
          this.show = false
        }
      })
    },
    // 底部自动加载
    onLoad () {
      this.page = this.page + 1
      let pramas = {
        token: this.token,
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
        class: this.class,
        isout: this.isout,
        is_shate: this.is_shate,
        overdue: this.overdue,
        nature: this.nature,
        boxname: this.boxname
      }
      certlist(pramas).then((res) => {
        if (res.data.code === 2000) {
          var len = this.list.length
          this.list = [...this.list, ...res.data.data.data.data]
          for (var i = len; i < this.list.length; i++) {
            this.list[i].cert_major_arr = this.list[i].cert_major_arr.join('/')
            if (this.list[i].cert_goes === 1) {
              this.list[i].cert_goes = '在册'
              this.certgo.push(1)
            } else if (this.list[i].cert_goes === 2) {
              this.list[i].cert_goes = '借出'
              this.certgo.push(2)
            } else if (this.list[i].cert_goes === 3) {
              this.list[i].cert_goes = '遗失'
              this.certgo.push(3)
            }
            if (this.list[i].cert_status === 1) {
              this.list[i].cert_status = '空闲'
              this.certstatus.push(1)
            } else if (this.list[i].cert_status === 2) {
              this.list[i].cert_status = '在用'
              this.certstatus.push(2)
            } else if (this.list[i].cert_status === 3) {
              this.list[i].cert_status = '未知'
              this.certstatus.push(3)
            } else {
              this.list[i].cert_status = ''
              this.certstatus.push('')
            }
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
    // 搜所
    thiskeyword (e) {
      this.keyword = e
      this.onRefresh()
    },
    //  详情
    thiscertdetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/certalldatails',
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
      // 重新获取分类
      let pramas = {
        token: this.token
      }
      // 获取证书分类
      certclass(pramas).then((res) => {
        if (res.data.code === 2000) {
          for (var i = 0; i < res.data.data.length; i++) {
            this.columns.push({
              text: res.data.data[i].name,
              key: res.data.data[i].id
            })
          }
        }
      })
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
  .certalllist{
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
    background-color: #fff;
  }
  .certalllist>div:first-child{
    width: 100%;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .certalllist>div:first-child>div{
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    font-size: 0.9rem;
  }
  .certalllist>div:first-child>div>span{
    margin: auto 0.5rem;
  }
  .certalllist>div:first-child>div>span:nth-child(3){
    color: #0088cd;
  }
  .certalllist>div:first-child>div>i{
    font-size: 1.2rem;
    color: #afafaf;
  }
  .certalllist>div:first-child>div>span:nth-child(2){
    display: inline-block;
    width: 8rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .certalllist>div:first-child>span{
    font-size: 0.6rem;
    min-width: 4.5rem;
  }
  .certalllist>div:nth-child(2){
    width: 100%;
    font-size: 0.5rem;
    color: #d1d1d1;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .certalllist>div:nth-child(3){
    width: 100%;
    font-size: 0.5rem;
    text-align: left;
    margin-top: 0.5rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .certalllist>div:nth-child(2)>span:nth-child(1){
    width: 10%;
    text-align: center;
  }
  .certalllist>div:nth-child(2)>span:nth-child(2),
  .certalllist>div:nth-child(2)>span:nth-child(3){
    width: 45%;
    overflow: hidden;
    color: #4b4b4b;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin: auto 2%;
  }
  .certalllist>div:nth-child(2)>span:nth-child(3){
    text-align: right;
  }
  .certalllist>div:first-child>div{
    width: 100%;
    font-size: 0.8rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .certalllist>div:nth-child(2)>span:last-child{
    font-size: 0.4rem;
  }
  .search{
    width: 100%;
    position: fixed;
    top: 2.95rem;
    left: 0;
    background-color: #fff;
    z-index: 10;
  }
  .bg_c{
    display: inline-block;
    padding: 0.1rem;
    border-radius: 0.2rem;
     background-color: #008ddd;
     color: white;
   }
  .bg_c_{
    display: inline-block;
    padding: 0.1rem;
    border-radius: 0.2rem;
    background-color: #f66f4b;
    color: white;
  }
  .bg_c__{
    display: inline-block;
    padding: 0.1rem;
    border-radius: 0.2rem;
    background-color: #f61f41;
    color: white;
  }
  .certstatus{
    color: #0088cd;
  }
  .certstatus_{
    color: #f66f4b;
  }
  .certstatus__{
    color: #f61f41;
  }
  .certlist{
    margin-top: 5.9rem;
    margin-bottom: 3.125rem;
  }
</style>
