<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="datails_pull">
      <div class="datailsList">
        <div><div>申请人:</div><div>{{list.realname}}</div></div>
        <div><div>申请日期:</div><div>{{list.applydt}}</div></div>
        <div><div>合同编号:</div><div>{{list.num}}</div></div>
        <div><div>合同名称:</div><div>{{list.contname}}</div></div>
        <div><div>合同类型:</div><div>{{list.type}}</div></div>
        <div><div>合同金额(元):</div><div>{{list.money}}</div></div>
        <div><div>合作单位:</div><div>{{list.agency}}</div></div>
        <div><div>合作方联系人:</div><div>{{list.name}}</div></div>
        <div><div>合作方电话:</div><div>{{list.tel}}</div></div>
        <div><div>签署单位:</div><div>{{list.qiancom}}</div></div>
        <div><div>签署人:</div><div>{{list.qianname}}</div></div>
        <div><div>合同开始时间:</div><div>{{list.startdt}}</div></div>
        <div><div>合同结束时间:</div><div>{{list.enddt}}</div></div>
        <div><div>签约日期:</div><div>{{list.qiandt}}</div></div>
        <div><div>提前终止日期:</div><div>{{list.tqjiedt}}</div></div>
      </div>
      <van-panel title="合同内容:" >
        <div class="explian">{{list.content}}</div>
      </van-panel>
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
import {certcontractshow, getreadsandlog} from '../../../api/Api'
export default {
  name: 'Certcontractdetails',
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
      id: this.id
    }
    certcontractshow(params).then((res) => {
      if (res.data.code === 2000) {
        console.log(res)
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
        id: this.id
      }
      certcontractshow(params).then((res) => {
        if (res.data.code === 2000) {
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
