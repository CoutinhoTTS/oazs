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
            <div><div>项目/部门:</div><div>{{list.name}}</div></div>
            <div><div>单号:</div><div>{{list.number}}</div></div>
            <div><div>使用总费用(元):</div><div>{{list.allmoney}}</div></div>
            <div><div>分摊总费用(元):</div><div>{{list.fenmoney}}</div></div>
            <div><div>用途:</div><div>{{list.purpose}}</div></div>
          </div>
          <van-panel title="说明:" >
            <div class="explian">{{list.remark}}</div>
          </van-panel>
        </van-tab>
        <van-tab title="费用登记明细">
          <div class="conlists">
            <div v-for="(item, index) in conlist" :key="index">
              <div>
                <div><span>证书名称:</span><span>{{item.name}}</span></div>
                <div><span>编号:</span><span>{{item.number}}</span></div>
              </div>
              <div>
                <div><span>持证人:</span><span>{{item.holder}}</span></div>
                <div><span>总费用(元):</span><span>{{item.totalmoney}}</span></div>
              </div>
              <div>
                <div><span>费用时段:</span><span>{{item.totaltime}}</span></div>
              </div>
              <div>
                <div><span>费用天数:</span><span>{{item.totalday}}</span></div>
                <div><span>日费用(元):</span><span>{{item.day_money}}</span></div>
              </div>
              <div>
                <div><span>使用开始日期:</span><span>{{item.startdt}}</span></div>
              </div>
              <div>
                <div><span>使用结束日期:</span><span>{{item.enddt}}</span></div>
              </div>
              <div>
                <div><span>使用天数:</span><span>{{item.use_day}}</span></div>
                <div><span>使用费用:</span><span>{{item.use_money}}</span></div>
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
import {certcostlogshow, getreadsandlog} from '../../../api/Api'
export default {
  name: 'Enginspeeddetails',
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
    certcostlogshow(params).then((res) => {
      if (res.data.code === 2000) {
        this.list = res.data.data.data
        // 施工清单
        this.conlist = res.data.data.detail
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
      certcostlogshow(params).then((res) => {
        if (res.data.code === 2000) {
          this.isLoading_ = false
          this.list = res.data.data.data
          this.conlist = res.data.data.detail
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
