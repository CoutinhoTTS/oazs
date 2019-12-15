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
            <div><div>编号:</div><div>{{list.num}}</div></div>
            <div><div>名称:</div><div>{{list.name}}</div></div>
            <div><div>简称:</div><div>{{list.nameen}}</div></div>
            <div><div>助记码:</div><div>{{list.mnemon}}</div></div>
            <div><div>成立时间:</div><div>{{list.founddt}}</div></div>
            <div><div>单位性质:</div><div>{{list.nature}}</div></div>
            <div><div>人员规模:</div><div>{{list.scale}}</div></div>
            <div><div>所在区域:</div><div>{{list.location}}</div></div>
            <div><div>分类名称:</div><div>{{list.typename}}</div></div>
            <div><div>税率:</div><div>{{list.rate}}</div></div>
            <div><div>单位简介:</div><div>{{list.content}}</div></div>
          </div>
        </van-tab>
        <van-tab title="注册信息">
          <div class="datailsList">
            <div><div>法人代表:</div><div>{{list.legal}}</div></div>
            <div><div>注册资本:</div><div>{{list.capital}}</div></div>
            <div><div>注册地址:</div><div>{{list.regaddr}}</div></div>
            <div><div>资产规模:</div><div>{{list.asset_scale}}</div></div>
            <div><div>年销售额:</div><div>{{list.sales}}</div></div>
            <div><div>年利润额:</div><div>{{list.profit}}</div></div>
            <div><div>税务登记号:</div><div>{{list.taxnumber}}</div></div>
            <div><div>营业执照号:</div><div>{{list.busnumber}}</div></div>
            <div><div>一般纳税人:</div><div>{{list.istaxer}}</div></div>
            <div><div>经营范围:</div><div>{{list.scope}}</div></div>
          </div>
        </van-tab>
        <van-tab title="通讯信息">
          <div class="datailsList">
            <div><div>国家地区:</div><div>{{list.country}}</div></div>
            <div><div>详细地址:</div><div>{{list.address}}</div></div>
            <div><div>联系人:</div><div>{{list.contacts}}</div></div>
            <div><div>联系人职位:</div><div>{{list.ranking}}</div></div>
            <div><div>手机号码:</div><div>{{list.tel}}</div></div>
            <div><div>座机号码:</div><div>{{list.mobile}}</div></div>
            <div><div>传真:</div><div>{{list.fax}}</div></div>
            <div><div>邮箱:</div><div>{{list.email}}</div></div>
            <div><div>qq号:</div><div>{{list.qq}}</div></div>
            <div><div>到货地址:</div><div>{{list.arrivaladd}}</div></div>
          </div>
        </van-tab>
        <van-tab title="备注信息">
          <div class="datailsList">
            <div><div>开户行名称:</div><div>{{list.bankname}}</div></div>
            <div><div>银行账户:</div><div>{{list.bankaccount}}</div></div>
            <div><div>结算方式:</div><div>{{list.setmethod}}</div></div>
            <div><div>支付方式:</div><div>{{list.paymethod}}</div></div>
            <div><div>状态:</div><div>{{list.status}}</div></div>
            <div><div>结算币种:</div><div>{{list.currency}}</div></div>
          </div>
        </van-tab>
      </van-tabs>
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
import {dealcomshow, getreadsandlog} from '../../../api/Api'
export default {
  name: 'Financedealcomdetails',
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
      list: [],
      active: 0,
      issticky: true,
      isoffsettop: 46,
      getreadsandlog: '',
      // 注册信息
      conlist: [],
      // 通讯信息
      person: [],
      // 备注信息
      allocs: []
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
    dealcomshow(params).then((res) => {
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
      dealcomshow(params).then((res) => {
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
</style>
