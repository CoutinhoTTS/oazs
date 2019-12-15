<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="datails_pull">
      <div class="datailsList">
        <div><div>项目名称:</div><div>{{list.bidname}}</div></div>
        <div><div>项目详细地址:</div><div>{{list.address}}</div></div>
        <div><div>建设单位:</div><div>{{list.buildunit}}</div></div>
        <div><div>质量要求:</div><div>{{list.quality}}</div></div>
        <div><div>工期要求:</div><div>{{list.period}}</div></div>
        <div><div>工期要求:</div><div>{{list.period}}</div></div>
        <div><div>预计造价(元):</div><div>{{list.cost}}</div></div>
        <div><div>是否中标:</div><div v-if="list.iswin === '1'">是</div><div v-if="list.iswin === '0'">否</div></div>
        <div><div>开标日期:</div><div>{{list.biddt}}</div></div>
        <div><div>开标人:</div><div>{{list.bidperson}}</div></div>
        <div><div>经济标排名:</div><div>{{list.economic}}</div></div>
        <div><div>中标/未中标原因:</div><div>{{list.reason}}</div></div>

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
import {bidsumshow, getreadsandlog} from '../../../api/Api'
export default {
  name: 'Bidsumdetails',
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
    bidsumshow(params).then((res) => {
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
      bidsumshow(params).then((res) => {
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
              this.isLoading_ = false
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
