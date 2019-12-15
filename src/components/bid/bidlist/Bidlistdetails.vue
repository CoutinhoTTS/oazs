<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="datails_pull">
      <van-tabs v-model="active" swipeable >
        <van-tab  title="项目信息">
          <div class="datailsList">
            <div><div>单号:</div><div>{{list.sericnum}}</div></div>
            <div><div>申请人:</div><div>{{list.realname}}</div></div>
            <div><div>申请时间:</div><div>{{list.applydt}}</div></div>
            <div><div>项目名称:</div><div>{{list.name}}</div></div>
            <div><div>项目编号:</div><div>{{list.number}}</div></div>
            <div><div>项目类型:</div><div>{{list.btype}}</div></div>
            <div><div>招标方式:</div><div>{{list.method}}</div></div>
            <div><div>项目详细地址:</div><div>{{list.address}}</div></div>
            <div><div>计划工期(天):</div><div>{{list.duration}}</div></div>
            <div><div>预计工程造价(万元):</div><div>{{list.expect_engine}}</div></div>
            <div><div>项目简介:</div><div>{{list.content}}</div></div>
            <div><div>资格要求:</div><div>{{list.claim_other}}</div></div>
            <div><div>报名截止时间:</div><div>{{list.enroll_enddt}}</div></div>
            <div><div>投标截止时间:</div><div>{{list.bid_enddt}}</div></div>
            <div><div>标书递交地址:</div><div>{{list.subaddr}}</div></div>
            <div><div>网上提交地址:</div><div>{{list.online}}</div></div>
            <div><div>预计投标费(万元):</div><div>{{list.expect_bid}}</div></div>
            <div><div>开标人:</div><div>{{list.open_name}}</div></div>
            <div><div>开标时间:</div><div>{{list.opendt}}</div></div>
            <div><div>开标地点:</div><div>{{list.openaddr}}</div></div>
            <div><div>招标方单位名称:</div><div>{{list.bider_name}}</div></div>
            <div><div>招标方联系人:</div><div>{{list.bider_contacts}}</div></div>
            <div><div>招标方联系方式:</div><div>{{list.bider_tel}}</div></div>
            <div><div>招标方联系地址:</div><div>{{list.bider_addr}}</div></div>
            <div><div>招标方联系地址:</div><div>{{list.bider_addr}}</div></div>
            <div><div>招标代理机构名称:</div><div>{{list.agent_name}}</div></div>
            <div><div>招标代理机构联系人:</div><div>{{list.agent_contacts}}</div></div>
            <div><div>招标代理机构联系方式:</div><div>{{list.agent_tel}}</div></div>
            <div><div>招标代理机构地址:</div><div>{{list.agent_addr}}</div></div>
          </div>
          <van-panel title="说明:" >
            <div class="explian">{{list.explain}}</div>
          </van-panel>
          <!--文件-->
          <File ref="files"></File>
        </van-tab>
        <van-tab  title="投标进度">
          <div class="datailsList">
            <div><div>报名日期:</div><div>{{list.enroll_time}}</div></div>
            <div><div>报名经办人:</div><div>{{list.enroll_jingban}}</div></div>
            <div><div>报名备注:</div><div>{{list.enroll_remark}}</div></div>
            <div><div>投标日期:</div><div>{{list.bid_time}}</div></div>
            <div><div>投标经办人:</div><div>{{list.bid_jingban}}</div></div>
            <div><div>投标备注:</div><div>{{list.bid_remark}}</div></div>
            <div><div>经营方式:</div><div>{{list.business}}</div></div>
            <div><div>质料费用:</div><div>{{list.inf_money}}</div></div>
            <div><div>负责人:</div><div>{{list.fuze}}</div></div>
            <div><div>执行人:</div><div>{{list.runuser}}</div></div>
          </div>
        </van-tab>
        <van-tab  title="保证金信息">
          <div class="datailsList">
            <div><div>保证金额(万元):</div><div>{{list.bond_money}}</div></div>
            <div><div>保证金类型:</div><div>{{list.bond_type}}</div></div>
            <div><div>保证金交款截止:</div><div>{{list.bond_time}}</div></div>
            <div><div>保证金状态:</div><div>{{list.bond_state}}</div></div>
          </div>
        </van-tab>
        <van-tab  title="开标结果">
          <div class="datailsList">
            <div><div>开标人:</div><div>{{list.open_name}}</div></div>
            <div><div>开标时间:</div><div>{{list.opendt}}</div></div>
            <div><div>开标地点:</div><div>{{list.openaddr}}</div></div>
            <div><div>中标时间:</div><div>{{list.winbiddt}}</div></div>
            <div><div>中标金额(万元):</div><div>{{list.winbid_money}}</div></div>
            <div><div>中标备注信息:</div><div>{{list.winbid_remark}}</div></div>
            <div><div>未标备注信息:</div><div>{{list.nobid_remark}}</div></div>
          </div>
        </van-tab>
        <van-tab  title="人员配置">
          <div class="datailstperList">
            <div v-for="(item, index) in conlist" :key="index">
              <div><div>职位:</div><div>{{item.place}}</div></div>
              <div><div>持证人名称:</div><div>{{item.realname}}</div></div>
              <div><div>证书名称:</div><div>{{item.cert_name}}</div></div>
              <div><div>证书专业:</div><div>{{item.cert_major}}</div></div>
              <div><div>证书编号:</div><div>{{item.cert_number}}</div></div>
              <div><div>说明:</div><div>{{item.explain}}</div></div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <!--审核，游览-->
      <Datailsliu ref="getreadsandlog" ></Datailsliu>
    </van-pull-refresh>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Datailsliu from '@/components/com/datails_liu'
import File from '@/components/com/file'
import {bidshow, getreadsandlog} from '../../../api/Api'
export default {
  name: 'Bidlistdetails',
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
      mon: [],
      active: 0,
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
    bidshow(params).then((res) => {
      if (res.data.code === 2000) {
        this.conlist = res.data.data.conlist
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
      bidshow(params).then((res) => {
        if (res.data.code === 2000) {
          this.isLoading_ = false
          this.conlist = res.data.data.conlist
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
  h4{
    margin: 0;
  }
  .datailstperList{
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  .datailstperList>div{
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin-top: 0.5rem;
    background-color: #f5f5f5;
    padding: 0.5rem;
  }
  .datailstperList>div>div{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0;
  }
</style>
