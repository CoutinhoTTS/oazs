
<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="datails_pull">
      <div class="datailsList">
        <div><div>所属人:</div><div>{{list.realname}}</div></div>
        <div><div>合同编号:</div><div>{{list.num}}</div></div>
        <div><div>所属日期:</div><div>{{list.dt}}</div></div>
        <div><div>客户名称:</div><div>{{list.custname}}</div></div>
        <div><div>类型:</div><div v-if="list.type === 0">收款单</div><div v-else>付款单</div></div>
        <div><div>金额(元):</div><div>{{list.money}}</div></div>
        <div><div>是否付款:</div><div v-if="list.ispay === 1">已付款</div><div v-else>未付款</div></div>
        <div><div>收款时间:</div><div>{{list.paydt}}</div></div>
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
import {custfinashow, getreadsandlog} from '../../../api/Api'
export default {
  name: 'Csmydetails',
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
      imageList: []
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
    custfinashow(params).then((res) => {
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
      custfinashow(params).then((res) => {
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
  .conlists{
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  .conlists>div{
    padding: 0.3rem;
    border-radius: 0.3rem;
    background-color: #f5f5f5;
    margin: 0.3rem 0;
  }
  .conlists>div>div{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0.3rem 0;
  }
  .conlists>div>div>div>span:nth-child(2){
    margin-left: 0.3rem;
  }
  .imgs{
    width: 50%;
  }
  .imgs_>div:nth-child(2){
    text-align: right;
  }
</style>
