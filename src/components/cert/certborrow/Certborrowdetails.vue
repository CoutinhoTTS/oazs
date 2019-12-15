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
         <div><div>标题:</div><div>{{list.name}}</div></div>
         <div><div>证书需求:</div><div>{{list.demand}}</div></div>
         <div><div>用途:</div><div>{{list.purpose}}</div></div>
         <div><div>申请借证时间:</div><div>{{list.applydt}}</div></div>
         <div><div>预计归还时间:</div><div>{{list.expect_returndt}}</div></div>
         <div><div>实际归还时间:</div><div>{{list.fact_returndt}}</div></div>
       </div>
       <!--审核，游览-->
       <Datailsliu ref="getreadsandlog" ></Datailsliu>
     </van-pull-refresh>
   </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Datailsliu from '@/components/com/datails_liu'
import {certborrowshow, getreadsandlog} from '../../../api/Api'
export default {
  name: 'Certborrowdetails',
  components: {
    NavBar,
    Datailsliu
  },
  data () {
    return {
      tit: '证书详情',
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
    certborrowshow(params).then((res) => {
      if (res.data.code === 2000) {
        this.list = res.data.data.data
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
      }
    })
  },
  methods: {
    onRefresh () {
      let params = {
        token: this.token,
        id: this.id
      }
      certborrowshow(params).then((res) => {
        if (res.data.code === 2000) {
          this.list = res.data.data.data
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
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
