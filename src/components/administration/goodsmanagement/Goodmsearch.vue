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
              <div><i class="fa fa-pencil-square-o"></i><span>编号：{{item.num}}</span></div>
            </div>
            <div>
              <div><span>名称:</span><span>{{item.name}}</span></div>
              <div><span>分类:</span><span>{{item.type_name}}</span></div>
            </div>
            <div>
              <div><span>单价:</span><span>{{item.price}}</span></div>
              <div><span>规格:</span><span>{{item.guige}}</span></div>
            </div>
            <div>
              <div><span>型号:</span><span>{{item.xinghao}}</span></div>
              <div><span>单位:</span><span>{{item.unit}}</span></div>
            </div>
            <div>
              <div><span>总库存:</span><span>{{item.stock}}</span></div>
            </div>
            <div class="cangkus">
              <div v-for="(items, indexs) in list_" :key="indexs" >
                <div><span>{{items.title}}:</span><span>{{cangku(item,items.field)}}</span></div>
              </div>
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
import {goodmsslist, goodstypelist, godepotlist} from '../../../api/Api'
export default {
  name: 'Goodmsearch',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      token: '',
      tit: '物品盘点',
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
        type: this.status_
      }
      goodmsslist(params).then((res) => {
        if (res.data.code === 2000) {
          this.page = 1
          this.list = res.data.data.data
          var pars = {
            token: this.token,
            page: 1,
            pagesize: 100,
            keyword: ''
          }
          godepotlist(pars).then((res) => {
            if (res.data.code === 2000) {
              this.list_ = res.data.data.data.data
              var arrylist = []
              for (var j = 0; j < this.list_.length; j++) {
                arrylist.push({
                  field: `godepot_${this.list_[j].id}`,
                  title: this.list_[j].depotname
                })
              }
              this.list_ = arrylist
            }
          })
          this.isLoading_ = false
          if (this.list.length >= res.data.data.total) {
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
        type: this.status_
      }
      goodmsslist(params).then((res) => {
        if (res.data.code === 2000) {
          this.list = [...this.list, ...res.data.data.data]
          var pars = {
            token: this.token,
            page: 1,
            pagesize: 100,
            keyword: ''
          }
          godepotlist(pars).then((res) => {
            if (res.data.code === 2000) {
              this.list_ = res.data.data.data.data
              var arrylist = []
              for (var j = 0; j < this.list_.length; j++) {
                arrylist.push({
                  field: `godepot_${this.list_[j].id}`,
                  title: this.list_[j].depotname
                })
              }
              this.list_ = arrylist
            }
          })
          this.loading_ = false
          if (this.list.length >= res.data.data.total) {
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
