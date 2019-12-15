<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit">
      </NavBar>
    </div>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="datails_pull">
      <div class="datailsList">
        <div class="personname" @click="persondatails(list.personid)"><div><span class="requir">*</span>持证人:</div><div>{{list.personname}}</div></div>
        <div><div><span class="requir">*</span>证书名称:</div><div>{{list.cert_name}}</div></div>
        <div><div><span class="requir">*</span>分类:</div><div>{{list.class}}</div></div>
        <div><div><span class="requir">*</span>所属单位:</div><div>{{list.unitname}}</div></div>
        <div><div>证书专业:</div><div><div v-for="(item, index) in mon" :key="index">{{item}}</div></div></div>
        <div><div><span class="requir">*</span>证书编号:</div><div>{{list.cert_number}}</div></div>
        <div><div>发证单位:</div><div>{{list.issuing_unit}}</div></div>
        <div><div>发证时间:</div><div>{{list.issuingdt}}</div></div>
        <div><div>有效期至:</div><div>{{list.maturitydt}}</div></div>
        <div><div>复核时间:</div><div>{{list.repeatdt}}</div></div>
        <div><div>转出时间:</div><div>{{list.outdt}}</div></div>
        <div><div>其他文件:</div><div>{{list.other_file}}</div></div>
        <div><div>文件柜:</div><div>{{list.boxname}}</div></div>
        <div><div>证书性质:</div><div>{{list.nature}}</div></div>
        <div><div>证书去向:</div><div>{{list.cert_goes}}</div></div>
        <div><div>证书用途:</div><div>{{list.cert_status}}</div></div>
        <div><div>证书费用(元):</div><div>{{list.cert_cost}}</div></div>
        <div><div>使用时长(月):</div><div>{{list.cert_time}}</div></div>
      </div>
      <van-panel title="备注:" >
        <div class="explian">{{list.explian}}</div>
      </van-panel>
      <!--文件-->
      <File ref="files"></File>
      <!--审核，游览-->
      <Datailsliu ref="getreadsandlog"></Datailsliu>
    </van-pull-refresh>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Datailsliu from '@/components/com/datails_liu'
import File from '@/components/com/file'
import {certshow, getreadsandlog} from '../../../api/Api'
export default {
  name: 'certalldatails',
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
    certshow(params).then((res) => {
      if (res.data.code === 2000) {
        this.list = res.data.data.data
        for (var i = 0; i < this.list.cert_major_arr.length; i++) {
          this.mon.push(`${this.list.cert_major_arr[i]} （有效期:${this.list.major_maturitydt_arr[i]}）`)
        }
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
        this.$refs.getreadsandlog.datails_liu(this.getreadsandlog)
      }
    })
  },
  methods: {
    onRefresh () {
      let params = {
        token: this.token,
        id: this.id
      }
      certshow(params).then((res) => {
        if (res.data.code === 2000) {
          this.mon = []
          this.list = res.data.data.data
          for (var i = 0; i < this.list.cert_major_arr.length; i++) {
            this.mon.push(`${this.list.cert_major_arr[i]} （有效期:${this.list.major_maturitydt_arr[i]}）`)
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
    },
    persondatails (id) {
    }
  }
}
</script>

<style scoped>

</style>
