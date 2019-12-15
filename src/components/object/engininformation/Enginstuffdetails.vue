<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="datails_pull">
      <div class="datailsList">
        <div><div>材料编码:</div><div>{{list.number}}</div></div>
        <div><div>材料名称:</div><div>{{list.name}}</div></div>
        <div><div>材料简称:</div><div>{{list.short_name}}</div></div>
        <div><div>条码:</div><div>{{list.bar_code}}</div></div>
        <div><div>材料类型:</div><div>{{list.type}}</div></div>
        <div><div>计量单位:</div><div>{{list.unit}}</div></div>
        <div><div>规格型号:</div><div>{{list.specs}}</div></div>
        <div><div>颜色:</div><div>{{list.color}}</div></div>
        <div><div>材质:</div><div>{{list.material}}</div></div>
        <div><div>尺寸:</div><div>{{list.size}}</div></div>
        <div><div>重量:</div><div>{{list.weight}}</div></div>
        <div><div>档次级别:</div><div>{{list.level}}</div></div>
        <div><div>品牌:</div><div>{{list.brand}}</div></div>
        <div><div>产地:</div><div>{{list.place_addr}}</div></div>
        <div><div>厂家:</div><div>{{list.manufactor}}</div></div>
        <div><div>图号:</div><div>{{list.map_number}}</div></div>
        <div><div>批准文号:</div><div>{{list.symbol}}</div></div>
        <div><div>价格(元):</div><div>{{list.price}}</div></div>
        <div><div>技术参数:</div><div>{{list.parameter}}</div></div>
        <div><div>税率(%):</div><div>{{list.tax_rate}}</div></div>
        <div><div>含税价(元):</div><div>{{list.rate_price}}</div></div>
        <div><div>状态:</div><div>{{list.status}}</div></div>
      </div>
      <van-panel title="说明:" >
        <div class="explian">{{list.remark}}</div>
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
import {enginstuffshow, getreadsandlog} from '../../../api/Api'
export default {
  name: 'Enginstuffdetails',
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
      mon: [],
      // 施工清单
      conlist: []
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
    enginstuffshow(params).then((res) => {
      if (res.data.code === 2000) {
        this.list = res.data.data.data
        // 施工清单
        this.conlist = res.data.data.conlist
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
      enginstuffshow(params).then((res) => {
        if (res.data.code === 2000) {
          this.isLoading_ = false
          this.list = res.data.data.data
          this.conlist = res.data.data.conlist
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
