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
        <div><div>工程规模:</div><div>{{list.scale}}</div></div>
        <div><div>形象进度:</div><div>{{list.progress}}</div></div>
        <div><div>检查日期:</div><div>{{list.checkdt}}</div></div>
        <div><div>检查部位:</div><div>{{list.position}}</div></div>
        <div><div>检查人:</div><div>{{list.checkname}}</div></div>
        <div><div>复查人:</div><div>{{list.reviewname}}</div></div>
        <div><div>基本情况:</div><div>{{list.basic}}</div></div>
        <div><div>现场检查情况:</div><div>{{list.site_inspec}}</div></div>
        <div><div>处理要求及措施:</div><div>{{list.measure}}</div></div>
        <div><div>复查情况:</div><div>{{list.review_status}}</div></div>
        <div><div>申请时间:</div><div>{{list.applydt}}</div></div>
      </div>
      <!--<van-panel title="说明:" >-->
        <!--<div class="explian">{{list.explain}}</div>-->
      <!--</van-panel>-->
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
  name: 'Enginchecklistdetails',
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
