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
        v-model="objectname"
        label="填报名称:"
        placeholder="请填写填报名称"
        required
        clearable
      />
      <van-field
        v-model="message"
        label="备注:"
        type="textarea"
        placeholder="请输入备注"
        rows="1"
        clearable
        autosize
      />
    </van-cell-group>
    <div class="fileup">
      <div>文件上传:</div>
      <van-uploader v-model="fileList" multiple accept :after-read="afterRead" @delete="del"/>
    </div>
    <h5>进度填报明细:</h5>
    <div class="migxis" v-for="(item, index) in list" :key="index">
      <van-cell-group>
        <van-field
          v-model="item.num"
          required
          clearable
          label="编号:"
          placeholder="请输入编号"
        />
        <van-field
          v-model="item.bill"
          label="工程量清单:"
          clearable
          placeholder="请输入工程量清单"
          required
        />
        <van-field
          v-model="item.unit"
          label="单位:"
          clearable
          placeholder="请输入单位"
          required
        />
        <van-field
          v-model="item.quantities"
          label="工程量:"
          clearable
          placeholder="请输入工程量"
          required
        />
        <van-field
          v-model="item.price"
          label="综合单价(元):"
          clearable
          placeholder="请输入综合单价"
          error-message=""
          required
        />
        <van-field
          v-model="item.allprice"
          label="合价(元):"
          clearable
          placeholder="请输入合价"
          error-message=""
        />
        <van-field
          v-model="item.completion"
          label="完工量:"
          clearable
          placeholder="请输入完工量"
          required
        />
        <van-field
          v-model="item.subtotal"
          clearable
          label="小计:"
          placeholder="请输入小计"
        />
      </van-cell-group>
      <div v-if="index === 0" @click="addqingdan" class="addqingdan">增加</div>
      <div v-else @click="delqingdan" class="addqingdan_">删除</div>
    </div>
  </div>
  <div class="gitup" @click="addobjectall">
    提交
  </div>
  <!--选择项目-->
  <div v-show="show" class="objchanggeshow">
    <div @click="closeshow"></div>
    <objectchange :token="token" @objectchanges="objectchanges"></objectchange>
  </div>
  <!--选择人员-->
  <departmentpersonnel ref="resl" @changedeparts_per="changedeparts_per"></departmentpersonnel>
  <!--提交加载-->
  <div class="jindu" v-show="loding">
    <div >
      <van-loading type="spinner" color="#1989fa" />
    </div>
  </div>
</div>
</template>

<script>
import {addenginspeed, uploadfile, addenginspeedpost} from '../../api/Api'
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
      modenum: '',
      token: '',
      show: false,
      thisshow_: false,
      tit: '进度填报',
      previewimage: true,
      name: '',
      adddt: '',
      object: '',
      objectid: '',
      chsosong: '',
      chsosongid: '',
      objectname: '',
      message: '',
      fileList: [],
      list: [],
      lists_per: [],
      file: [],
      file_id: [],
      loding: false
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
    this.list.push({
      num: '',
      bill: '',
      unit: '',
      quantities: '',
      price: '',
      allprice: '',
      completion: '',
      subtotal: ''
    })
    let params = {token: this.token, modenum: this.modenum}
    addenginspeed(params).then((res) => {
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
    addqingdan () {
      this.list.push({
        num: '',
        bill: '',
        unit: '',
        quantities: '',
        price: '',
        allprice: '',
        completion: '',
        subtotal: ''
      })
    },
    delqingdan () {
      this.list.splice(this.list.length - 1, 1)
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
    addobjectall () {
      if (!this.objectid) {
        this.$toast('请选择项目')
        return false
      }
      if (!this.objectname) {
        this.$toast('请填写填报名称')
        return false
      }
      for (var i = 0; i < this.list.length; i++) {
        if (!this.list[i].num && !this.list[i].bill && !this.list[i].unit && !this.list[i].quantities && !this.list[i].price && !this.list[i].completion) {
        } else {
          if (!this.list[i].num) {
            this.$toast('请填写编号')
            return false
          }
          if (!this.list[i].bill) {
            this.$toast('请填写工程量清单')
            return false
          }
          if (!this.list[i].unit) {
            this.$toast('请填写单位')
            return false
          }
          if (!this.list[i].quantities) {
            this.$toast('请填写工程量')
            return false
          }
          if (!this.list[i].price) {
            this.$toast('请填写综合单价')
            return false
          }
          if (!this.list[i].completion) {
            this.$toast('请填写完工量')
            return false
          }
        }
      }
      this.loding = true
      let param = {
        token: this.token,
        modenum: this.modenum,
        enginid: this.objectid,
        copyid: this.chsosongid,
        copyname: this.chsosong,
        name: this.objectname,
        explain: this.message,
        isturn: 1,
        file: this.file_id,
        list: this.list,
        cho_checkid: '',
        cho_checkname: ''
      }
      addenginspeedpost(param).then((res) => {
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
