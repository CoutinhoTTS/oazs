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
        <div><div>填报人:</div><div>{{list.realname}}</div></div>
        <div><div>项目名称:</div><div>{{list.enginname}}</div></div>
        <div><div>抄送给谁:</div><div>{{list.copyname}}</div></div>
        <div><div>日志时间:</div><div>{{list.checkdt}}</div></div>
        <div><div>出勤人数:</div><div>{{list.turnwork}}</div></div>
        <div><div>温度(℃):</div><div>{{list.rature}}</div></div>
        <div><div>施工部位:</div><div>{{list.position}}</div></div>
        <div><div>施工部门:</div><div>{{list.deptname}}</div></div>
        <div><div>当日施工安全情况:</div><div>{{list.safety_day}}</div></div>
        <div><div>安全教育情况:</div><div>{{list.safety_educa}}</div></div>
        <div><div>安全交底:</div><div>{{list.safety_disc}}</div></div>
        <div><div>验收情况记录:</div><div>{{list.check_accept}}</div></div>
        <div><div>安全检查情况:</div><div>{{list.safety_inspec}}</div></div>
        <div><div>安全会议记录:</div><div>{{list.safety_meet}}</div></div>
        <div><div>其他:</div><div>{{list.other}}</div></div>
        <div><div>申请时间:</div><div>{{list.applydt}}</div></div>
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
import {enginsafetyshow, getreadsandlog} from '../../../api/Api'
export default {
  name: 'Enginseclogdetails',
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
      active: 0,
      issticky: true,
      isoffsettop: 46,
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
    enginsafetyshow(params).then((res) => {
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
      enginsafetyshow(params).then((res) => {
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
