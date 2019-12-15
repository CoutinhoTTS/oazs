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
            <div><div>单号:</div><div>{{list.sericnum}}</div></div>
            <div><div>填报人:</div><div>{{list.realname}}</div></div>
            <div><div>项目名称:</div><div>{{list.name}}</div></div>
            <div><div>项目类型:</div><div>{{list.type}}</div></div>
            <div><div>项目状态:</div><div>{{list.state}}</div></div>
            <div><div>项目地址:</div><div>{{list.address}}</div></div>
            <div><div>经营方式:</div><div>{{list.business}}</div></div>
            <div><div>计划工期(天):</div><div>{{list.duration}}</div></div>
            <div><div>工程造价(万元):</div><div>{{list.money}}</div></div>
            <div><div>质量等级:</div><div>{{list.quality_grade}}</div></div>
            <div><div>合同开工日期:</div><div>{{list.startdt}}</div></div>
            <div><div>合同竣工日期:</div><div>{{list.enddt}}</div></div>
            <div><div>项目信息维护人员:</div><div>{{list.managename}}</div></div>
            <div><div>申请日期:</div><div>{{list.applydt}}</div></div>
            <div><div>所属分公司:</div><div>{{list.company}}</div></div>
          </div>
          <van-panel title="说明:" >
            <div class="explian">{{list.explain}}</div>
          </van-panel>
        </van-tab>
        <van-tab title="施工清单明细">
          <div class="conlists">
            <div v-for="(item, index) in conlist" :key="index">
              <div>
                <div><span>清单编号:</span><span>{{item.num}}</span></div>
              </div>
              <div>
                <div><span>名称:</span><span>{{item.name}}</span></div>
              </div>
              <div>
                <div><span>单位:</span><span>{{item.unit}}</span></div>
                <div><span>工程量:</span><span>{{item.quantities}}</span></div>
              </div>
              <div>
                <div><span>综合单价(元):</span><span>{{item.price}}</span></div>
                <div><span>合价(元):</span><span>{{item.allprice}}</span></div>
              </div>
              <div>
                <div><span>备注:</span><span>{{item.remark}}</span></div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="项目部成员">
          <div class="conlists">
            <div v-for="(item, index) in person" :key="index">
              <div>
                <div><span>部门名称:</span><span>{{item.deptname}}</span></div>
              </div>
              <div>
                <div><span>人员名称:</span><span>{{item.deptname}}</span></div>
              </div>
              <div>
                <div><span>联系电话:</span><span>{{item.deptname}}</span></div>
              </div>
              <div>
                <div><span>岗位名称:</span><span>{{item.jobname}}</span></div>
              </div>
              <div>
                <div><span>主要职责:</span><span>{{item.duty}}</span></div>
              </div>
              <div>
                <div><span>任职开始时间:</span><span>{{item.startdt}}</span></div>
              </div>
              <div>
                <div><span>任职结束时间:</span><span>{{item.enddt}}</span></div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="班组成员">
          <div class="conlists">
            <div v-for="(item, index) in allocs" :key="index">
              <div>
                <div><span>职位:</span><span>{{item.place}}</span></div>
              </div>
              <div>
                <div><span>持证人名称:</span><span>{{item.realname}}</span></div>
              </div>
              <div>
                <div><span>证书名称:</span><span>{{item.cert_name}}</span></div>
              </div>
              <div>
                <div><span>证书专业:</span><span>{{item.cert_major}}</span></div>
              </div>
              <div>
                <div><span>证书编号:</span><span>{{item.cert_number}}</span></div>
              </div>
              <div>
                <div><span>说明:</span><span>{{item.explain}}</span></div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="建设单位">
          <div class="conlists">
            <div v-for="(item, index) in build" :key="index">
              <div>
                <div><span>单位类别:</span><span>{{item.type}}</span></div>
              </div>
              <div>
                <div><span>单位名称:</span><span>{{item.name}}</span></div>
              </div>
              <div>
                <div><span>单位地址:</span><span>{{item.address}}</span></div>
              </div>
              <div>
                <div><span>联系人:</span><span>{{item.person}}</span></div>
              </div>
              <div>
                <div><span>联系电话:</span><span>{{item.phone}}</span></div>
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
import {enginshow, getreadsandlog} from '../../../api/Api'
export default {
  name: 'Engindetails',
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
      // 项目部成员
      person: [],
      // 班组成员
      allocs: [],
      // 建设单位
      build: []
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
    enginshow(params).then((res) => {
      if (res.data.code === 2000) {
        this.list = res.data.data.data
        // 施工清单
        this.conlist = res.data.data.conlist
        // 项目部成员
        this.person = res.data.data.person
        // 班主成员
        this.allocs = res.data.data.allocs
        // 建设单位
        this.build = res.data.data.build
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
      enginshow(params).then((res) => {
        if (res.data.code === 2000) {
          // 施工清单
          this.conlist = res.data.data.conlist
          // 项目部成员
          this.person = res.data.data.person
          // 班主成员
          this.allocs = res.data.data.allocs
          // 建设单位
          this.build = res.data.data.build
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
