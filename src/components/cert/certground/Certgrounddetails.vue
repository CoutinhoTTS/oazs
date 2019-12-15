<template>
   <div>
     <div class="NavBar">
       <NavBar :titles="tit">
       </NavBar>
     </div>
     <!--列表-->
     <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="datails_pull">
       <div class="datailsList">
         <div><div>出场标题:</div><div>{{list.title}}</div></div>
         <div><div>出场人员:</div><div>{{list.personname}}</div></div>
         <div><div>项目名称:</div><div>{{list.projectname}}</div></div>
         <div><div>出场开始时间:</div><div>{{list.startdt}}</div></div>
         <div><div>出场结束时间:</div><div>{{list.enddt}}</div></div>
         <div><div>是否出场:</div><div>{{list.isground}}</div></div>
         <div><div>出场确认人:</div><div>{{list.confirn_person}}</div></div>
         <div><div>出场费用:</div><div><div v-for="(item, index) in mon" :key="index" class="groundmoney"><span>{{item.name}}:</span><span>{{item.money}}(元)</span></div></div></div>
       </div>
       <van-panel title="备注:" >
         <div class="explian">{{list.explain}}</div>
       </van-panel>
       <!--审核，游览-->
       <Datailsliu ref="getreadsandlog"></Datailsliu>
     </van-pull-refresh>
   </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Datailsliu from '@/components/com/datails_liu'
import File from '@/components/com/file'
import {groundshow, getreadsandlog} from '../../../api/Api'
export default {
  name: 'Certgrounddetails',
  components: {
    NavBar,
    Datailsliu,
    File
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
      mon: [],
      mone: []
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
    groundshow(params).then((res) => {
      if (res.data.code === 2000) {
        this.list = res.data.data.data
        if (this.list.isground === 0) {
          this.list.isground = '待出场'
        } else if (this.list.isground === 1) {
          this.list.isground = '已出场'
        } else {
          this.list.isground = '未出场'
        }
        this.mone = res.data.data.grounds
        for (var i = 0; i < this.mone.length; i++) {
          this.mon.push({
            name: this.mone[i].name,
            money: this.mone[i].money
          })
        }
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
        this.$refs.getreadsandlog.datails_liu(this.getreadsandlog)
      }
    })
  },
  methods: {
    onRefresh () {
      this.mon = []
      let params = {
        token: this.token,
        id: this.id
      }
      groundshow(params).then((res) => {
        if (res.data.code === 2000) {
          this.list = res.data.data.data
          if (this.list.isground === 0) {
            this.list.isground = '待出场'
          } else if (this.list.isground === 1) {
            this.list.isground = '已出场'
          } else {
            this.list.isground = '未出场'
          }
          this.mone = res.data.data.grounds
          for (var i = 0; i < this.mone.length; i++) {
            this.mon.push({
              name: this.mone[i].name,
              money: this.mone[i].money
            })
          }
          let params_ = {
            token: this.token,
            modenum: this.modenum,
            mid: this.id
          }
          getreadsandlog(params_).then((res) => {
            if (res.data.code === 2000) {
              this.getreadsandlog = res.data.data
              this.$refs.getreadsandlog.datails_liu(this.getreadsandlog)
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
.groundmoney{
  text-align: right;
}
.groundmoney>span:nth-child(2){
  color: #008ddd;
  margin-left: 0.3rem;
}
</style>
