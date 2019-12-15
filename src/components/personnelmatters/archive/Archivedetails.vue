<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="datails_pull">
      <van-tabs v-model="active" swipeable :sticky="issticky" :offset-top="isoffsettop">
        <van-tab title="人员信息">
          <h5>基本信息</h5>
          <div class="datailsList">
            <!--基本信息-->
            <div><div>姓名:</div><div>{{list.realname}}</div></div>
            <div class="imgs_"><div>照片:</div><div><img class="imgs" v-for="(img, index) in imageList" v-lazy="img" :key="index"></div></div>
            <div><div>部门:</div><div>{{list.deptname}}</div></div>
            <div><div>职位:</div><div>{{list.ranking}}</div></div>
            <div><div>职称:</div><div>{{list.level}}</div></div>
          </div>
          <h5>人员状态</h5>
          <div class="datailsList">
            <!--人员状态-->
            <div><div>人员状态:</div><div>{{list.state}}</div></div>
            <div><div>入职日期:</div><div>{{list.workdate}}</div></div>
            <div><div>试用期到:</div><div>{{list.syenddt}}</div></div>
            <div><div>转正日期:</div><div>{{list.positivedt}}</div></div>
            <div><div>试用工资:</div><div>{{list.ontrial}}</div></div>
            <div><div>正式工资:</div><div>{{list.becomefull}}</div></div>
            <div><div>所属单位:</div><div>{{list.comname}}</div></div>
            <div><div>离职日期:</div><div>{{list.quitdt}}</div></div>
          </div>
          <h5>个人信息</h5>
          <div class="datailsList">
            <!--个人信息-->
            <div><div>学历:</div><div>{{list.xueli}}</div></div>
            <div><div>民族:</div><div>{{list.minzu}}</div></div>
            <div><div>生日:</div><div>{{list.birthday}}</div></div>
            <div><div>籍贯:</div><div>{{list.jiguan}}</div></div>
            <div><div>婚姻:</div><div>{{list.hunyin}}</div></div>
            <div><div>现居地址:</div><div>{{list.nowdizhi}}</div></div>
            <div><div>家庭住址:</div><div>{{list.housedizhi}}</div></div>
          </div>
          <h5>联系方式</h5>
          <div class="datailsList">
            <!--联系方式-->
            <div><div>电话:</div><div>{{list.tel}}</div></div>
            <div><div>手机号:</div><div>{{list.mobile}}</div></div>
            <div><div>邮箱:</div><div>{{list.email}}</div></div>
            <div><div>备用联系人:</div><div>{{list.spareman}}</div></div>
            <div><div>备用联系人电话:</div><div>{{list.sparetel}}</div></div>
          </div>
          <h5>工资卡信息</h5>
          <div class="datailsList">
            <!--联系方式-->
            <div><div>开户行:</div><div>{{list.bankname}}</div></div>
            <div><div>工资卡账号:</div><div>{{list.banknum}}</div></div>
          </div>
        </van-tab>
        <van-tab title="工作经历">
          <div class="conlists">
            <div v-for="(item, index) in mon" :key="index">
              <div>
                <div><span>单位名称:</span><span>{{item.unitname}}</span></div>
              </div>
              <div>
                <div><span>开始日期:</span><span>{{item.startdt}}</span></div>
              </div>
              <div>
                <div><span>截止日期:</span><span>{{item.enddt}}</span></div>
              </div>
              <div>
                <div><span>职位:</span><span>{{item.rank}}</span></div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="教育经历">
          <div class="conlists">
            <div v-for="(item, index) in conlist" :key="index">
              <div>
                <div><span>学校名称:</span><span>{{item.unitname}}</span></div>
              </div>
              <div>
                <div><span>开始日期:</span><span>{{item.startdt}}</span></div>
              </div>
              <div>
                <div><span>截止日期:</span><span>{{item.enddt}}</span></div>
              </div>
              <div>
                <div><span>专业:</span><span>{{item.rank}}</span></div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="员工合同">
          <div class="conlists">
            <div v-for="(item, index) in personcart" :key="index">
              <div>
                <div><span>签署人:</span><span>{{item.uname}}</span></div>
              </div>
              <div>
                <div><span>合同名称:</span><span>{{item.name}}</span></div>
              </div>
              <div>
                <div><span>签署单位:</span><span>{{item.company}}</span></div>
              </div>
              <div>
                <div><span>合同类型:</span><span>{{item.httype}}</span></div>
              </div>
              <div>
                <div><span>开始日期:</span><span>{{item.startdt}}</span></div>
              </div>
              <div>
                <div><span>截止日期:</span><span>{{item.enddt}}</span></div>
              </div>
              <div>
                <div><span>状态:</span><span>{{item.state_name}}</span></div>
              </div>
              <div>
                <div><span>提取终止日:</span><span>{{item.tqenddt}}</span></div>
              </div>
              <div>
                <div><span>说明:</span><span>{{item.explain}}</span></div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="转正申请">
          <div class="conlists">
            <div v-for="(item, index) in hrpositivelist" :key="index">
              <div>
                <div><span>申请日期:</span><span>{{item.applydt}}</span></div>
              </div>
              <div>
                <div><span>职位:</span><span>{{item.ranking}}</span></div>
              </div>
              <div>
                <div><span>入职日期:</span><span>{{item.entrydt}}</span></div>
              </div>
              <div>
                <div><span>试用到期日:</span><span>{{item.redundtype}}</span></div>
              </div>
              <div>
                <div><span>转正日期:</span><span>{{item.quitdt}}</span></div>
              </div>
              <div>
                <div><span>申请说明:</span><span>{{item.redundreson}}</span></div>
              </div>
              <div>
                <div><span>状态:</span> <span v-html="item.status_name"></span></div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="离职申请">
          <div class="conlists">
            <div v-for="(item, index) in allocs" :key="index">
              <div>
                <div><span>职位:</span><span>{{item.ranking}}</span></div>
              </div>
              <div>
                <div><span>申请日期:</span><span>{{item.applydt}}</span></div>
              </div>
              <div>
                <div><span>入职日期:</span><span>{{item.entrydt}}</span></div>
              </div>
              <div>
                <div><span>离职类型:</span><span>{{item.redundtype}}</span></div>
              </div>
              <div>
                <div><span>离职日期:</span><span>{{item.quitdt}}</span></div>
              </div>
              <div>
                <div><span>离职原因:</span><span>{{item.redundreson}}</span></div>
              </div>
              <div>
                <div><span>说明:</span><span>{{item.explain}}</span></div>
              </div>
              <div>
                <div><span>状态:</span> <span v-html="item.status_name">
                </span></div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="调薪申请">
          <div class="conlists">
            <div v-for="(item, index) in hrtrsalarylist" :key="index">
              <div>
                <div><span>职位:</span><span>{{item.ranking}}</span></div>
              </div>
              <div>
                <div><span>申请日期:</span><span>{{item.applydt}}</span></div>
              </div>
              <div>
                <div><span>涨薪幅度:</span><span>{{item.floats}}</span></div>
              </div>
              <div>
                <div><span>生效日期:</span><span>{{item.effectivedt}}</span></div>
              </div>
              <div>
                <div><span>说明:</span><span>{{item.explain}}</span></div>
              </div>
              <div>
                <div><span>状态:</span> <span v-html="item.status_name">
                </span></div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="人事调动">
          <div class="conlists">
            <div v-for="(item, index) in hrtransferlist" :key="index">
              <div>
                <div><span>要调动人:</span><span>{{item.tranname}}</span></div>
                <div><span>调动类型:</span><span>{{item.trantype}}</span></div>
              </div>
              <div>
                <div><span>原来部门:</span><span>{{item.olddeptname}}</span></div>
                <div><span>原来职位:</span><span>{{item.oldranking}}</span></div>
              </div>
              <div>
                <div><span>调动后部门:</span><span>{{item.newdeptname}}</span></div>
                <div><span>调动后职位:</span><span>{{item.newranking}}</span></div>
              </div>
              <div>
                <div><span>生效日期:</span><span>{{item.effectivedt}}</span></div>
              </div>
              <div>
                <div><span>说明:</span><span>{{item.explain}}</span></div>
              </div>
              <div>
                <div><span>状态:</span> <span v-html="item.status_name">
                </span></div>
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
import {archiveshow, userractlist, hrredundlist, hrpositivelist, hrtrsalarylist, hrtransferlist, getreadsandlog} from '../../../api/Api'
export default {
  name: 'Archivedetails',
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
      imageList: [
      ],
      //  工作经历
      mon: [],
      // 教育经历
      conlist: [],
      // 员工合同
      personcart: [],
      // 转正申请
      hrpositivelist: [],
      succs: false,
      list_sts: [],
      // 离职申请
      allocs: [],
      succ: false,
      list_st: [],
      // 调薪申请
      hrtrsalarylist: [],
      succss: false,
      list_stss: [],
      // 人事调动
      hrtransferlist: [],
      succsss: false,
      list_stsss: []
    }
  },
  created () {
    this.id = this.$route.query.id
    this.modenum = this.$route.query.modenum
    this.tit = `${this.$route.query.tit}详情`
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    // 人员信息
    let params = {
      token: this.token,
      id: this.id
    }
    archiveshow(params).then((res) => {
      if (res.data.code === 2000) {
        // console.log(res)
        this.list = res.data.data.data
        this.mon = res.data.data.work
        this.conlist = res.data.data.study
        this.imageList.push(`http://www.oazs.com/${res.data.data.data.zhaopian}`)
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
        // console.log(res)
        this.getreadsandlog = res.data.data
        this.$refs.getreadsandlog.datails_liu(this.getreadsandlog, this.modenum, this.id, this.token)
        this.isLoading_ = false
      }
    })
    // 员工合同
    let param = {
      token: this.token,
      page: 1,
      pagesize: 99,
      id: this.id
    }
    userractlist(param).then((res) => {
      if (res.data.code === 2000) {
        this.personcart = res.data.data.data.data
      }
    })
    // 转正申请
    let pa = {
      token: this.token,
      page: 1,
      pagesize: 99,
      id: this.id
    }
    hrpositivelist(pa).then((res) => {
      if (res.data.code === 2000) {
        // var len = this.hrpositivelist.length
        this.hrpositivelist = res.data.data.data.data
        // for (var i = len; i < this.hrpositivelist.length; i++) {
        //   if (this.hrpositivelist[i].status_name.indexOf('span') !== -1) {
        //     var arr = ((this.hrpositivelist[i].status_name || '').split('>')[1] || '').split('<')[0]
        //     this.list_sts.push({name: '', is: '', sta: ''})
        //     if ((this.hrpositivelist[i].status_name || '').split('>').length === 5) {
        //       this.list_sts[i].name = ((this.hrpositivelist[i].status_name || '').split('>')[2] || '').split('<')[0]
        //       this.list_sts[i].is = 2
        //     } else {
        //       if ((this.hrpositivelist[i].status_name || '').split('>')[2]) {
        //         this.list_sts[i].name = arr
        //         this.list_sts[i].is = 0
        //         this.list_sts[i].sta = (this.list[i].status_name || '').split('>')[(this.hrpositivelist[i].status_name || '').split('>').length - 1]
        //       } else {
        //         this.list_sts[i].name = arr
        //         this.list_sts[i].is = 1
        //       }
        //     }
        //   } else {
        //     this.list_sts.push({name: this.hrpositivelist[i].status_name, is: 0})
        //   }
        //   this.succs = true
        // }
      }
    })
    // 离职申请
    let param_ = {
      token: this.token,
      page: 1,
      pagesize: 99,
      id: this.id
    }
    hrredundlist(param_).then((res) => {
      if (res.data.code === 2000) {
        // var len = this.allocs.length
        this.allocs = res.data.data.data.data
        // for (var i = len; i < this.allocs.length; i++) {
        //   if (this.allocs[i].status_name.indexOf('span') !== -1) {
        //     var arr = ((this.allocs[i].status_name || '').split('>')[1] || '').split('<')[0]
        //     this.list_st.push({name: '', is: '', sta: ''})
        //     if ((this.allocs[i].status_name || '').split('>').length === 5) {
        //       this.list_st[i].name = ((this.allocs[i].status_name || '').split('>')[2] || '').split('<')[0]
        //       this.list_st[i].is = 2
        //     } else {
        //       if ((this.allocs[i].status_name || '').split('>')[2]) {
        //         this.list_st[i].name = arr
        //         this.list_st[i].is = 0
        //         this.list_st[i].sta = (this.list[i].status_name || '').split('>')[(this.allocs[i].status_name || '').split('>').length - 1]
        //       } else {
        //         this.list_st[i].name = arr
        //         this.list_st[i].is = 1
        //       }
        //     }
        //   } else {
        //     this.list_st.push({name: this.allocs[i].status_name, is: 0})
        //   }
        //   this.succ = true
        // }
      }
    })
    //  调薪
    let par = {
      token: this.token,
      page: 1,
      pagesize: 99,
      id: this.id
    }
    hrtrsalarylist(par).then((res) => {
      if (res.data.code === 2000) {
        // var len = this.hrtrsalarylist.length
        this.hrtrsalarylist = res.data.data.data.data
        // for (var i = len; i < this.hrtrsalarylist.length; i++) {
        //   if (this.hrtrsalarylist[i].status_name.indexOf('span') !== -1) {
        //     var arr = ((this.hrtrsalarylist[i].status_name || '').split('>')[1] || '').split('<')[0]
        //     this.list_stss.push({name: '', is: '', sta: ''})
        //     if ((this.hrtrsalarylist[i].status_name || '').split('>').length === 5) {
        //       this.list_stss[i].name = ((this.hrtrsalarylist[i].status_name || '').split('>')[2] || '').split('<')[0]
        //       this.list_stss[i].is = 2
        //     } else {
        //       if ((this.hrtrsalarylist[i].status_name || '').split('>')[2]) {
        //         this.list_stss[i].name = arr
        //         this.list_stss[i].is = 0
        //         this.list_stss[i].sta = (this.list[i].status_name || '').split('>')[(this.hrtrsalarylist[i].status_name || '').split('>').length - 1]
        //       } else {
        //         this.list_stss[i].name = arr
        //         this.list_stss[i].is = 1
        //       }
        //     }
        //   } else {
        //     this.list_stss.push({name: this.hrtrsalarylist[i].status_name, is: 0})
        //   }
        //   this.succss = true
        // }
      }
    })
    // 人事调动
    let parm = {
      token: this.token,
      page: 1,
      pagesize: 99,
      id: this.id
    }
    hrtransferlist(parm).then((res) => {
      if (res.data.code === 2000) {
        // var len = this.hrtransferlist.length
        this.hrtransferlist = res.data.data.data.data
        // for (var i = len; i < this.hrtransferlist.length; i++) {
        //   if (this.hrtransferlist[i].status_name.indexOf('span') !== -1) {
        //     var arr = ((this.hrtransferlist[i].status_name || '').split('>')[1] || '').split('<')[0]
        //     this.list_stsss.push({name: '', is: '', sta: ''})
        //     if ((this.hrtransferlist[i].status_name || '').split('>').length === 5) {
        //       this.list_stsss[i].name = ((this.hrtransferlist[i].status_name || '').split('>')[2] || '').split('<')[0]
        //       this.list_stsss[i].is = 2
        //     } else {
        //       if ((this.hrtransferlist[i].status_name || '').split('>')[2]) {
        //         this.list_stsss[i].name = arr
        //         this.list_stsss[i].is = 0
        //         this.list_stsss[i].sta = (this.list[i].status_name || '').split('>')[(this.hrtransferlist[i].status_name || '').split('>').length - 1]
        //       } else {
        //         this.list_stsss[i].name = arr
        //         this.list_stsss[i].is = 1
        //       }
        //     }
        //   } else {
        //     this.list_stsss.push({name: this.hrtransferlist[i].status_name, is: 0})
        //   }
        //   this.succsss = true
        // }
      }
    })
  },
  methods: {
    onRefresh () {
      // 人员信息
      let params = {
        token: this.token,
        id: this.id
      }
      archiveshow(params).then((res) => {
        if (res.data.code === 2000) {
          // console.log(res)
          this.list = res.data.data.data
          this.mon = res.data.data.work
          this.conlist = res.data.data.study
          this.imageList.push(`http://www.oazs.com/${res.data.data.data.zhaopian}`)
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
          // console.log(res)
          this.getreadsandlog = res.data.data
          this.$refs.getreadsandlog.datails_liu(this.getreadsandlog, this.modenum, this.id, this.token)
          this.isLoading_ = false
        }
      })
      // 员工合同
      let param = {
        token: this.token,
        page: 1,
        pagesize: 99,
        id: this.id
      }
      userractlist(param).then((res) => {
        if (res.data.code === 2000) {
          this.personcart = res.data.data.data.data
        }
      })
      // 转正申请
      let pa = {
        token: this.token,
        page: 1,
        pagesize: 99,
        id: this.id
      }
      hrpositivelist(pa).then((res) => {
        if (res.data.code === 2000) {
          // var len = this.hrpositivelist.length
          this.hrpositivelist = res.data.data.data.data
          // for (var i = len; i < this.hrpositivelist.length; i++) {
          //   if (this.hrpositivelist[i].status_name.indexOf('span') !== -1) {
          //     var arr = ((this.hrpositivelist[i].status_name || '').split('>')[1] || '').split('<')[0]
          //     this.list_sts.push({name: '', is: '', sta: ''})
          //     if ((this.hrpositivelist[i].status_name || '').split('>').length === 5) {
          //       this.list_sts[i].name = ((this.hrpositivelist[i].status_name || '').split('>')[2] || '').split('<')[0]
          //       this.list_sts[i].is = 2
          //     } else {
          //       if ((this.hrpositivelist[i].status_name || '').split('>')[2]) {
          //         this.list_sts[i].name = arr
          //         this.list_sts[i].is = 0
          //         this.list_sts[i].sta = (this.list[i].status_name || '').split('>')[(this.hrpositivelist[i].status_name || '').split('>').length - 1]
          //       } else {
          //         this.list_sts[i].name = arr
          //         this.list_sts[i].is = 1
          //       }
          //     }
          //   } else {
          //     this.list_sts.push({name: this.hrpositivelist[i].status_name, is: 0})
          //   }
          //   this.succs = true
          // }
        }
      })
      // 离职申请
      let param_ = {
        token: this.token,
        page: 1,
        pagesize: 99,
        id: this.id
      }
      hrredundlist(param_).then((res) => {
        if (res.data.code === 2000) {
          // var len = this.allocs.length
          this.allocs = res.data.data.data.data
          // for (var i = len; i < this.allocs.length; i++) {
          //   if (this.allocs[i].status_name.indexOf('span') !== -1) {
          //     var arr = ((this.allocs[i].status_name || '').split('>')[1] || '').split('<')[0]
          //     this.list_st.push({name: '', is: '', sta: ''})
          //     if ((this.allocs[i].status_name || '').split('>').length === 5) {
          //       this.list_st[i].name = ((this.allocs[i].status_name || '').split('>')[2] || '').split('<')[0]
          //       this.list_st[i].is = 2
          //     } else {
          //       if ((this.allocs[i].status_name || '').split('>')[2]) {
          //         this.list_st[i].name = arr
          //         this.list_st[i].is = 0
          //         this.list_st[i].sta = (this.list[i].status_name || '').split('>')[(this.allocs[i].status_name || '').split('>').length - 1]
          //       } else {
          //         this.list_st[i].name = arr
          //         this.list_st[i].is = 1
          //       }
          //     }
          //   } else {
          //     this.list_st.push({name: this.allocs[i].status_name, is: 0})
          //   }
          //   this.succ = true
          // }
        }
      })
      //  调薪
      let par = {
        token: this.token,
        page: 1,
        pagesize: 99,
        id: this.id
      }
      hrtrsalarylist(par).then((res) => {
        if (res.data.code === 2000) {
          // var len = this.hrtrsalarylist.length
          this.hrtrsalarylist = res.data.data.data.data
          // for (var i = len; i < this.hrtrsalarylist.length; i++) {
          //   if (this.hrtrsalarylist[i].status_name.indexOf('span') !== -1) {
          //     var arr = ((this.hrtrsalarylist[i].status_name || '').split('>')[1] || '').split('<')[0]
          //     this.list_stss.push({name: '', is: '', sta: ''})
          //     if ((this.hrtrsalarylist[i].status_name || '').split('>').length === 5) {
          //       this.list_stss[i].name = ((this.hrtrsalarylist[i].status_name || '').split('>')[2] || '').split('<')[0]
          //       this.list_stss[i].is = 2
          //     } else {
          //       if ((this.hrtrsalarylist[i].status_name || '').split('>')[2]) {
          //         this.list_stss[i].name = arr
          //         this.list_stss[i].is = 0
          //         this.list_stss[i].sta = (this.list[i].status_name || '').split('>')[(this.hrtrsalarylist[i].status_name || '').split('>').length - 1]
          //       } else {
          //         this.list_stss[i].name = arr
          //         this.list_stss[i].is = 1
          //       }
          //     }
          //   } else {
          //     this.list_stss.push({name: this.hrtrsalarylist[i].status_name, is: 0})
          //   }
          //   this.succss = true
          // }
        }
      })
      // 人事调动
      let parm = {
        token: this.token,
        page: 1,
        pagesize: 99,
        id: this.id
      }
      hrtransferlist(parm).then((res) => {
        if (res.data.code === 2000) {
          // var len = this.hrtransferlist.length
          this.hrtransferlist = res.data.data.data.data
          // for (var i = len; i < this.hrtransferlist.length; i++) {
          //   if (this.hrtransferlist[i].status_name.indexOf('span') !== -1) {
          //     var arr = ((this.hrtransferlist[i].status_name || '').split('>')[1] || '').split('<')[0]
          //     this.list_stsss.push({name: '', is: '', sta: ''})
          //     if ((this.hrtransferlist[i].status_name || '').split('>').length === 5) {
          //       this.list_stsss[i].name = ((this.hrtransferlist[i].status_name || '').split('>')[2] || '').split('<')[0]
          //       this.list_stsss[i].is = 2
          //     } else {
          //       if ((this.hrtransferlist[i].status_name || '').split('>')[2]) {
          //         this.list_stsss[i].name = arr
          //         this.list_stsss[i].is = 0
          //         this.list_stsss[i].sta = (this.list[i].status_name || '').split('>')[(this.hrtransferlist[i].status_name || '').split('>').length - 1]
          //       } else {
          //         this.list_stsss[i].name = arr
          //         this.list_stsss[i].is = 1
          //       }
          //     }
          //   } else {
          //     this.list_stsss.push({name: this.hrtransferlist[i].status_name, is: 0})
          //   }
          //   this.succsss = true
          // }
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
  h5{
    padding: 0.3rem 1rem;
    background-color: #4e4e4e;
    color: white;
  }
</style>
