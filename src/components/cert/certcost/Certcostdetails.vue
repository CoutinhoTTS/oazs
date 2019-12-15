<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="datails_pull">
      <div class="datailsList">
        <div><div><span class="requir">*</span>申请人:</div><div>{{list.optname}}</div></div>
        <div><div><span class="requir">*</span>申请日期:</div><div>{{list.applydt}}</div></div>
        <div><div>单号:</div><div>{{list.number}}</div></div>
        <div><div>月份:</div><div>{{list.month}}</div></div>
        <div><div>证书总金额(元):</div><div>{{list.certmoney}}</div></div>
      </div>
      <van-panel title="说明:" >
        <div class="explian">{{list.explian}}</div>
      </van-panel>
      <div class="Certcostdetailsmx">
        <h3>证书费用明细</h3>
        <div v-for="(item, index) in list_" :key="index">
          <div><div><span class="requir">*</span>证书名称:</div><div>{{item.name}}</div></div>
          <div><div>证书名专业:</div><div>{{item.major}}</div></div>
          <div><div>编号:</div><div>{{item.number}}</div></div>
          <div><div>持证人:</div><div>{{item.holder}}</div></div>
          <div><div>总费用(元):</div><div>{{item.totalmoney}}</div></div>
          <div><div>费用时间(月):</div><div>{{item.costtime}}</div></div>
          <div><div>月费用(元):</div><div>{{item.monthmoney}}</div></div>
          <div><div>使用部门/项目:</div><div>{{item.usepath}}</div></div>
          <div><div>使用时长:</div><div>{{item.usetime}}</div></div>
          <div><div>分摊比例(%):</div><div>{{item.sharescale}}</div></div>
          <div><div>分摊金额:</div><div>{{item.sharemoney}}</div></div>
          <div><div>备注:</div><div>{{item.explain}}</div></div>
        </div>
      </div>
      <div class="Certcostdetailsproject">
        <h3>证书费用项目分摊</h3>
        <div v-for="(item, index) in  list__" :key="index">
          <div><div>项目名称:</div><div>{{item.projectname}}</div></div>
          <div><div>项目负责人:</div><div>{{item.projectleader}}</div></div>
          <div><div>分摊比例(%):</div><div>{{item.sharescale}}</div></div>
          <div><div>分摊金额(元):</div><div>{{item.sharemoney}}</div></div>
          <div><div>备注:</div><div>{{item.explain}}</div></div>
        </div>

      </div>

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
import {certcostshow, getreadsandlog} from '../../../api/Api'
export default {
  name: 'Certcostdetails',
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
      list_: [],
      list__: [],
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
    certcostshow(params).then((res) => {
      if (res.data.code === 2000) {
        this.list = res.data.data.data
        this.list_ = res.data.data.detail
        this.list__ = res.data.data.porject
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
      }
    })
  },
  methods: {
    onRefresh () {
      let params = {
        token: this.token,
        id: this.id
      }
      certcostshow(params).then((res) => {
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
.Certcostdetailsmx,
.Certcostdetailsproject{
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}
  .Certcostdetailsmx>div,
  .Certcostdetailsproject>div{
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin-top: 0.5rem;
    background-color: #f5f5f5;
    padding: 0.5rem;
  }
.Certcostdetailsmx>div>div,
.Certcostdetailsproject>div>div{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0;
}
</style>
