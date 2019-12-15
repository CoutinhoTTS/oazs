<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" ></NavBar>
    </div>
    <van-tabs v-model="active" class="Dealtwith_top" :sticky="sticky" :offset-top="offsettop" swipeable>
      <van-tab title="待处理">
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
            <div class="Dealtwithlist" v-for="(item, index) in list" :key="index" :data-id ="item.id" >
              <div>
                <div>
                  {{item.modename}},申请人:{{item.uname}},单号[{{item.sericnum}}]
                </div>
              </div>
              <div>
                <div v-if="isscs && clper[index].isyes">待<span style="color: blue">({{clper[index].name}})</span>处理</div>
                <div v-if="isscs && clper[index].isyes01">待处理<span style="color: red">({{clper[index].name}})</span></div>
                <span>
              [{{item.optdt}}]
            </span>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="经我处理">
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
          <div class="Dealtwithedlist" v-for="(items, indexs) in list_" :key="indexs" :data-id ="items.id" >
            <div>
              <div>
                {{items.modename}},申请人:{{items.uname}},单号[{{items.sericnum}}]
              </div>
            </div>
            <div>
              <div v-if="isscs_">{{nstatustext[indexs]}}</div>
              <span>
                {{items.optdt}}
              </span>
            </div>
          </div>
        </van-list>
      </van-pull-refresh></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import {handle, handleold} from '../../api/Api'
export default {
  name: 'Dealtwith',
  data () {
    return {
      isshow: '',
      tit: '待处理',
      // 带我处理
      isLoading: false,
      list: [],
      finished: false,
      error: false,
      loading: false,
      offset: 1,
      // 经我处理
      isLoading_: false,
      list_: [],
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 1,
      nstatustext: [],
      token: '',
      // 页码
      page: 1,
      pagesize: 15,
      page_: 1,
      pagesize_: 15,
      // 处理人
      clper: [],
      one: 1,
      two: 2,
      // 分页栏的属性
      isscs: false,
      isscs_: false,
      active: 0,
      sticky: true,
      offsettop: 46
    }
  },
  components: {
    NavBar
  },
  created () {
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    this.token = this.$store.state.token
    let params = {
      token: this.token,
      page: this.page,
      pagesize: this.pagesize,
      keyword: '',
      starttime: '',
      endtime: '',
      modeid: ''
    }
    let params_ = {
      token: this.token,
      page: this.page_,
      pagesize: this.pagesize_,
      keyword: '',
      starttime: '',
      endtime: '',
      modeid: ''
    }
    handle(params).then((res) => {
      if (res.data.code === 2000) {
        this.list = res.data.data.data.data
        for (var i = 0; i < this.list.length; i++) {
          this.clper.push({})
          if ((this.list[i].nstatustext || '').split('>').length === 5) {
            this.clper[i].name = ((this.list[i].nstatustext || '').split('>')[2] || '').split('<')[0]
            this.clper[i].isyes = false
            this.clper[i].isyes01 = true
          } else {
            this.clper[i].name = ((this.list[i].nstatustext || '').split('>')[1] || '').split('<')[0]
            this.clper[i].isyes = true
            this.clper[i].isyes01 = false
          }
        }
        this.isscs = true
        if (this.active === 0) {
          if (this.list.length >= res.data.data.data.total) {
            this.finished = true
          }
        } else if (this.active === 1) {
          if (this.list_.length >= res.data.data.data.total) {
            this.finished_ = true
          }
        }
      }
    })
    handleold(params_).then((res) => {
      if (res.data.code === 2000) {
        this.list_ = res.data.data.data.data
        for (var i = 0; i < this.list_.length; i++) {
          if ((this.list_[i].nstatustext || '').split('>').length === 3) {
            this.nstatustext.push(((this.list_[i].nstatustext || '').split('>')[1] || '').split('<')[0])
          }
        }
        this.isscs_ = true
      }
    })
  },
  methods: {
    onRefresh () {
      if (this.active === 0) {
        let params = {
          token: this.token,
          page: 1,
          pagesize: 15,
          keyword: '',
          starttime: '',
          endtime: '',
          modeid: ''
        }
        handle(params).then((res) => {
          if (res.data.code === 2000) {
            this.page = 1
            this.isscs = false
            this.list = []
            this.clper = []
            this.finished = false
            this.list = res.data.data.data.data
            for (var i = 0; i < this.list.length; i++) {
              this.clper.push({})
              if ((this.list[i].nstatustext || '').split('>').length === 5) {
                this.clper[i].name = ((this.list[i].nstatustext || '').split('>')[2] || '').split('<')[0]
                this.clper[i].isyes = false
                this.clper[i].isyes01 = true
              } else {
                this.clper[i].name = ((this.list[i].nstatustext || '').split('>')[1] || '').split('<')[0]
                this.clper[i].isyes = true
                this.clper[i].isyes01 = false
              }
            }
            this.isscs = true
            setTimeout(() => {
              this.$toast('刷新成功')
              this.isLoading = false
            }, 500)
          }
        })
      } else if (this.active === 1) {
        let params_ = {
          token: this.token,
          page: 1,
          pagesize: 15,
          keyword: '',
          starttime: '',
          endtime: '',
          modeid: ''
        }
        handleold(params_).then((res) => {
          this.page_ = 1
          this.nstatustext = []
          this.isscs_ = false
          this.list_ = []
          this.finished_ = false
          if (res.data.code === 2000) {
            this.list_ = res.data.data.data.data
            for (var i = 0; i < this.list_.length; i++) {
              if ((this.list_[i].nstatustext || '').split('>').length === 3) {
                this.nstatustext.push(((this.list_[i].nstatustext || '').split('>')[1] || '').split('<')[0])
              }
            }
            this.isscs_ = true
            setTimeout(() => {
              this.$toast('刷新成功')
              this.isLoading_ = false
            }, 500)
          }
        })
      }
    },
    onLoad () {
      if (this.active === 0) {
        this.page = this.page + 1
        let params = {
          token: this.token,
          page: this.page,
          pagesize: this.pagesize,
          keyword: '',
          starttime: '',
          endtime: '',
          modeid: ''
        }
        handle(params).then((res) => {
          if (res.data.code === 2000) {
            this.list = [...this.list, ...res.data.data.data.data]
            for (var i = this.page * 15 - 15; i < this.list.length; i++) {
              this.clper.push({})
              if ((this.list[i].nstatustext || '').split('>').length === 5) {
                this.clper[i].name = ((this.list[i].nstatustext || '').split('>')[2] || '').split('<')[0]
                this.clper[i].isyes = false
                this.clper[i].isyes01 = true
              } else {
                this.clper[i].name = ((this.list[i].nstatustext || '').split('>')[1] || '').split('<')[0]
                this.clper[i].isyes = true
                this.clper[i].isyes01 = false
              }
            }
            this.loading = false
            if (this.list.length >= res.data.data.data.total) {
              this.finished = true
            }
          }
        })
      } else if (this.active === 1) {
        this.page_ = this.page_ + 1
        let params_ = {
          token: this.token,
          page: this.page_,
          pagesize: this.pagesize_,
          keyword: '',
          starttime: '',
          endtime: '',
          modeid: ''
        }
        handleold(params_).then((res) => {
          if (res.data.code === 2000) {
            this.list_ = [...this.list_, ...res.data.data.data.data]
            for (var i = this.page_ * 15 - 15; i < this.list_.length; i++) {
              if ((this.list_[i].nstatustext || '').split('>').length === 3) {
                this.nstatustext.push(((this.list_[i].nstatustext || '').split('>')[1] || '').split('<')[0])
              }
            }
            this.loading_ = false
            if (this.list_.length >= res.data.data.data.total) {
              this.finished_ = true
            }
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .Dealtwith_top{
    width: 100%;
    margin-top: 2.95rem;
    border-top: none;
  }
.Dealtwith{
  width: 100%;
  margin-bottom: 3.12rem;
}
  .Dealtwithlist>div,
  .Dealtwithedlist>div{
    margin: 0.5rem auto;
  }
.Dealtwithlist,
.Dealtwithedlist{
  padding: 0.5rem 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
}
.Dealtwithlist>div:first-child,
.Dealtwithedlist>div:first-child{
  width: 100%;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.Dealtwithlist>div:last-child,
.Dealtwithedlist>div:last-child{
  width: 100%;
  font-size: 0.9rem;
  margin-top: 0.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.Dealtwithlist>div:first-child>div,
.Dealtwithedlist>div:first-child>div{
  width: 100%;
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.Dealtwithlist>div:last-child>span:last-child,
.Dealtwithedlist>div:last-child>span:last-child{
  font-size: 0.9rem;
  color:  #75c2ea;
}

</style>
