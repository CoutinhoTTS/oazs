<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit">
      </NavBar>
    </div>
    <div style="margin-top: 2.875rem;margin-bottom: 3.125rem">
      <h5>基本信息:</h5>
      <van-cell-group>
        <van-field
          v-model="name"
          label="填报人:"
          required
          disabled
        />
        <van-field
          v-model="adddt"
          required
          label="填报日期:"
          placeholder=""
          disabled
        />
        <van-field
          v-model="object"
          label="所属项目:"
          placeholder="选择项目"
          required
          disabled
          @click.native="changeobject"
        />
        <van-field
          v-model="chsosong"
          label="抄送给谁:"
          placeholder="选择人员"
          disabled
          @click.native="bumenxuanze"
        />
        <van-field
          v-model="checkdt"
          label="日志时间:"
          placeholder="请填写日志时间"
          clearable
          disabled
          @click.native="timechange"
        />
        <van-field
          v-model="turnwork"
          label="出勤人数:"
          placeholder="请填写出勤人数"
          required
          clearable
          :error-message = "errormessage_"
        />
        <van-field
          v-model="rature"
          label="温度(℃):"
          placeholder="请填写温度"
          clearable
          :error-message = "errormessage"
        />
        <van-field
          v-model="position"
          label="施工部位:"
          placeholder="请填写施工部位"
          clearable
          required
        />
        <van-field
          v-model="deptname"
          label="施工部门:"
          placeholder="请填写施工部门"
          clearable
          required
        />
        <van-field
          v-model="safety_day"
          label="施工安全情况:"
          type="textarea"
          placeholder="请输入施工安全情况"
          rows="1"
          clearable
          autosize
        />
        <van-field
          v-model="safety_educa"
          label="安全教育情况:"
          type="textarea"
          placeholder="请输入安全教育情况"
          rows="1"
          clearable
          autosize
        />
        <van-field
          v-model="safety_disc"
          label="安全交底:"
          type="textarea"
          placeholder="请输入安全交底"
          rows="1"
          clearable
          autosize
        />
        <van-field
          v-model="check_accept"
          label="验收情况记录:"
          type="textarea"
          placeholder="请输入验收情况记录"
          rows="1"
          clearable
          autosize
        />
        <van-field
          v-model="safety_inspec"
          label="安全检查情况:"
          type="textarea"
          placeholder="请输入安全检查情况"
          rows="1"
          clearable
          autosize
        />
        <van-field
          v-model="safety_meet"
          label="安全会议记录:"
          type="textarea"
          placeholder="请输入安全会议记录"
          rows="1"
          clearable
          autosize
        />
        <van-field
          v-model="other"
          label="其他:"
          type="textarea"
          placeholder="请输入其他情况"
          rows="1"
          clearable
          autosize
        />
      </van-cell-group>
      <div class="fileup">
        <div>文件上传:</div>
        <van-uploader v-model="fileList" multiple accept :after-read="afterRead" @delete="del"/>
      </div>
    </div>
    <div class="gitup" @click="addobjectall">
      提交
    </div>
    <!--项目选择-->
    <div v-show="show" class="objchanggeshow">
      <div @click="closeshow"></div>
      <objectchange :token="token" @objectchanges="objectchanges"></objectchange>
    </div>
    <!--人员选择-->
    <departmentpersonnel ref="resl" @changedeparts_per="changedeparts_per"></departmentpersonnel>
    <!--加载-->
    <div class="jindu" v-show="loding">
      <div >
        <van-loading type="spinner" color="#1989fa" />
      </div>
    </div>
    <!--时间-->
    <van-popup
      v-model="timeshow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="OnConfirm"
        @cancel="OnCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import {addenginsafety, uploadfile, addenginsafetypost} from '../../api/Api'
import NavBar from '@/components/navbar/NavBar'
import objectchange from '@/components/com/objectchange'
import departmentpersonnel from '@/components/com/departmentpersonnel'
export default {
  name: 'Addprogress',
  components: {
    NavBar,
    objectchange,
    departmentpersonnel
  },
  data () {
    return {
      currentDate: new Date(),
      timeshow: false,
      modenum: '',
      token: '',
      show: false,
      thisshow_: false,
      tit: '施工日志',
      previewimage: true,
      name: '',
      adddt: '',
      object: '',
      objectid: '',
      chsosong: '',
      chsosongid: '',
      objectname: '',
      // 日志
      checkdt: '',
      // 出勤人数
      turnwork: '',
      // 温度
      rature: '',
      // 施工部位
      position: '',
      // 施工部门
      deptname: '',
      // 安全施工情况
      safety_day: '',
      // 安全教育情况
      safety_educa: '',
      // 安全交底
      safety_disc: '',
      // 验收情况记录
      check_accept: '',
      // 安全检查情况
      safety_inspec: '',
      // 安全会议记录
      safety_meet: '',
      // 其他
      other: '',
      fileList: [],
      lists_per: [],
      file: [],
      file_id: [],
      loding: false,
      errormessage: '',
      errormessage_: ''
      // reg: /^(\-|\+)?\d+(\.\d+)?$/
      // accept: 'image/gif, image/jpeg, image/jpg, image/png, image/bmp, image/tif, image/tiff, excel/xlsx '
    }
  },
  created () {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', false)
    this.token = this.$store.state.token
    this.modenum = this.$route.query.modenum
    let params = {token: this.token, modenum: this.modenum}
    addenginsafety(params).then((res) => {
      if (res.data.code === 2000) {
        this.name = res.data.data.realname
        this.adddt = res.data.data.applydt
      }
    })
  },
  methods: {
    showprop () {},
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
    changeobject () {
      this.show = true
    },
    closeshow () {
      this.show = false
    },
    objectchanges (item) {
      this.show = false
      this.object = item.name
      this.objectid = item.id
    },
    // 部门选择
    bumenxuanze () {
      this.thisshow_ = true
      this.$refs.resl.childMethod(this.thisshow_, this.token, 0)
    },
    chuandishow () {
      this.thisshow_ = false
    },
    changedeparts_per (objects) {
      this.thisshow_ = false
      this.lists_per = objects
      var arrs = []
      var arrsid = []
      for (var i = 0; i < this.lists_per.length; i++) {
        if (this.lists_per[i].realname) {
          arrs.push(this.lists_per[i].realname)
          arrsid.push(`u${this.lists_per[i].id}`)
        } else if (this.lists_per[i].name) {
          arrs.push(this.lists_per[i].name)
          arrsid.push(`d${this.lists_per[i].id}`)
        }
      }
      this.chsosong = arrs.join(',')
      this.chsosongid = arrsid.join(',')
    },
    // 时间选择
    timechange () {
      this.timeshow = true
    },
    // 时间确认
    OnConfirm (value) {
      var year = value.getFullYear()
      var mon = value.getMonth() + 1
      if (mon < 10) {
        mon = `0${mon}`
      }
      var day = value.getDate()
      if (day < 10) {
        day = `0${day}`
      }
      this.checkdt = `${year}-${mon}-${day}`
      this.timeshow = false
    },
    // 关闭
    OnCancel () {
      this.timeshow = false
    },
    // 温度正则验证
    // OnbBlur () {
    //   if (!this.reg.test(this.rature)) {
    //     this.errormessage = '请输入正确格式'
    //   } else {
    //     this.errormessage = ''
    //   }
    // },
    OnbBlur_ () {
      var reg = /^[+]{0,1}(\d+)$/
      if (!reg.test(this.turnwork)) {
        this.errormessage_ = '请输入正确格式'
      } else {
        this.errormessage_ = ''
      }
    },
    addobjectall () {
      if (!this.objectid) {
        this.$toast('请选择项目')
        return false
      }
      if (!this.turnwork) {
        this.$toast('请填写出勤人数')
        return false
      }
      if (!this.position) {
        this.$toast('请填写施工部位')
        return false
      }
      if (!this.deptname) {
        this.$toast('请填写施工部门')
        return false
      }
      this.loding = true
      let param = {
        token: this.token,
        modenum: this.modenum,
        enginid: this.objectid,
        copyid: this.chsosongid,
        copyname: this.chsosong,
        isturn: 1,
        file: this.file_id,
        cho_checkid: '',
        cho_checkname: '',
        // 日志时间
        checkdt: this.checkdt,
        // 出勤人数
        turnwork: this.turnwork,
        // 温度
        rature: this.rature,
        // 施工部位
        position: this.position,
        // 施工部门
        deptname: this.deptname,
        // 安全施工情况
        safety_day: this.safety_day,
        // 安全教育
        safety_educa: this.safety_educa,
        // 安全交底
        safety_disc: this.safety_disc,
        // 验收情况记录
        check_accept: this.check_accept,
        // 安全检查记录
        safety_inspec: this.safety_inspec,
        // 安全会议记录
        safety_meet: this.safety_meet,
        other: this.other,
        type: 'seclog'
      }
      addenginsafetypost(param).then((res) => {
        if (res.data.code === 2000) {
          this.loding = false
          this.$toast('添加成功')
          setTimeout(() => {
            this.$router.go(0)
          }, 500)
        }
      })
    }
  }
}
</script>

<style scoped>
  .head-img{
    width: 5rem;
    height: 5rem;
    border: 0.065rem solid black;
  }
  .fileup{
    width: 95%;
    margin: 0 auto;
  }
  .fileup>div:first-child{
    font-size: 0.9rem;
    padding: 0.5rem 0;
  }
  h5{
    margin: 0;
    padding: 0.5rem ;
  }
  .addqingdan{
    width: 100%;
    text-align: center;
    font-size: 0.9rem;
    color: #2bb1ff;
  }
  .addqingdan_{
    width: 100%;
    text-align: center;
    font-size: 0.9rem;
    color: red;
  }
  .migxis{
    padding: 1rem 0.5rem 0.1rem;
    margin: 0.3rem;
    background-color: rgba(179, 238, 255, 0.6);
    border-radius: 0.5rem;
  }
  .gitup{
    width: 100%;
    text-align: center;
    height: 2.5rem;
    line-height: 2.5rem;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #26b4d8;
    color: white;
    z-index: 200;
  }
  .objchanggeshow{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 300;
    background-color: rgba(75, 75, 75, 0.62);
  }
  .objchanggeshow>div:first-child{
    width: 100%;
    height: 100%;
  }
  .objchanggeshow>div:last-child{
    height: 50vh;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;
  }
  .jindu{
    width: 100vw;
    height: 100vh;
    background-color: rgba(78, 78, 78, 0.27);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
  .jindu>div{
    width: 5rem;
    height: 5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>
