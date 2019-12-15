<template>
    <div style="margin-bottom: 3.125rem">
      <div class="NavBar">
        <NavBar :titles="tit" ></NavBar>
      </div>
      <van-tabs v-model="active" swipeable class="tabs">
        <van-tab :title="titles[0]" class="tabs_">
          <van-cell title="申请人" :value="leaveperson.name" required class="leaveType" @click.native="leave_person"/>
          <van-cell title="申请部门" :value="perdept_" required class="leaveType" />
          <van-cell title="请假类型" :value="leaveType.name" required class="leaveType" @click.native="leave_Type"/>
          <div class="leavetime">请假时间</div>
          <!--时间选择-->
          <van-cell-group>
            <van-field
              required
              label="开始时间"
              :value="svalue"
              placeholder="请选择请假开始时间"
              @click.native="thisfocus(1)"
              disabled
            />
            <van-field
              required
              label="结束时间"
              :value="evalue"
              placeholder="请选择请假结束时间"
              @click.native="thisfocus(2)"
              disabled
            />
            <van-cell title="时间(小时)" :value="Alltime"/>
            <van-cell title="天数(天)" :value="Alltime_day"/>
            <van-field
              label="说明"
              required
              v-model="message"
              type="textarea"
              placeholder="请填写请假说明"
              autosize
              @blur="Lmessage"
            />
          </van-cell-group>
          <div class="fileup">
            <div>文件上传:</div>
            <van-uploader v-model="fileList" multiple :after-read="afterRead" @delete="del"/>
          </div>
          <div class="gitqingjia" @click="gitqingjia">提交</div>
        </van-tab>
        <van-tab :title="titles[1]" class="tabs_">
          <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="leavelist">
            <van-list
              v-model="loading_"
              :error.sync="error_"
              :finished="finished_"
              error-text="请求失败，点击重新加载"
              finished-text="加载完成"
              :offset="offset_"
              @load="onLoad"
            >
              <div class="myLeave" v-for="(item, index) in list" :key="index" :data-id ="item.id" @click="myLeave(item.id)">
                <div>
                  <div>
                    {{item.modename}},申请人:{{item.uname}},单号[{{item.sericnum}}]
                  </div>
                </div>
                <div>
                  <div v-html="item.nstatustext"></div>
                  <span>
                {{item.optdt}}
              </span>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
      <van-popup v-model="show" position="bottom" @click-overlay="clickoverlay">
        <!--时间-->
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          v-if="dateisshow"
          @confirm="confirm"
          @cancel="cancel"
        />
        <!--请加类型-->
        <van-picker
          show-toolbar
          title="请假类型"
          v-if="typeqingjia"
          :columns="columns"
          @cancel="onCancel"
          @confirm="onConfirm"
        />
      </van-popup>
      <Departmentpersonnel @chuandishow="chuandishow" @changedeparts_per="changedeparts_per" ref="resl"></Departmentpersonnel>
    </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Departmentpersonnel from '@/components/com/departmentpersonnel'
import {mysheet, uploadfile, addkqinfoqj, addkqinfoqjpost, systembaseusershow} from '../../../api/Api'
export default {
  name: 'Leave',
  components: {
    NavBar,
    Departmentpersonnel
  },
  data () {
    return {
      token: '',
      tit: '请假',
      titles: ['请假', '我的请假'],
      active: 0,
      show: false,
      leaveperson: {
        name: '请选择',
        id: ''
      },
      leaveType: {
        name: '请选择',
        id: ''
      },
      //  时间
      currentDate: new Date(),
      //  请假时间
      svalue: '',
      svalue_: '',
      evalue: '',
      evalue_: '',
      isenorst: 0,
      dateisshow: false,
      //  人员选择
      isdeptusershow: false,
      thisshow_: false,
      //  请假总时间
      Alltime: 0,
      Alltime_day: 0,
      //  我的请假
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 1,
      page_: 1,
      pagesize_: 15,
      list: [],
      clper: [],
      isscs: false,
      // 请假说明
      message: '',
      // 请假类型
      typeqingjia: false,
      columns: [],
      // 文件上传
      file: [],
      fileList: [],
      file_id: [],
      modenum: 'kqinfoqj',
      scrollTop: '',
      // 申请人部门
      perdept_: ''
    }
  },
  created () {
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    this.token = this.$store.state.token
    let params_ = {
      token: this.token,
      page: this.page_,
      pagesize: this.pagesize_,
      keyword: '',
      starttime: '',
      endtime: '',
      type: 1,
      modeid: '35'
    }
    mysheet(params_).then((res) => {
      if (res.data.code === 2000) {
        this.list = res.data.data.data.data
        if (this.list.length >= res.data.data.data.total) {
          this.finished_ = true
        }
      }
    })
    // 初始化请假数据
    addkqinfoqj({token: this.token, modenum: this.modenum}).then((res) => {
      if (res.data.code === 2000) {
        this.leaveperson.name = res.data.data.uname
        this.leaveperson.id = res.data.data.uid
        this.perdept_ = res.data.data.deptname
        for (var i = 0; i < res.data.data.qjkindtype.length; i++) {
          this.columns.push(
            {
              text: res.data.data.qjkindtype[i].name,
              value: res.data.data.qjkindtype[i].id
            }
          )
        }
      }
    })
  },
  methods: {
    // 获取人员
    leave_person () {
      // this.show = true
      // this.dateisshow = false
      // this.isdeptusershow = true
      this.thisshow_ = true
      this.$refs.resl.childMethod(this.thisshow_, this.token, 2)
    },
    perdept () {
      systembaseusershow({token: this.token, id: this.leaveperson.id}).then((res) => {
        if (res.data.code === 2000) {
          this.perdept_ = res.data.data.data.deptname
        }
      })
    },
    chuandishow () {
      this.thisshow_ = false
    },
    changedeparts_per (object) {
      this.leaveperson.name = object[0].realname
      this.leaveperson.id = object[0].id
      this.perdept()
    },
    leave_Type () {
      this.show = true
      this.dateisshow = false
      this.isdeptusershow = false
      this.typeqingjia = true
    },
    thisfocus (e) {
      this.isenorst = e
      this.show = true
      this.dateisshow = true
    },
    clickoverlay () {
      this.show = false
      this.dateisshow = false
      this.isdeptusershow = false
    },
    //  获取时间
    confirm (value) {
      var year = value.getFullYear()
      var mon = value.getMonth() + 1
      if (mon < 10) {
        mon = `0${mon}`
      }
      var day = value.getDate()
      if (day < 10) {
        day = `0${day}`
      }
      var ho = value.getHours()
      if (ho < 10) {
        ho = `0${ho}`
      }
      var mins = value.getMinutes()
      if (mins < 10) {
        mins = `0${mins}`
      }
      var str = `${year}-${mon}-${day}  ${ho}:${mins}`
      var time = value.getTime()
      if (this.isenorst === 1) {
        this.svalue = str
        this.show = false
        this.dateisshow = false
        this.isdeptusershow = false
        this.svalue_ = time
        if (this.svalue_ && this.evalue_) {
          if (this.evalue_ <= this.svalue_) {
            this.$toast('开始时间必须小于结束时间')
            this.svalue = ''
            this.svalue_ = ''
          } else {
            var hou = (this.evalue_ - this.svalue_) / 3600000
            this.Alltime = hou.toFixed(2)
            this.Alltime_day = (this.Alltime / 24).toFixed(2)
          }
        }
      } else if (this.isenorst === 2) {
        this.evalue = str
        this.show = false
        this.dateisshow = false
        this.isdeptusershow = false
        this.evalue_ = time
        if (this.svalue_ && this.evalue_) {
          if (this.evalue_ <= this.svalue_) {
            this.$toast('结束时间必须大于开始时间')
            this.evalue = ''
            this.evalue_ = ''
          } else {
            var hous = (this.evalue_ - this.svalue_) / 3600000
            this.Alltime = hous.toFixed(2)
            this.Alltime_day = (this.Alltime / 24).toFixed(2)
          }
        }
      }
    },
    afterRead (file) {
      var fd = new FormData()
      if (file.length) {
        for (var i = 0; i < file.length; i++) {
          if (file[i].size > 1024 * 1024 * 50) {
            this.$toast('图片大小不能超过 50MB!')
            return false
          }
          fd.append('file[]', file[i].file)
          this.file.push(file[i])
        }
      } else {
        fd.append('file[]', file.file)
        this.file.push(file)
      }
      fd.append('token', this.token)
      uploadfile(fd).then((res) => {
        if (res.data.code === 2000) {
          var data = res.data.data
          for (var i = 0; i < data.length; i++) {
            if (data[i].error === 0) {
              this.file_id.push(data[i].id)
            } else if (data[i].error === 1) {
              this.$toast('上传失败')
              this.file_id = []
            } else if (data[i].error === 2) {
              this.$toast('容量已满')
              this.file_id = []
            }
          }
        }
      })
    },
    del (file) {
      var i = this.file.indexOf(file)
      this.file.splice(i, 1)
      this.file_id.splice(i, 1)
    },
    thisblur () {
    },
    cancel () {
      this.dateisshow = false
      this.show = false
    },
    // 请假提交
    gitqingjia () {
      if (!this.leaveperson.id) {
        this.$toast('请选择申请人')
        return false
      } else if (!this.leaveType.id) {
        this.$toast('请选择请假类型')
        return false
      } else if (!this.svalue) {
        this.$toast('请选择请假开始时间')
        return false
      } else if (!this.evalue) {
        this.$toast('请选择请假结束时间')
        return false
      } else if (!this.message) {
        this.$toast('请填写说明')
        return false
      }
      let param = {
        token: this.token,
        modenum: this.modenum,
        uid: this.leaveperson.id,
        uname: this.leaveperson.name,
        stime: this.svalue,
        etime: this.evalue,
        totals: this.Alltime,
        totday: this.Alltime_day,
        qjkind: this.leaveType.name,
        explain: this.message,
        isturn: 1,
        file: this.file_id,
        cho_checkid: '',
        cho_checkname: ''
      }
      addkqinfoqjpost(param).then((res) => {
        if (res.data.code === 2000) {
          this.$toast('提交成功！')
          setTimeout(() => {
            this.$router.go(0)
          }, 500)
        }
      })
    },
    Lmessage (e) {
      this.message = e.path[0].value
    },
    // 请假类型
    onCancel () {
      this.typeqingjia = false
      this.show = false
    },
    onConfirm (value) {
      this.leaveType.name = value.text
      this.leaveType.id = value.value
      this.typeqingjia = false
      this.show = false
    },
    //  下拉刷新
    onRefresh () {
      if (this.active === 1) {
        let params_ = {
          token: this.token,
          page: 1,
          pagesize: 15,
          keyword: '',
          starttime: '',
          endtime: '',
          type: 1,
          modeid: '35'
        }
        mysheet(params_).then((res) => {
          this.page_ = 1
          this.list = []
          this.finished_ = false
          if (res.data.code === 2000) {
            this.list = res.data.data.data.data
            this.$toast('刷新成功')
            this.isLoading_ = false
            if (this.list.length >= res.data.data.data.total) {
              this.finished_ = true
            }
          }
        })
      }
    },
    //  底部刷新
    onLoad () {
      if (this.active === 1) {
        this.page_ = this.page_ + 1
        let params_ = {
          token: this.token,
          page: this.page_,
          pagesize: this.pagesize_,
          keyword: '',
          starttime: '',
          endtime: '',
          type: 1,
          modeid: '35'
        }
        mysheet(params_).then((res) => {
          if (res.data.code === 2000) {
            this.list = [...this.list, ...res.data.data.data.data]
            this.loading_ = false
            if (this.list.length >= res.data.data.data.total) {
              this.finished_ = true
            }
          }
        })
      }
    },
    // 请假详情
    myLeave (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/kqinfoqjdetails',
        query: {
          id: id,
          modenum: that.modenum,
          tit: '请假'
        }
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'Work' || to.name === 'Home') {
      from.meta.keepAlive = false
    } else {
      from.meta.keepAlive = true
    }
    next()
  },
  activated () {
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    document.documentElement.scrollTop = this.scrollTop
    document.body.scrollTop = this.scrollTop
  },
  deactivated () {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }
}
</script>

<style scoped>
.tabs{
  margin-top: 2.95rem;
}
/*.leaveType{*/
  /*border-bottom: 1px solid #ededed;*/
/*}*/
.tabs_{
  background-color: #ededed;
}
  .leavetime{
    padding: 0.2rem 0.5rem;
    font-size: 0.6rem;
    color: #26b4d8;
  }
.myLeave{
  padding: 0.5rem 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
  background-color: #fff;
}
.myLeave>div:first-child{
  width: 100%;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.myLeave>div:last-child{
  width: 100%;
  font-size: 0.5rem;
  color: #d1d1d1;
  margin-top: 0.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.myLeave>div:first-child>div{
  width: 100%;
  font-size: 0.8rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.myLeave>div:last-child>span:last-child{
  font-size: 0.4rem;
  color:  #75c2ea;
}
.cl{
  color: blue;
}
  .leavelist{
    background-color: #fff;
    margin-bottom: 3.12rem;
  }
.fileup{
  width: 95%;
  margin: 0 auto;
  padding: 2.5%;
  background-color: #fff;
}
.fileup>div:first-child{
  font-size: 0.9rem;
  padding: 0.5rem 0;
}
  .gitqingjia{
    width: 100%;
    margin: 0 auto;
    border-radius: 0.5rem;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    color: white;
    background-color: #50cced;
  }
</style>
