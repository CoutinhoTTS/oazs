<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit"  :barisshow="barisshow" @showprop="showprop"></NavBar>
    </div>
    <!--搜索-->
    <Search_ class="search" @thiskeyword="thiskeyword" ref="cleankeyword"></Search_>
        <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="Dealtwith">
          <van-list
            v-model="loading_"
            :error.sync="error_"
            :finished="finished_"
            error-text="请求失败，点击重新加载"
            finished-text="加载完成"
            :offset="offset_"
            @load="onLoad"
          >
            <div class="Dealtwithedlist" v-for="(items, indexs) in list_" :key="indexs" :data-id ="items.id" @click="engindetails(items.id, items.modenum, items.modejs, items.modename)">
              <div>
                <div>
                  <div>
                    {{items.modename}},申请人:{{items.uname}},单号[{{items.sericnum}}]
                  </div>
                </div>
                <div>
                  <div v-html="items.nstatustext"></div>
                  <span>
                {{items.optdt}}
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
import {handleold} from '../../../api/Api'
export default {
  name: 'Handleold',
  data () {
    return {
      keyword: '',
      isshow: '',
      tit: '经我处理',
      // 经我处理
      isLoading_: false,
      list_: [],
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 100,
      nstatustext: [],
      token: '',
      // 页码
      page_: 0,
      pagesize_: 15,
      // 处理人
      clper: [],
      one: 1,
      two: 2,
      // 分页栏的属性
      isscs_: false,
      sticky: true,
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
  components: {
    NavBar,
    Search_
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
      let params_ = {
        token: this.token,
        page: 1,
        pagesize: 15,
        keyword: this.keyword,
        starttime: '',
        endtime: '',
        modeid: this.modeid
      }
      handleold(params_).then((res) => {
        this.page_ = 1
        this.nstatustext = []
        this.isscs_ = false
        this.list_ = []
        this.finished_ = false
        if (res.data.code === 2000) {
          this.list_ = res.data.data.data.data
          this.isLoading_ = false
          if (this.list_.length >= res.data.data.data.total) {
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
    },
    onLoad () {
      this.page_ = this.page_ + 1
      let params_ = {
        token: this.token,
        page: this.page_,
        pagesize: this.pagesize_,
        keyword: this.keyword,
        starttime: '',
        endtime: '',
        modeid: this.modeid
      }
      handleold(params_).then((res) => {
        if (res.data.code === 2000) {
          if (this.page_ === 1) {
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
          this.list_ = [...this.list_, ...res.data.data.data.data]
          this.loading_ = false
          if (this.list_.length >= res.data.data.data.total) {
            this.finished_ = true
          }
        }
      })
    },
    showprop () {
      this.show = true
    },
    handleScroll () {
      var windowHeight = document.documentElement.clientHeight
      var scrollHeight = document.documentElement.scrollHeight
      this.offset = scrollHeight - windowHeight + 1
      if (scrollHeight - windowHeight === 0) {
        this.offset = 300
      }
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
  .Dealtwithedlist{
    padding: 0.5rem 1rem;
  }
  .Dealtwithedlist>div{
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #f7f8fa;
    border-radius: 0.3rem;
  }
  .Dealtwithedlist>div>div:first-child{
    width: 100%;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .Dealtwithedlist>div>div:last-child{
    width: 100%;
    font-size: 0.9rem;
    margin-top: 0.2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .Dealtwithedlist>div>div:first-child>div{
    width: 100%;
    font-size: 0.8rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .Dealtwithedlist>div>div:last-child>span:last-child{
    font-size: 0.8rem;
    color:  #75c2ea;
  }

</style>
