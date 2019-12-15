<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="datails_pull">
      <van-tabs v-model="active" swipeable :sticky="issticky" :offset-top="isoffsettop">
        <van-tab title="基本信息">
          <div class="datailsList">
            <div><div>申请人:</div><div>{{list.realname}}</div></div>
            <div><div>申请日期:</div><div>{{list.applydt}}</div></div>
            <div><div>工作类别:</div><div>{{list.type}}</div></div>
            <div><div>单位名称:</div><div>{{list.name}}</div></div>
            <div><div>工资单号:</div><div>{{list.number}}</div></div>
            <div><div>工资月份:</div><div>{{list.month}}</div></div>
            <div><div>本月工作日(天):</div><div>{{list.monthday}}</div></div>
            <div><div>发放日期:</div><div>{{list.grantdt}}</div></div>
            <div><div>发放人数:</div><div>{{list.grantperson}}</div></div>
            <div><div>发放工资(元):</div><div>{{list.grantwages}}</div></div>
            <div><div>发放方式:</div><div>{{list.granttype}}</div></div>
            <div><div>发放账号:</div><div>{{list.grantaccount}}</div></div>
            <!--<div><div>申请时间:</div><div>{{list.applydt}}</div></div>-->
          </div>
          <van-panel title="说明:" >
            <div class="explian">{{list.content}}</div>
          </van-panel>
        </van-tab>
        <van-tab title="工资明细">
          <div class="conlists">
            <div v-for="(item, index) in conlist" :key="index">
              <div>
                <div><span>员工姓名:</span><span>{{item.name}}</span></div>
                <div><span>部门:</span><span>{{item.dept}}</span></div>
              </div>
              <div>
                <div><span>基本工资(元):</span><span>{{item.basewages}}</span></div>
                <div><span>日工资(元):</span><span>{{item.daywages}}</span></div>
              </div>
              <div>
                <div><span>出勤(元):</span><span>{{item.outwork}}</span></div>
                <div><span>扣除金额(元):</span><span>{{item.deductionmoney}}</span></div>
              </div>
              <div>
                <div><span>奖金(元):</span><span>{{item.bonus}}</span></div>
                <div><span>提成(元):</span><span>{{item.royalty}}</span></div>
              </div>
              <div>
                <div><span>餐补(元):</span><span>{{item.supplement}}</span></div>
                <div><span>加项(元):</span><span>{{item.addition}}</span></div>
              </div>
              <div>
                <div><span>应发工资(元):</span><span>{{item.payablewages}}</span></div>
                <div><span>个人税(元):</span><span>{{item.personaltax}}</span></div>
              </div>
              <div>
                <div><span>保险(元):</span><span>{{item.insurance}}</span></div>
                <div><span>公积金(元):</span><span>{{item.fund}}</span></div>
              </div>
              <div>
                <div><span>减项(元):</span><span>{{item.subtraction}}</span></div>
                <div><span>实发工资(元):</span><span>{{item.realwages}}</span></div>
              </div>
              <div>
                <div><span>备注:</span><span>{{item.explain}}</span></div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="工资分摊">
          <div class="conlists">
            <div v-for="(item, index) in conlist_" :key="index">
              <div>
                <div><span>项目名称:</span><span>{{item.projectname}}</span></div>
                <div><span>项目负责人:</span><span>{{item.projectleader}}</span></div>
              </div>
              <div>
                <div><span>分摊比例(%):</span><span>{{item.sharescale}}</span></div>
                <div><span>分摊金额(元):</span><span>{{item.sharemoney}}</span></div>
              </div>
              <div>
                <div><span>备注:</span><span>{{item.explain}}</span></div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
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
import {wagesshow, getreadsandlog} from '../../../api/Api'
export default {
  name: 'Enginpayplandetails',
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
      conlist: [],
      conlist_: []
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
    wagesshow(params).then((res) => {
      if (res.data.code === 2000) {
        this.list = res.data.data.data
        this.conlist = res.data.data.detail
        this.conlist_ = res.data.data.project
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
      wagesshow(params).then((res) => {
        if (res.data.code === 2000) {
          this.isLoading_ = false
          this.list = res.data.data.data
          this.conlist = res.data.data.detail
          this.conlist_ = res.data.data.project
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
</style>
