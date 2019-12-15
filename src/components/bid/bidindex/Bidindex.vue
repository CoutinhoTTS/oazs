<template>
  <div style="padding-top: 2.875rem">
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <van-tabs v-model="active" swipeable :sticky="sticky" :offset-top="offsettop">
      <van-tab  title="待报名">
        <van-list
          v-model="loading"
          :error.sync="error"
          :finished="finished"
          error-text="请求失败，点击重新加载"
          finished-text="加载完成"
          :offset="offset"
          @load="onLoad"
          class="listss_"
        >
          <div v-for="(item, index) in list" class="lists" :key="index" @click="engindetails(item.id)" >
            <div>
              <div>
                <div><span>项目名称</span><span>{{item.name}}</span></div>
                <div><span>报名:</span><span>{{item.enroll_startdt}}</span></div>
              </div>
              <div>
                <div><span>投标:</span><span>{{item.bid_startdt}}</span></div>
                <div><span>保证金:</span><span>{{item.bond_state}}</span></div>
              </div>
              <div>
                <div><span>开标:</span><span>{{item.opendt}}</span></div>
                <div><span>开标人:</span><span>{{item.open_name}}</span></div>
              </div>
              <div>
                <div><span>开标结果:</span>
                  <span v-if="item.bid_status === 1">待报名</span>
                  <span v-if="item.bid_status === 2">待投标</span>
                  <span v-if="item.bid_status === 3">待开标</span>
                  <span v-if="item.bid_status === 4">中标</span>
                  <span v-if="item.bid_status === 8">未中标</span>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab  title="待投标">
        <van-list
          v-model="loading_"
          :error.sync="error_"
          :finished="finished_"
          error-text="请求失败，点击重新加载"
          finished-text="加载完成"
          :offset="offset_"
          @load="onLoad_"
          class="listss_"
        >
          <div v-for="(item, index) in list_" class="lists" :key="index" @click="engindetails(item.id)" >
            <div>
              <div>
                <div><span>项目名称</span><span>{{item.name}}</span></div>
                <div><span>报名:</span><span>{{item.enroll_startdt}}</span></div>
              </div>
              <div>
                <div><span>投标:</span><span>{{item.bid_startdt}}</span></div>
                <div><span>保证金:</span><span>{{item.bond_state}}</span></div>
              </div>
              <div>
                <div><span>开标:</span><span>{{item.opendt}}</span></div>
                <div><span>开标人:</span><span>{{item.open_name}}</span></div>
              </div>
              <div>
                <div><span>开标结果:</span>
                  <span v-if="item.bid_status === 1">待报名</span>
                  <span v-if="item.bid_status === 2">待投标</span>
                  <span v-if="item.bid_status === 3">待开标</span>
                  <span v-if="item.bid_status === 4">中标</span>
                  <span v-if="item.bid_status === 8">未中标</span>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab  title="待开标">
        <van-list
          v-model="loading__"
          :error.sync="error__"
          :finished="finished__"
          error-text="请求失败，点击重新加载"
          finished-text="加载完成"
          :offset="offset__"
          @load="onLoad__"
          class="listss_"
        >
          <div v-for="(item, index) in list__" class="lists" :key="index" @click="engindetails(item.id)" >
            <div>
              <div>
                <div><span>项目名称</span><span>{{item.name}}</span></div>
                <div><span>报名:</span><span>{{item.enroll_startdt}}</span></div>
              </div>
              <div>
                <div><span>投标:</span><span>{{item.bid_startdt}}</span></div>
                <div><span>保证金:</span><span>{{item.bond_state}}</span></div>
              </div>
              <div>
                <div><span>开标:</span><span>{{item.opendt}}</span></div>
                <div><span>开标人:</span><span>{{item.open_name}}</span></div>
              </div>
              <div>
                <div><span>开标结果:</span>
                  <span v-if="item.bid_status === 1">待报名</span>
                  <span v-if="item.bid_status === 2">待投标</span>
                  <span v-if="item.bid_status === 3">待开标</span>
                  <span v-if="item.bid_status === 4">中标</span>
                  <span v-if="item.bid_status === 8">未中标</span>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab  title="待交保证金">
        <van-list
          v-model="loadings"
          :error.sync="errors"
          :finished="finisheds"
          error-text="请求失败，点击重新加载"
          finished-text="加载完成"
          :offset="offsets"
          @load="onLoads"
          class="listss_"
        >
          <div v-for="(item, index) in lists" class="lists" :key="index" @click="engindetails(item.id)" >
            <div>
              <div>
                <div><span>项目名称</span><span>{{item.name}}</span></div>
                <div><span>报名:</span><span>{{item.enroll_startdt}}</span></div>
              </div>
              <div>
                <div><span>投标:</span><span>{{item.bid_startdt}}</span></div>
                <div><span>保证金:</span><span>{{item.bond_state}}</span></div>
              </div>
              <div>
                <div><span>开标:</span><span>{{item.opendt}}</span></div>
                <div><span>开标人:</span><span>{{item.open_name}}</span></div>
              </div>
              <div>
                <div><span>开标结果:</span>
                  <span v-if="item.bid_status === 1">待报名</span>
                  <span v-if="item.bid_status === 2">待投标</span>
                  <span v-if="item.bid_status === 3">待开标</span>
                  <span v-if="item.bid_status === 4">中标</span>
                  <span v-if="item.bid_status === 8">未中标</span>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab  title="待审核">
        <van-list
          v-model="loadings_"
          :error.sync="errors_"
          :finished="finisheds_"
          error-text="请求失败，点击重新加载"
          finished-text="加载完成"
          :offset="offsets_"
          @load="onLoads_"
          class="listss_"
        >
          <div v-for="(item, index) in lists_" class="lists" :key="index" @click="engindetails(item.id)" >
            <div>
              <div>
                <div><span>项目名称</span><span>{{item.name}}</span></div>
                <div><span>报名:</span><span>{{item.enroll_startdt}}</span></div>
              </div>
              <div>
                <div><span>投标:</span><span>{{item.bid_startdt}}</span></div>
                <div><span>保证金:</span><span>{{item.bond_state}}</span></div>
              </div>
              <div>
                <div><span>开标:</span><span>{{item.opendt}}</span></div>
                <div><span>开标人:</span><span>{{item.open_name}}</span></div>
              </div>
              <div>
                <div><span>开标结果:</span>
                  <span v-if="item.bid_status === 1">待报名</span>
                  <span v-if="item.bid_status === 2">待投标</span>
                  <span v-if="item.bid_status === 3">待开标</span>
                  <span v-if="item.bid_status === 4">中标</span>
                  <span v-if="item.bid_status === 8">未中标</span>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import {bidlists} from '../../../api/Api'
export default {
  name: 'Bidindex',
  components: {
    NavBar
  },
  data () {
    return {
      active: 0,
      tit: '投标看板',
      scrollTop: '',
      sticky: true,
      offsettop: 46,
      modenum: '',
      // 待报名
      bid_status: 1,
      state: '',
      isLoading: false,
      finished: false,
      error: false,
      loading: false,
      offset: 1,
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 1,
      isLoading__: false,
      finished__: false,
      error__: false,
      loading__: false,
      offset__: 1,
      isLoadings: false,
      finisheds: false,
      errors: false,
      loadings: false,
      offsets: 1,
      isLoadings_: false,
      finisheds_: false,
      errors_: false,
      loadings_: false,
      offsets_: 1,
      pagen: 0,
      page: 0,
      page_: 0,
      page__: 0,
      pages: 0,
      pages_: 0,
      pagesize: 15,
      list: [],
      list_: [],
      list__: [],
      lists: [],
      lists_: []
    }
  },
  created () {
    this.modenum = this.$route.query.modenum
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
  },
  methods: {
    // 待报名
    onLoad () {
      this.bid_status = 1
      this.state = ''
      this.page = this.page + 1
      this.pagen = this.page
      this.thisbidlist()
    },
    // 待投标
    onLoad_ () {
      this.bid_status = 2
      this.state = ''
      this.page_ = this.page_ + 1
      this.pagen = this.page_
      this.thisbidlist()
    },
    // 待开标
    onLoad__ () {
      this.bid_status = 3
      this.state = ''
      this.page__ = this.page__ + 1
      this.pagen = this.page__
      this.thisbidlist()
    },
    // 待交保证金
    onLoads () {
      this.bid_status = 0
      this.state = ''
      this.pages = this.pages + 1
      this.pagen = this.pages
      this.thisbidlist()
    },
    // 待审核
    onLoads_ () {
      this.bid_status = 0
      this.state = 0
      this.pages_ = this.pages_ + 1
      this.pagen = this.pages_
      this.thisbidlist()
    },
    thisbidlist () {
      let params = {
        token: this.token,
        page: this.pagen,
        pagesize: this.pagesize,
        keyword: '',
        type: 0,
        status: this.state,
        bid_status: this.bid_status,
        bid_time: 0
      }
      bidlists(params).then((res) => {
        if (res.data.code === 2000) {
          if (this.active === 0) {
            this.list = [...this.list, ...res.data.data.data.data]
            this.loading = false
            if (this.list.length >= res.data.data.data.total) {
              this.finished = true
            }
          } else if (this.active === 1) {
            this.list_ = [...this.list_, ...res.data.data.data.data]
            this.loading_ = false
            if (this.list_.length >= res.data.data.data.total) {
              this.finished_ = true
            }
          } else if (this.active === 2) {
            this.list__ = [...this.list__, ...res.data.data.data.data]
            this.loading__ = false
            if (this.list__.length >= res.data.data.data.total) {
              this.finished__ = true
            }
          } else if (this.active === 3) {
            for (var i = 0; i < res.data.data.data.data.length; i++) {
              if (res.data.data.data.data[i].bond_state === '待交') {
                this.lists.push(res.data.data.data.data[i])
              }
              this.loadings = false
              if (this.lists.length >= res.data.data.data.total) {
                this.finisheds = true
              }
            }
          } else if (this.active === 4) {
            this.lists_ = [...this.lists_, ...res.data.data.data.data]
            this.loadings_ = false
            if (this.lists_.length >= res.data.data.data.total) {
              this.finisheds_ = true
            }
          }
        } else {
          if (this.active === 0) {
            this.loading = false
            this.error = true
          } else if (this.active === 1) {
            this.loading_ = false
            this.error_ = true
          } else if (this.active === 2) {
            this.loading__ = false
            this.error__ = true
          } else if (this.active === 3) {
            this.loadings = false
            this.errors = true
          } else if (this.active === 4) {
            this.loadings_ = false
            this.errors_ = true
          }
        }
      })
    },
    engindetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/bidlistdetails',
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
.listss_{
  margin-bottom: 3.125rem;
}
</style>
