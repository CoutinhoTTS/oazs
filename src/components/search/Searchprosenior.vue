<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <!--下拉框-->
    <div class="yeji">
      <div><span class="requir">*</span><h4>业绩类型</h4>:</div>
        <van-dropdown-menu class="yejichange">
          <van-dropdown-item v-model="value" :options="option" />
        </van-dropdown-menu>
    </div>
    <div class="adress">
      <div><h4>企业经营所在地区/项目所在地:</h4></div>
      <van-dropdown-menu class="adresschange">
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
      </van-dropdown-menu>
    </div>
    <!--输入框-->
    <div>
      <van-cell-group>
        <van-field
          v-model="wbidmoney"
          clearable
          label-width="100"
          label="中标金额(万元):"
          placeholder="请输入金额"
          @blur="moneyblur"
        />

        <van-field
          v-model="seanum"
          clearable
          label-width="150"
          label="符合条件的业绩数量:"
          placeholder="请输入业绩数量"
          @blur="seanumblur"
        />
      </van-cell-group>
    </div>
    <!--时间-->
    <div class="timeset">
      <div class="timetitchange">
        <h4>中标时间:</h4>
        <van-dropdown-menu class="timetitchange_">
          <van-dropdown-item v-model="value3" :options="option3" @change="timechange"/>
        </van-dropdown-menu>
      </div>
      <van-cell-group>
        <van-field v-model="value4" :disabled="disabled" placeholder="请输入开始时间" @focus="sonfocus"/>
        <van-field v-model="value5" :disabled="disabled" placeholder="请输入结束时间" @focus="eonfocus"/>
      </van-cell-group>
    </div>
    <!--查询-->
    <div class="chaxun">
      <div @click="chaxun">查询</div>
    </div>
    <div class="listall_">
      <van-list
        v-model="loading_"
        :error.sync="error_"
        :finished="finished_"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :offset="offset_"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" class="searchalllists" :key="index" @click="thiscompanydetails(item.com_id, item.wbidname)"  >
          <div>
            <div>
              <div>
                <span>企业名称:</span><span>{{item.wbidname}}</span>
              </div>
              <div>
              </div>
            </div>
            <div>
              <div>
                <span>统一社会信用代码:</span><span>{{item.credit_code}}</span>
              </div>
              <div></div>
            </div>
            <div>
              <div>
                <span>法人:</span><span>{{item.legal_person}}</span>
              </div>
              <div>
                <span>注册地:</span><span>{{item.province_name}}</span>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="timeconfirm"
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
import {searchprosenior} from '../../api/Api'
export default {
  name: 'Searchprosenior',
  components: {
    NavBar
  },
  data () {
    return {
      token: '',
      tit: '业绩(高级)查询',
      // 业绩类型
      value: '',
      option: [
        {
          text: '请选择',
          value: ''
        }, {
          text: '设计业绩',
          value: 1
        }, {
          text: '施工业绩',
          value: 2
        }, {
          text: '勘察业绩',
          value: 3
        }, {
          text: '监理业绩',
          value: 4
        }
      ],
      // 地址1
      value1: '',
      option1: [
        {
          text: '请选择',
          value: ''
        }
      ],
      // 地址2
      value2: '',
      option2: [
        {
          text: '请选择',
          value: ''
        }
      ],
      // 时间
      value3: '',
      option3: [
        {
          text: '自定义',
          value: ''
        },
        {
          text: '近一年',
          value: 1
        },
        {
          text: '近两年',
          value: 2
        },
        {
          text: '近三年',
          value: 3
        }
      ],
      currentDate: new Date(),
      // 中标金额
      wbidmoney: '',
      // 企业数量
      seanum: '',
      // 开始时间
      value4: '',
      // 结束时间
      value5: '',
      show: false,
      // 时间输入框的禁止输入
      disabled: false,
      isstrorend: 0,
      first: 0,
      page: 0,
      pagesize: 15,
      list: [],
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 10,
      scrollTop: '',
      // 加载
      shows_: false,
      clickoverlays: false
    }
  },
  created () {
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
  },
  methods: {
    // 开始时间
    sonfocus () {
      if (!this.value3) {
        this.show = true
        this.isstrorend = 1
      }
    },
    // 结束时间
    eonfocus () {
      if (!this.value3) {
        this.show = true
        this.isstrorend = 2
      }
    },
    // 中标时间类型
    timechange (value) {
      var year = this.currentDate.getFullYear()
      var mon = this.currentDate.getMonth() + 1
      if (mon < 10) {
        mon = `0${mon}`
      }
      var day = this.currentDate.getDate()
      if (day < 10) {
        day = `0${day}`
      }
      var etime = `${year}-${mon}-${day}`
      var stime = ''
      if (value === 1) {
        stime = `${year - 1}-${mon}-${day}`
        this.value4 = stime
        this.value5 = etime
        this.disabled = true
      } else if (value === 2) {
        stime = `${year - 2}-${mon}-${day}`
        this.value4 = stime
        this.value5 = etime
        this.disabled = true
      } else if (value === 3) {
        stime = `${year - 3}-${mon}-${day}`
        this.value4 = stime
        this.value5 = etime
        this.disabled = true
      } else {
        this.value4 = ''
        this.value5 = ''
        this.disabled = false
      }
    },
    // 选中时间
    timeconfirm (value) {
      var year = this.currentDate.getFullYear()
      var mon = this.currentDate.getMonth() + 1
      if (mon < 10) {
        mon = `0${mon}`
      }
      var day = this.currentDate.getDate()
      if (day < 10) {
        day = `0${day}`
      }
      var time = `${year}-${mon}-${day}`
      if (this.isstrorend === 1) {
        this.value4 = time
      } else if (this.isstrorend === 2 && this.value4) {
        this.value5 = time
        var val4 = (this.value4 || '').split('-').join('')
        var val5 = (this.value5 || '').split('-').join('')
        if (val4 >= val5) {
          this.value5 = ''
          this.$toast('结束时间必须大于开始时间')
        }
      } else {
        this.$toast('请先输入开始时间')
      }
      this.show = false
    },
    // 金额输入验证
    moneyblur () {
      var reg = /^[1-9]\d*(\.\d+)?$/
      if (!reg.test(this.wbidmoney)) {
        this.$toast('请输入正确的数字金额')
        this.wbidmoney = ''
      }
    },
    seanumblur () {
      var reg = /^(10|[1-9])$/
      if (!reg.test(this.seanum)) {
        this.$toast('企业数量要在1-10之间')
        this.seanum = ''
      }
    },
    onLoad () {
      if (this.first === 1) {
        this.page = this.page + 1
        let params = {
          token: this.token,
          page: this.page,
          pagesize: this.pagesize,
          first: this.first,
          wbidmoney: this.wbidmoney,
          province_id: this.value1,
          regionalid: this.value2,
          wbid_startdt: this.value4,
          wbid_enddt: this.value5,
          seanum: this.seanum,
          type: this.value
        }
        searchprosenior(params).then((res) => {
          if (res.data.code === 2000) {
            this.first = 1
            this.list = [...this.list, ...res.data.data.data.data]
            this.loading_ = false
            if (this.list.length >= res.data.data.data.total) {
              this.finished_ = true
            }
          } else {
            this.loading_ = false
            this.error_ = true
          }
        })
      } else if (this.first === 0) {
        this.shows_ = true
        this.page = this.page + 1
        let params = {
          token: this.token,
          page: this.page,
          pagesize: this.pagesize,
          first: this.first,
          wbidmoney: this.wbidmoney,
          province_id: this.value1,
          regionalid: this.value2,
          wbid_startdt: this.value4,
          wbid_enddt: this.value5,
          seanum: this.seanum,
          type: this.value
        }
        searchprosenior(params).then((res) => {
          this.shows_ = false
          if (res.data.code === 2000) {
            this.first = 1
            for (var i = 0; i < res.data.data.areas.length; i++) {
              this.option1.push(
                {
                  text: res.data.data.areas[i].name,
                  value: res.data.data.areas[i].id
                }
              )
              this.option2.push(
                {
                  text: res.data.data.areas[i].name,
                  value: res.data.data.areas[i].id
                }
              )
            }
            if (this.list.length >= res.data.data.data.total) {
              this.finished_ = true
              this.loading_ = false
            }
          } else {
            this.loading_ = false
            this.error_ = true
          }
        })
      }
    },
    // 查询
    chaxun () {
      if (this.value) {
        this.shows_ = true
        this.page = 1
        let params = {
          token: this.token,
          page: this.page,
          pagesize: this.pagesize,
          first: this.first,
          wbidmoney: this.wbidmoney,
          province_id: this.value1,
          regionalid: this.value2,
          wbid_startdt: this.value4,
          wbid_enddt: this.value5,
          seanum: this.seanum,
          type: this.value
        }
        searchprosenior(params).then((res) => {
          this.shows_ = false
          if (res.data.code === 2000) {
            this.first = 1
            this.list = res.data.data.data.data
            this.loading_ = false
            if (this.list.length >= res.data.data.data.total) {
              this.finished_ = true
            } else {
              this.finished_ = false
            }
          } else {
            this.$toast('搜索发生错误')
          }
        })
      } else {
        this.$toast('请选择业绩类型')
      }
    },
    thiscompanydetails (id, name) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var that = this
      this.$router.push({
        path: '/searchcompanydetails',
        query: {
          id: id,
          name: name,
          tit: that.tit
        }
      })
    },
    handleScroll () {
      var windowHeight = document.documentElement.clientHeight
      var scrollHeight = document.documentElement.scrollHeight
      this.offset_ = scrollHeight - windowHeight + 1
      if (scrollHeight - windowHeight === 0) {
        this.offset_ = 300
      }
    }
  },
  mounted () {
    this.handleScroll()
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'Search') {
      to.meta.isBack = false
    }
    next()
  },
  activated () {
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    if (!this.$route.meta.isBack) {
      Object.assign(this.$data, this.$options.data())
      this.token = this.$store.state.token
      this.handleScroll()
    }
    this.$route.meta.isBack = true
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
.yeji{
  margin-top: 2.95rem;
  padding: 0.5rem 1rem;
}
.yeji>div{
  font-size: 0.8rem;
}
.yeji>div:first-child{
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
  .yejichange{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 1.8rem;
    width: 50%;
    border-radius: 0.9rem;
    border: 1px solid #dddddd;
  }
.yejichange:after{
  border-width: 0;
}
  .adress{
    padding: 0.5rem 1rem;
  }
  h4{
    margin: 0.3rem 0;
    font-size: 0.8rem;
  }
  .adresschange{
    height: 1.8rem;
    border: 1px solid #dddddd;
    border-radius: 0.9rem;
  }
.adresschange:after{
  border-width: 0;
}
  .timetitchange{
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
  }
  .timetitchange_{
    width: 30%;
    height: 1.4rem;
    font-size: 0.8rem;
    border-radius: 0.7rem;
    border: 1px solid #dddddd;
  }
  .timetitchange_:after{
    border-width: 0;
  }
  .timeset{
    padding: 0.5rem 1rem;
  }
  .chaxun{
    text-align: center;
    font-size: 0.8rem;
  }
.chaxun>div{
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #0088cd;
  color: white;
  border-radius: 0.3rem;
}
</style>
