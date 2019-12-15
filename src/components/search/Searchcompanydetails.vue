<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <div class="companylist">
      <van-tabs v-model="active" swipeable :sticky="issticky" :offset-top="isoffsettop">
        <van-tab :title="titile[0]" class="companydata">
          <div><div>企业名称:</div><div>{{list.com_name}}</div></div>
          <div><div>统一社会信用代码:</div><div>{{list.credit_code}}</div></div>
          <div><div>企业注册登记类型:</div><div>{{list.com_region}}</div></div>
          <div><div>企业注册地:</div><div>{{list.province_name}}</div></div>
          <div><div>企业经营地:</div><div>{{list.detail_address}}</div></div>
        </van-tab>
        <van-tab :title="titile[1]" class="companydata">
          <div><div>审核/年检日期:</div><div>{{list_.annualDate}}</div></div>
          <div><div>登记机关:</div><div>{{list_.authority}}</div></div>
          <div><div>行业:</div><div>{{list_.industry}}</div></div>
          <div><div>营业期限:</div><div>{{list_.openTime}}</div></div>
          <div><div>经营状态:</div><div>{{list_.openStatus}}</div></div>
          <div><div>注册资产:</div><div>{{list_.regCapital}}</div></div>
          <div><div>成立日期:</div><div>{{list_.startDate}}</div></div>
          <div><div>联系电话:</div><div>{{list_.telephone}}</div></div>
          <div><div>经营范围:</div><div>{{list_.scope}}</div></div>
        </van-tab>
        <van-tab :title="titile[2]" class="companydatas">
          <div v-for="(item, index) in list__" :key="index">
            <div><div>资质类别:</div><div>{{item.cert_type_name}}</div></div>
            <div><div>资质证书号:</div><div>{{item.cert_number}}</div></div>
            <div><div>资质名称:</div><div>{{item.qualification}}</div></div>
            <div><div>发证日期:</div><div>{{item.issue_date}}</div></div>
            <div><div>证书有效期:</div><div>{{item.end_time}}</div></div>
            <div><div>发证机关:</div><div>{{item.issue_agent}}</div></div>
          </div>
        </van-tab>
        <van-tab :title="titile[3]">
          <!--列表-->
          <van-pull-refresh v-model="isLoading_" @refresh="onRefresh">
            <van-list
              v-model="loading_"
              :error.sync="error_"
              :finished="finished_"
              error-text="请求失败，点击重新加载"
              finished-text="加载完成"
              :offset="offset_"
              @load="onLoad"
            >
              <div class="perlist">
                <div v-for="(item, index) in perlist" :key="index">
                  <div><div>姓名:</div><div>{{item.realname}}</div></div>
                  <div><div>身份证号:</div><div>{{item.id_card}}</div></div>
                  <div><div>注册类别:</div><div>{{item.cert_tec_name}}</div></div>
                  <div><div>注册号(执业印章号):</div><div>{{item.reg_cert_code}}</div></div>
                  <div><div>注册专业:</div><div>{{item.reg_major}}</div></div>
                  <div><div>有效期:</div><div>{{item.end_time}}</div></div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab :title="titile[4]">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh_">
            <van-list
              v-model="loading"
              :error.sync="error"
              :finished="finished"
              error-text="请求失败，点击重新加载"
              finished-text="加载完成"
              :offset="offset"
              @load="onLoad_"
            >
              <div class="perlist">
                <div v-for="(item, index) in projectlist" :key="index">
                  <div><div>项目编码:</div><div>{{item.pro_num}}</div></div>
                  <div><div>项目名称:</div><div>{{item.projectname}}</div></div>
                  <div><div>项目属地:</div><div>{{item.regional}}</div></div>
                  <div><div>建设单位:</div><div>{{item.develop_organ}}</div></div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
    <van-popup v-model="shows_" class="bgcsss" :close-on-click-overlay="clickoverlays">
      <!--加载-->
      <van-loading type="spinner" color="#1989fa" />
    </van-popup>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import {companyshow, comcertlist, usercertlist, proachievelist} from '../../api/Api'
export default {
  name: 'Searchcompanydetails',
  components: {
    NavBar
  },
  data () {
    return {
      token: '',
      id: '',
      name: '',
      tit: '',
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 400,
      isLoading: false,
      finished: false,
      error: false,
      loading: false,
      offset: 400,
      list: [],
      list_: [],
      list__: [],
      perlist: [],
      projectlist: [],
      listisok: false,
      titile: [
        '企业信息',
        '工商信息',
        '企业资质资格',
        '注册人员',
        '工程项目'
      ],
      active: 0,
      page: 0,
      pagesize: 15,
      page_: 0,
      pagesize_: 15,
      // 粘粘性布局
      issticky: true,
      isoffsettop: 46,
      shows_: false,
      clickoverlays: false
    }
  },
  created () {
    this.id = this.$route.query.id
    this.name = this.$route.query.name
    this.tit = `${this.$route.query.tit}详情`
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    this.thiscomdetails()
  },
  methods: {
    onRefresh () {
      // 注册人员
      this.page = 1
      let params = {
        token: this.token,
        com_name: this.name,
        page: this.page,
        pagesize: this.pagesize
      }
      usercertlist(params).then((res) => {
        if (res.data.code === 2000) {
          this.perlist = res.data.data.data
          this.isLoading_ = false
          if (this.list.length >= res.data.data.data.total) {
            this.loading_ = false
            this.finished_ = true
          }
        } else {
          this.$toast('刷新失败')
        }
      })
    },
    onRefresh_ () {
      this.page_ = 1
      let params = {
        token: this.token,
        com_name: this.name,
        page: this.page_,
        pagesize: this.pagesize_
      }
      proachievelist(params).then((res) => {
        if (res.data.code === 2000) {
          this.projectlist = res.data.data.data
          this.isLoading = false
          if (this.list.length >= res.data.data.data.total) {
            this.loading = false
            this.finished = true
          }
        } else {
          this.$toast('刷新失败')
        }
      })
    },
    onLoad () {
      // 注册人员
      this.page = this.page + 1
      let params = {
        token: this.token,
        com_name: this.name,
        page: this.page,
        pagesize: this.pagesize
      }
      usercertlist(params).then((res) => {
        if (res.data.code === 2000) {
          this.perlist = [...this.perlist, ...res.data.data.data]
          this.loading_ = false
          if (this.perlist.length >= res.data.data.total) {
            this.finished_ = true
          }
        } else {
          this.loading_ = false
          this.error_ = true
        }
      })
    },
    onLoad_ () {
      this.page_ = this.page_ + 1
      let params = {
        token: this.token,
        com_name: this.name,
        page: this.page_,
        pagesize: this.pagesize_
      }
      proachievelist(params).then((res) => {
        if (res.data.code === 2000) {
          this.projectlist = [...this.projectlist, ...res.data.data.data]
          this.loading = false
          if (this.projectlist.length >= res.data.data.total) {
            this.finished = true
          }
        } else {
          this.loading = false
          this.error = true
        }
      })
    },
    thiscomdetails () {
      this.shows_ = true
      let param = {
        com_id: this.id,
        token: this.token
      }
      companyshow(param).then((res) => {
        this.shows_ = false
        if (res.data.code === 2000) {
          this.list = res.data.data.company
          this.list_ = res.data.data.detail
          this.listisok = true
          this.isLoading_ = false
        }
      })
      comcertlist(param).then((res) => {
        if (res.data.code === 2000) {
          this.list__ = res.data.data
        }
      })
    }
  }
}
</script>

<style scoped>
  .companylist{
    margin-top: 2.95rem;
    margin-bottom: 3.125rem;
    font-size: 0.9rem;
  }
  .companydata{
    padding: 1rem;
  }
  .companydata>div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 0;
    border-bottom: 1px solid #dddddd;
  }
  .companydata>div>div:first-child{
    min-width: 30%;
  }
  .companydatas{
    padding: 0.5rem 1rem;
  }
  .companydatas>div{
    padding: 0.3rem;
    background-color: #dddddd;
    border-radius: 0.2rem;
    margin: 0.5rem 0;
  }
  .companydatas>div>div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
  }
  .companydatas>div>div>div:first-child{
    min-width: 30%;
  }
  .perlist{
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  .perlist>div{
    padding: 0.3rem;
    background-color: #dddddd;
    border-radius: 0.2rem;
    margin: 0.5rem 0;
  }
  .perlist>div>div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .perlist>div>div>div:first-child{
    min-width: 30%;
  }
</style>
