<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" :barisshow="barisshow" @showprop="showprop">
      </NavBar>
    </div>
    <!--搜索-->
    <Search_ class="search" @thiskeyword="thiskeyword" ref="cleankeyword"></Search_>
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="list">
        <van-tabs v-model="active" swipeable :sticky="issticky">
          <van-tab :title="tithas">
            <van-list
              v-model="loading_"
              :error.sync="error_"
              :finished="finished_"
              error-text="请求失败，点击重新加载"
              finished-text="加载完成"
              :offset="offset_"
              @load="onLoad"
            >
              <div v-for="(item, index) in list" class="lists" :key="index" @click="engindetails(item.id)" >
                <div>
                  <div class="list_s">
                    <div><i class="fa fa-envelope-o"></i><span>主题：{{item.title}}</span></div>
                  </div>
                  <div class="list_s">
                    <div><span>发件人:</span><span>{{item.sendname}}</span></div>
                  </div>
                  <div class="list_s">
                    <div><span>发件时间:</span><span>{{item.senddt}}</span></div>
                  </div>
                </div>
              </div>
            </van-list>
          </van-tab>
          <van-tab :title="tithas_">
            <van-list
              v-model="loading"
              :error.sync="error"
              :finished="finished"
              error-text="请求失败，点击重新加载"
              finished-text="加载完成"
              :offset="offset"
              @load="onLoad_"
            >
              <div v-for="(item, index) in listshou" class="lists" :key="index" @click="engindetails(item.id)" >
                  <div>
                    <div class="list_s">
                      <div><i class="fa fa-envelope-o"></i><span>主题：{{item.title}}</span></div>
                    </div>
                    <div class="list_s">
                      <div><span>发件人:</span><span>{{item.sendname}}</span></div>
                    </div>
                    <div class="list_s">
                      <div><span>发件时间:</span><span>{{item.senddt}}</span></div>
                    </div>
                  </div>
              </div>
            </van-list>
          </van-tab>
          <van-tab :title="titsend">
            <van-list
              v-model="loading__"
              :error.sync="error__"
              :finished="finished__"
              error-text="请求失败，点击重新加载"
              finished-text="加载完成"
              :offset="offset__"
              @load="onLoad__"
            >
              <div v-for="(item, index) in listed" class="lists" :key="index" @click="engindetails(item.id)" >
                <div>
                    <div class="list_s">
                      <div><i class="fa fa-envelope-o"></i><span>主题：{{item.title}}</span></div>
                    </div>
                    <div class="list_s">
                      <div><span>发件人:</span><span>{{item.sendname}}</span></div>
                    </div>
                    <div class="list_s">
                      <div><span>发件时间:</span><span>{{item.senddt}}</span></div>
                    </div>
                  </div>
              </div>
            </van-list>
          </van-tab>
          <van-tab :title="titdel">
              <van-list
                v-model="loading___"
                :error.sync="error___"
                :finished="finished___"
                error-text="请求失败，点击重新加载"
                finished-text="加载完成"
                :offset="offset___"
                @load="onLoad___"
              >
                <div v-for="(item, index) in listdel" class="lists" :key="index" @click="engindetails(item.id)" >
                    <div>
                      <div class="list_s">
                        <div><i class="fa fa-envelope-o"></i><span>主题：{{item.title}}</span></div>
                      </div>
                      <div class="list_s">
                        <div><span>发件人:</span><span>{{item.sendname}}</span></div>
                      </div>
                      <div class="list_s">
                        <div><span>发件时间:</span><span>{{item.senddt}}</span></div>
                      </div>
                    </div>
                </div>
              </van-list>
          </van-tab>
          <van-tab :title="titwrit">
            <div>
              <van-cell-group>
                <van-field
                  v-model="zhutiname"
                  label="主题"
                  placeholder="请输入主题"
                  required
                  clearable
                />
                <van-panel title="发送给:" status="*必填">
                  <div class="neirong">{{recename}}</div>
                  <div slot="footer" class="thisfooter">
                    <van-button size="small" @click="delbumenxuanze">删除所有</van-button>
                    <van-button size="small" type="info" @click="bumenxuanze">选择</van-button>
                  </div>
                </van-panel>
                <van-panel title="抄送给:" >
                  <div class="neirong">{{ccname}}</div>
                  <div slot="footer" class="thisfooter">
                    <van-button size="small" @click="delbumenxuanzes">删除所有</van-button>
                    <van-button size="small" type="info" @click="bumenxuanzes">选择</van-button>
                  </div>
                </van-panel>
              </van-cell-group>
              <!--富文本-->
              <vue-html5-editor :content="content" :height="300" :z-index="90" @change="updateData"></vue-html5-editor>
              <div class="fileup">
                <div>文件上传:</div>
                <van-uploader v-model="fileList" multiple accept :after-read="afterRead" @delete="del"/>
              </div>
              <div class="commit" @click="addcommit">
                发送
              </div>
            </div>
          </van-tab>
        </van-tabs>
    </van-pull-refresh>
    <!--部门选择-->
    <Departmentpersonnel @chuandishow="chuandishow" @changedeparts_per="changedeparts_per" ref="resl"></Departmentpersonnel>
    <van-popup v-model="show" position="bottom" >
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        :formatter="formatter"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>
    <van-popup v-model="shows_" class="bgcsss" :close-on-click-overlay="clickoverlays">
      <!--加载-->
      <van-loading type="spinner" color="#1989fa" />
    </van-popup>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Departmentpersonnel from '@/components/com/departmentpersonnel'
import Search_ from '@/components/search/Search_'
import {emailmlist, uploadfile, addemailm} from '../../../api/Api'
import initRichText from '../../../assets/fuwenben'
// 富文本编辑器
initRichText()
export default {
  name: 'Emailm',
  components: {
    NavBar,
    Search_,
    Departmentpersonnel
  },
  data () {
    return {
      issticky: true,
      // offsettop: 96,
      barisshow: true,
      token: '',
      id: '',
      keyword: '',
      modenum: '',
      tit: '邮件',
      list: [],
      listshou: [],
      listed: [],
      listdel: [],
      show: false,
      currentDate: new Date(),
      shows_: false,
      clickoverlays: false,
      // 收件
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 100,
      // 草稿
      isLoading: false,
      finished: false,
      error: false,
      loading: false,
      offset: 100,
      // 已发送
      isLoading__: false,
      finished__: false,
      error__: false,
      loading__: false,
      offset__: 100,
      // 已删除
      isLoading___: false,
      finished___: false,
      error___: false,
      loading___: false,
      offset___: 100,
      // 收件箱
      page: 0,
      tithas: '收件箱()',
      // 草稿箱
      page_: 0,
      tithas_: '草稿箱()',
      // 已发
      page__: 0,
      titsend: '已发送()',
      // 已删
      page___: 0,
      titdel: '已删除()',
      pagesize: 15,
      senddt: '',
      type: 4,
      active: 0,
      // 写信
      titwrit: '写信',
      zhutiname: '',
      thisshow_: true,
      // 富文本
      content: '请输入邮件内容',
      // 发送给
      receid: '',
      recename: '',
      // 抄送给
      ccid: '',
      ccname: '',
      // 文件上传
      fileList: [],
      file: [],
      file_id: []
    }
  },
  created () {
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    this.token = this.$store.state.token
    this.modenum = this.$route.query.modenum
  },
  methods: {
    // 时间
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      }
      return value
    },
    showprop () {
      this.show = true
    },
    thiskeyword (e) {
      this.keyword = e
    },
    cancel () {
      this.show = false
    },
    confirm (value) {
      var y = value.getFullYear()
      var m = value.getMonth() + 1
      if (m < 10) {
        m = `0${m}`
      }
      this.senddt = `${y}-${m}`
      this.show = false
      this.onRefresh()
    },
    onRefresh () {
      if (this.active === 0) {
        this.type = 4
        this.page = 1
        let params = {
          token: this.token,
          page: this.page,
          pagesize: this.pagesize,
          keyword: this.keyword,
          senddt: this.senddt,
          type: this.type
        }
        emailmlist(params).then((res) => {
          if (res.data.code === 2000) {
            this.list = res.data.data.data.data
            this.tithas = `收件箱(${res.data.data.num.collect_num}/${res.data.data.num.collect_leave_num})`
            this.loading_ = false
            this.isLoading_ = false
            if (this.list.length >= res.data.data.data.total) {
              this.finished_ = true
            }
          } else {
            this.loading_ = false
            this.error_ = true
          }
        })
      } else if (this.active === 1) {
        this.type = 3
        this.page_ = 1
        let params = {
          token: this.token,
          page: this.page_,
          pagesize: this.pagesize,
          keyword: this.keyword,
          senddt: this.senddt,
          type: this.type
        }
        emailmlist(params).then((res) => {
          if (res.data.code === 2000) {
            this.listshou = res.data.data.data.data
            this.tithas_ = `草稿箱(${res.data.data.num.isturn_num})`
            this.loading = false
            this.isLoading_ = false
            if (this.listshou.length >= res.data.data.data.total) {
              this.finished = true
            }
          } else {
            this.loading = false
            this.error = true
          }
        })
      } else if (this.active === 2) {
        this.type = 1
        this.page__ = 1
        let params = {
          token: this.token,
          page: this.page__,
          pagesize: this.pagesize,
          keyword: this.keyword,
          senddt: this.senddt,
          type: this.type
        }
        emailmlist(params).then((res) => {
          if (res.data.code === 2000) {
            this.listed = res.data.data.data.data
            this.titsend = `已发送(${res.data.data.num.send_num})`
            this.loading__ = false
            this.isLoading_ = false
            if (this.listed.length >= res.data.data.data.total) {
              this.finished__ = true
            }
          } else {
            this.loading__ = false
            this.error__ = true
          }
        })
      } else if (this.active === 3) {
        this.type = 2
        this.page___ = 1
        let params = {
          token: this.token,
          page: this.page___,
          pagesize: this.pagesize,
          keyword: this.keyword,
          senddt: this.senddt,
          type: this.type
        }
        emailmlist(params).then((res) => {
          if (res.data.code === 2000) {
            this.listdel = res.data.data.data.data
            this.titdel = `已删除(${res.data.data.num.isdel_num})`
            this.loading___ = false
            this.isLoading_ = false
            if (this.listdel.length >= res.data.data.data.total) {
              this.finished___ = true
            }
          } else {
            this.loading___ = false
            this.error___ = true
          }
        })
      }
    },
    onLoad () {
      this.type = 4
      this.page = this.page + 1
      let params = {
        token: this.token,
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword,
        senddt: this.senddt,
        type: this.type
      }
      emailmlist(params).then((res) => {
        if (res.data.code === 2000) {
          this.list = [...this.list, ...res.data.data.data.data]
          this.tithas = `收件箱(${res.data.data.num.collect_num}/${res.data.data.num.collect_leave_num})`
          this.loading_ = false
          if (this.list.length >= res.data.data.data.total) {
            this.finished_ = true
          }
        } else {
          this.loading_ = false
          this.error_ = true
        }
      })
    },
    onLoad_ () {
      this.type = 3
      this.page_ = this.page_ + 1
      let params = {
        token: this.token,
        page: this.page_,
        pagesize: this.pagesize,
        keyword: this.keyword,
        senddt: this.senddt,
        type: this.type
      }
      emailmlist(params).then((res) => {
        if (res.data.code === 2000) {
          this.listshou = [...this.listshou, ...res.data.data.data.data]
          this.tithas_ = `草稿箱(${res.data.data.num.isturn_num})`
          this.loading = false
          if (this.listshou.length >= res.data.data.data.total) {
            this.finished = true
          }
        } else {
          this.loading = false
          this.error = true
        }
      })
    },
    onLoad__ () {
      this.type = 1
      this.page__ = this.page__ + 1
      let params = {
        token: this.token,
        page: this.page__,
        pagesize: this.pagesize,
        keyword: this.keyword,
        senddt: this.senddt,
        type: this.type
      }
      emailmlist(params).then((res) => {
        if (res.data.code === 2000) {
          this.listed = [...this.listed, ...res.data.data.data.data]
          this.titsend = `已发送(${res.data.data.num.send_num})`
          this.loading__ = false
          if (this.listed.length >= res.data.data.data.total) {
            this.finished__ = true
          }
        } else {
          this.loading__ = false
          this.error__ = true
        }
      })
    },
    onLoad___ () {
      this.type = 2
      this.page___ = this.page___ + 1
      let params = {
        token: this.token,
        page: this.page___,
        pagesize: this.pagesize,
        keyword: this.keyword,
        senddt: this.senddt,
        type: this.type
      }
      emailmlist(params).then((res) => {
        if (res.data.code === 2000) {
          this.listdel = [...this.listdel, ...res.data.data.data.data]
          this.titdel = `已删除(${res.data.data.num.isdel_num})`
          this.loading___ = false
          if (this.listdel.length >= res.data.data.data.total) {
            this.finished___ = true
          }
        } else {
          this.loading___ = false
          this.error___ = true
        }
      })
    },
    // 部门选择
    bumenxuanze () {
      this.thisshow_ = true
      this.$refs.resl.childMethod(this.thisshow_, this.token, 0)
    },
    bumenxuanzes () {
      this.thisshow_ = true
      this.$refs.resl.childMethod(this.thisshow_, this.token, 1)
    },
    chuandishow () {
      this.thisshow_ = false
    },
    changedeparts_per (object, type) {
      if (type === 0) {
        this.receid = ''
        this.recename = ''
        for (var i = 0; i < object.length; i++) {
          if (i === 0) {
            if (object[i].name) {
              this.receid = `d${object[i].id}`
              this.recename = `${object[i].name}`
            } else if (object[i].realname) {
              this.receid = `u${object[i].id}`
              this.recename = `${object[i].realname}`
            }
          } else if (i > 0) {
            if (object[i].name) {
              this.receid = `${this.receid},d${object[i].id}`
              this.recename = `${this.recename},${object[i].name}`
            } else if (object[i].realname) {
              this.receid = `${this.receid},u${object[i].id}`
              this.recename = `${this.recename},${object[i].realname}`
            }
          }
        }
      } else if (type === 1) {
        this.ccid = ''
        this.ccname = ''
        for (var j = 0; j < object.length; j++) {
          if (j === 0) {
            this.ccid = `${object[j].id}`
            this.ccname = `${object[j].realname}`
          } else if (j > 0) {
            this.ccid = `${this.ccid},${object[j].id}`
            this.ccname = `${this.ccname},${object[j].realname}`
          }
        }
      }
    },
    delbumenxuanze () {
      this.receid = ''
      this.recename = ''
    },
    delbumenxuanzes () {
      this.ccid = ''
      this.ccname = ''
    },
    // 文件上传
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
    engindetails (id) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/emailmdetails',
        query: {
          id: id,
          modenum: that.modenum,
          tit: that.tit
        }
      })
    },
    // 富文本
    updateData (e) {
      this.content = e
    },
    // 发邮件
    addcommit () {
      let params = {
        token: this.token,
        hid: 0,
        title: this.zhutiname,
        content: this.content,
        receid: this.receid,
        recename: this.recename,
        isturn: 1,
        ccid: this.ccid,
        ccname: this.ccname,
        file: this.file_id
      }
      addemailm(params).then((res) => {
        if (res.data.code === 2000) {
          this.$toast('发送成功！')
          setTimeout(() => {
            this.$router.go(0)
          }, 500)
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
  .list_s>div{
    max-width: 90%;
  }
  .thisfooter{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .neirong{
    padding: 0.6rem 1rem;
    font-size: 14px;
    color: darkgray;
  }
  .fileup{
    width: 95%;
    margin: 0 auto;
  }
  .fileup>div:first-child{
    font-size: 0.9rem;
    padding: 0.5rem 0;
  }
  .commit{
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    color: white;
    background-color: #50cced;
  }
</style>
