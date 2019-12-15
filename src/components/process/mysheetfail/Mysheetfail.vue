<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" :barisshow="barisshow" @showprop="showprop">
      </NavBar>
    </div>
    <!--搜索-->
    <Search_ class="search" @thiskeyword="thiskeyword"  ref="cleankeyword"></Search_>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="Dealtwith">
      <van-list
        v-model="loading"
        :error.sync="error"
        :finished="finished"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :offset="offset"
        @load="onLoad"
      >
        <div class="Dealtwithlist" v-for="(item, index) in list" :key="index" :data-id ="item.id" @click="engindetails(item.id, item.modenum, item.modejs, item.modename)">
          <div>
            <div>
              <div>
                {{item.modename}},申请人:{{item.uname}},单号[{{item.sericnum}}]
              </div>
            </div>
            <div>
              <div v-html="item.nstatustext">
              </div>
              <span>
                [{{item.optdt}}]
              </span>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <van-popup v-model="show" position="bottom" >
      <van-tree-select
        :items="items"
        :main-active-index="mainActiveIndex"
        :active-id="activeId"
        @navclick="onNavClick"
        @itemclick="onItemClick"
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
import {mysheet} from '../../../api/Api'
export default {
  name: 'Mysheetfail',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      keyword: '',
      isshow: '',
      tit: '我申请未通过',
      isLoading: false,
      list: [],
      finished: false,
      error: false,
      loading: false,
      offset: 1,
      nstatustext: [],
      token: '',
      // 页码
      page: 0,
      pagesize: 15,
      // 处理人
      list_st: [],
      one: 1,
      two: 2,
      // 分页栏的属性
      succ: false,
      sticky: true,
      offsettop: 100,
      // tit
      barisshow: true,
      show: false,
      shows_: false,
      clickoverlays: false,
      // 分类选择
      items: [],
      mode_data: [],
      // 左侧高亮元素的index
      mainActiveIndex: 1,
      // 被选中元素的id
      activeId: 0,
      modeid: '',
      scrollTop: ''
    }
  },
  created () {
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    this.token = this.$store.state.token
  },
  methods: {
    thiskeyword (e) {
      this.keyword = e
      this.onRefresh()
    },
    onNavClick (index) {
      this.mainActiveIndex = index
    },
    onItemClick (data) {
      this.modeid = data.id
      setTimeout(() => {
        this.onRefresh()
      }, 200)
    },
    onRefresh () {
      this.shows_ = true
      let params = {
        token: this.token,
        page: 1,
        pagesize: 15,
        keyword: this.keyword,
        starttime: '',
        endtime: '',
        modeid: this.modeid,
        type: 3
      }
      mysheet(params).then((res) => {
        if (res.data.code === 2000) {
          document.documentElement.scrollTop = 0
          this.page = 1
          this.succ = false
          this.list = []
          this.list_st = []
          this.finished = false
          this.list = res.data.data.data.data
          this.isLoading = false
          if (this.list.length >= res.data.data.data.total) {
            this.loading = false
            this.finished = true
          } else {
            this.finished = false
          }
          this.show = false
          this.shows_ = false
        } else {
          this.loading = false
          this.error = true
          this.show = false
          this.shows_ = false
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
        starttime: '',
        endtime: '',
        modeid: this.modeid,
        type: 3
      }
      mysheet(params).then((res) => {
        if (res.data.code === 2000) {
          if (this.page === 1) {
            this.mode_data = res.data.data.mode_data
            this.items.push(
              {
                text: '全部',
                children: [{
                  text: '全部分类',
                  id: ''
                }]
              }
            )
            for (var key in this.mode_data) {
              this.items.push(
                {
                  text: key,
                  children: []
                }
              )
              for (var j = 0; j < this.mode_data[key].length; j++) {
                this.items[this.items.length - 1].children.push({
                  text: this.mode_data[key][j].name,
                  id: this.mode_data[key][j].id,
                  num: this.mode_data[key][j].num,
                  type: this.mode_data[key][j].type
                })
              }
            }
          }
          this.list = [...this.list, ...res.data.data.data.data]
          this.loading = false
          if (this.list.length >= res.data.data.data.total) {
            this.finished = true
          }
        }
      })
    },
    showprop () {
      this.show = true
    },
    engindetails (id, mun, mo, mod) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.$router.push({
        path: `/${mo}details`,
        query: {
          id: id,
          modenum: mun,
          tit: mod
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
  .Dealtwith{
    margin-top: 6.25rem;
    width: 100%;
    margin-bottom: 3.12rem;
  }
  .Dealtwithlist{
    padding: 0.5rem 1rem;
  }
  .Dealtwithlist>div{
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #f7f8fa;
    border-radius: 0.3rem;
  }
  .Dealtwithlist>div>div:first-child{
    width: 100%;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .Dealtwithlist>div>div:last-child{
    width: 100%;
    font-size: 0.9rem;
    margin-top: 0.2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .Dealtwithlist>div>div:first-child>div{
    width: 100%;
    font-size: 0.8rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .Dealtwithlist>div>div:last-child>span:last-child{
    font-size: 0.8rem;
    color:  #75c2ea;
  }
</style>
