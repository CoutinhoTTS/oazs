<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="datails_pull">
      <div class="datailsList">
        <div><div>单号:</div><div>{{list.sericnum}}</div></div>
        <div><div>申请人:</div><div>{{list.realname}}</div></div>
        <div><div>开始时间:</div><div>{{list.stime}}</div></div>
        <div><div>截止时间:</div><div>{{list.etime}}</div></div>
        <div><div>时间(小时):</div><div>{{list.totals}}</div></div>
        <div><div>加班兑换:</div><div v-if="list.jiafee === 0">调休</div><div v-if="list.jiafee === 1">加班费</div></div>
        <div><div>加班费:</div><div>{{list.jiafee}}</div></div>
        <div><div>申请日期:</div><div>{{list.applydt}}</div></div>
      </div>
      <van-panel title="说明:" >
        <div class="explian">{{list.explain}}</div>
      </van-panel>
      <!--文件-->
      <File ref="files"></File>
      <!--审核，游览-->
      <Datailsliu ref="getreadsandlog" ></Datailsliu>
    </van-pull-refresh>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Datailsliu from '@/components/com/datails_liu'
import File from '@/components/com/file'
import {kqinfojbshow, getreadsandlog} from '../../../api/Api'
export default {
  name: 'Projectadministrationdetails',
  components: {
    NavBar,
    Datailsliu,
    File
  },
  data () {
    return {
      tit: '人员xiangq',
      isLoading_: false,
      token: '',
      id: '',
      modenum: '',
      // 详情数据
      list: '',
      getreadsandlog: '',
      //  证书专业
      mon: []
    }
  },
  created () {
    this.id = this.$route.query.id
    this.modenum = this.$route.query.modenum
    this.tit = `${this.$route.query.tit}详情`
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    let params = {
      token: this.token,
      id: this.id,
      modenum: this.modenum
    }
    kqinfojbshow(params).then((res) => {
      if (res.data.code === 2000) {
        this.list = res.data.data.data
        this.$refs.files.files(res.data.data.file)
      }
    })
    let params_ = {
      token: this.token,
      modenum: this.modenum,
      mid: this.id
    }
    getreadsandlog(params_).then((res) => {
      if (res.data.code === 2000) {
        this.getreadsandlog = res.data.data
        this.$refs.getreadsandlog.datails_liu(this.getreadsandlog, this.modenum, this.id, this.token)
        this.isLoading_ = false
      }
    })
  },
  methods: {
    onRefresh () {
      let params = {
        token: this.token,
        id: this.id,
        modenum: this.modenum
      }
      kqinfojbshow(params).then((res) => {
        if (res.data.code === 2000) {
          this.isLoading_ = false
          this.list = res.data.data.data
          let params_ = {
            token: this.token,
            modenum: this.modenum,
            mid: this.id
          }
          this.$refs.files.files(res.data.data.file)
          getreadsandlog(params_).then((res) => {
            if (res.data.code === 2000) {
              this.getreadsandlog = res.data.data
              this.$refs.getreadsandlog.datails_liu(this.getreadsandlog, this.modenum, this.id, this.token)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
