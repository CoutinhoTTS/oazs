<template>
  <div style="padding: 6.375rem 0 3.125rem">
    <div class="NavBar">
      <NavBar :titles="tit" :barisshow="barisshow" @showprop="showprop">
      </NavBar>
    </div>
    <!--搜索-->
    <Search_ class="search" @thiskeyword="thiskeyword" ref="cleankeyword"></Search_>
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
          <div>
            <div><span>姓名:</span><span>{{item.realname}}</span></div>
            <div><span>部门:</span><span>{{item.deptname}}</span></div>
          </div>
          <div>
            <div><span>职位:</span><span>{{item.ranking}}</span></div>
          </div>
          <div>
            <div><span>电话:</span><span><a :href="['tel://'+item.tel]">{{item.tel}}</a></span></div>
            <div><span>手机号:</span><span><a :href="['tel://'+item.mobile]">{{item.mobile}}</a></span></div>
          </div>
          <div>
            <div><span>邮箱:</span><span>{{item.email}}</span></div>
          </div>
        </div>
      </div>
    </van-list>
    <van-popup v-model="show" position="bottom" >
      <van-picker
        show-toolbar
        title="部门"
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
import {deptlist, insidemessage} from '../../api/Api'
export default {
  name: 'Userinfo',
  components: {
    NavBar,
    Search_
  },
  data () {
    return {
      tit: '内部通讯',
      token: '',
      barisshow: true,
      show: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 100,
      page: 0,
      pagesize: 15,
      keyword: '',
      typeid: '',
      list: [],
      columns: [{
        text: '请选择',
        id: ''
      }]
    }
  },
  created () {
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    deptlist({token: this.token}).then((res) => {
      if (res.data.code === 2000) {
        for (var i = 0; i < res.data.data.length; i++) {
          this.columns.push(
            {
              text: res.data.data[i].name,
              id: res.data.data[i].id
            }
          )
        }
      }
    })
  },
  methods: {
    showprop () {
      this.show = true
    },
    thiskeyword (e) {
      this.keyword = e
      this.page = 0
      this.list = []
      this.finished_ = false
      this.error_ = false
      this.loading_ = false
      this.onLoad()
      this.show = false
    },
    onCancel () {
      this.show = false
    },
    onConfirm (e) {
      this.typeid = e.id
      this.page = 0
      this.list = []
      this.finished_ = false
      this.error_ = false
      this.loading_ = false
      this.onLoad()
      this.show = false
    },
    onLoad () {
      this.page = this.page + 1
      let params = {
        token: this.token,
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
        type: 0,
        typeid: this.typeid
      }
      insidemessage(params).then((res) => {
        if (res.data.code === 2000) {
          this.list = [...this.list, ...res.data.data.data.data]
          this.loading_ = false
          if (this.list.length >= res.data.data.data.total) {
            this.finished_ = true
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
