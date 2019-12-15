<template>
  <div class="allbanns">
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <!---------------------------------------------------资质---------------------------------------------------->
      <div class="srarchlist__">
        <h5>当前省份:</h5>
        <van-dropdown-menu class="province_">
          <van-dropdown-item v-model="value1" :options="option1" @change="provincechange" />
        </van-dropdown-menu>
      </div>
    <div class="banns">
      <div class="srarchcon">
        <h3>资质条件:</h3>
        <div class="srarchcondition">
          <div>
            <div>企业筛选</div>
            <div @click="addCondition">添加条件</div>
          </div>
          <div class="conditions_">
            <div v-for="(item, index) in textvalue" :key="index">
              <div>{{item}}</div>
              <i class="fa fa-close" @click="cleancondition(index)"></i>
            </div>
            <div v-show="isshowchecked">
              <span>条件是否都要具备</span>
              <van-switch
                v-model="checked"
                size="1rem"
                @change="checkedchange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------------------------------------------------人员------------------------------------------------->
    <div class="banns">
      <div class="percondition">
        <h3>人员条件:</h3>
        <div class="srarchcondition">
          <div>
            <div class="cont">
              <span>人员筛选</span>
              <div>
                人数:
                <input type="text" :value="personcont" @blur="personcontblur">
              </div>
            </div>
            <div @click="addperCondition">添加条件</div>
          </div>
          <div class="conditions_">
            <div v-for="(item, index) in textvaluepers" :key="index">
              <div>{{item}}</div>
              <i class="fa fa-close" @click="cleanprecondition(index)"></i>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <!-----------------------------------------------------业绩------------------------------------------------->
    <div class="banns">
      <div class="adress">
        <h3>业绩条件:</h3>
        <div><h4><span class="requir">*</span>业绩类型/项目所在地:</h4></div>
        <van-dropdown-menu class="adresschange">
          <van-dropdown-item v-model="value" :options="option" />
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
      <!--添加添加-->
      <div class="addcondi">
        <div @click="addyejicondition">添加添加</div>
      </div>
      <!--条件-->
      <div class="conditions_ yejicondition_" >
        <div v-for="(item, index) in thisyeji" :key="index" >
          <div>{{item}}</div>
          <i class="fa fa-close" @click="cleanyejicondition(index)"></i>
        </div>
        <div></div>
      </div>
    </div>
    <!--搜索，清空-->
    <div class="searchclean">
      <div @click="searchqua">搜索</div>
      <div @click="cleanall">清空</div>
    </div>
    <!--列表-->
    <van-list
      v-model="loading_"
      :error.sync="error_"
      :finished="finished_"
      error-text="请求失败，点击重新加载"
      finished-text="加载完成"
      :offset="offset_"
      @load="onLoad"
    >
      <div v-for="(item, index) in list" class="searchalllists" :key="index" @click="thiscompanydetails(item.com_id, item.com_name)"  >
        <div>
          <div>
            <div>
              <span>企业名称:</span><span>{{item.com_name}}</span>
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
    <!--弹出框-->
    <van-dialog
      v-model="show"
      title="添加企业筛选条件"
      confirmButtonText="添加"
      show-cancel-button
      @confirm="confirm_"
      @cancel="cancel_"
    >
      <div v-show="isquaorper" v-for="(item, index) in Tlist_" class="qualificate" @click="bottomcomdi(index)" :key="index">
        <div>{{item.text}}</div>
        <i class="fa fa-angle-down"></i>
      </div>
      <div v-show="isquaorper_" v-for="(item, index) in Tlists_" class="qualificate" @click="bottomcomdi(index)" :key="item.text">
        <div>{{item.text}}</div>
        <i class="fa fa-angle-down"></i>
      </div>
    </van-dialog>
    <!--底部选择-->
    <van-popup v-model="shows" position="bottom" >
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
    <van-popup v-model="shows_" class="bgcsss" :close-on-click-overlay="clickoverlays">
      <!--加载-->
      <van-loading type="spinner" color="#1989fa" />
    </van-popup>
      <!--时间-->
    <van-popup v-model="showv" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="timeconfirm"
        @cancel="timeoncancel"
      />
    </van-popup>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import {searchmultiple} from '../../api/Api'
export default {
  name: 'Searchmultiple',
  components: {
    NavBar
  },
  data () {
    return {
      tit: '综合查询',
      token: '',
      show: false,
      // 当前省
      value1: '',
      Tlist_: [],
      Tlist: [],
      // 人员条件
      Tlists: [],
      Tlists_: [],
      shows: false,
      option1: [
        {
          text: '请选择', value: ''
        }
      ],
      textvalue: [],
      // 人员条件
      textvalues: [],
      isshowchecked: false,
      checked: false,
      columns: [],
      // 选中项
      defaultindex: '',
      textval: [],
      // 加载层
      shows_: false,
      /**
       * *****************************************业绩**/
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
      value1_: '',
      option1_: [
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
      // 时间输入框的禁止输入
      disabled: false,
      isstrorend: 0,
      /**
       * ***********************************人员**/
      textvalueper: [],
      textvaluepers: [],
      /**
       * **********************************列表**/
      first: 0,
      page: 0,
      pagesize: 15,
      list: [],
      isLoading_: false,
      finished_: false,
      error_: false,
      loading_: false,
      offset_: 0,
      /**
       * ***************************判断是资质条件还是人员条件**/
      isquaorper: false,
      isquaorper_: false,
      // 人数
      personcont: '',
      showv: false,
      // 业绩条件组
      thisyeji: [],
      thisyejis: [],
      // 判断是否重复
      ishas: false,
      // 请求状态
      type: 0,
      clickoverlays: false
    }
  },
  created () {
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
  },
  mounted () {
    this.handleScroll()
  },
  methods: {
    // 当前省份选择
    provincechange () {},
    // 添加条件
    addCondition () {
      this.isquaorper = true
      this.isquaorper_ = false
      this.show = true
    },
    // 删除某一项条件（资质）
    cleancondition (index) {
      this.textvalue.splice(index, 1)
      this.textval.splice(index, 1)
      if (this.textvalue.length === 0) {
        this.isshowchecked = false
      }
    },
    // 搜索
    searchqua () {
      if (this.checked === false) {
        this.type = 2
      } else {
        this.type = 1
      }
      this.page = 1
      this.shows_ = true
      let param = {
        token: this.token,
        page: this.page,
        pagesize: this.pagesize,
        first: this.first,
        province_id: this.value1,
        com_cate: this.textval.join(','),
        user_cate: this.textvaluepers.join(','),
        pro: this.thisyejis,
        com_type: this.type
      }
      searchmultiple(param).then((res) => {
        if (res.data.code === 2000) {
          this.list = res.data.data.data.data
          this.loading_ = false
          if (this.list.length >= res.data.data.data.total) {
            this.finished_ = true
          } else {
            this.finished_ = false
          }
        }
        this.shows_ = false
      })
        .catch(() => {
          this.shows_ = false
          this.$toast('出错啦!')
        })
    },
    // 清空
    cleanall () {
      this.textvalue.splice(0, this.textvalue.length)
      this.textval.splice(0, this.textval.length)
      this.isshowchecked = false
      this.textvalueper.splice(0, this.textvalueper.length)
      this.textvaluepers.splice(0, this.textvaluepers.length)
      this.thisyejis.splice(0, this.thisyejis.length)
      this.thisyeji.splice(0, this.thisyeji.length)
    },
    // 添加
    confirm_ () {
      if (this.isquaorper) {
        if (this.Tlist_[this.Tlist_.length - 1].text === '请选择') {
          this.show = true
          this.Tlist_.splice(1, this.Tlist_.length - 1)
          this.Tlist_[0].text = '请选择'
          this.$toast('请选择完整的资质查询条件')
        } else {
          if (this.textval.indexOf(this.Tlist_[this.Tlist_.length - 1].text) === -1) {
            var str = ''
            for (var i = 0; i < this.Tlist_.length; i++) {
              if (i === 0) {
                str += this.Tlist_[i].text
              } else {
                str += `+${this.Tlist_[i].text}`
              }
            }
            this.textvalue.push(str)
            this.textval.push(this.Tlist_[this.Tlist_.length - 1].text)
            this.Tlist_.splice(1, this.Tlist_.length - 1)
            this.Tlist_[0].text = '请选择'
            this.isshowchecked = true
          } else {
            this.Tlist_.splice(1, this.Tlist_.length - 1)
            this.Tlist_[0].text = '请选择'
            this.$toast('该条件以存在请从新选择')
          }
        }
      }
      if (this.isquaorper_) {
        if (this.Tlists_[this.Tlists_.length - 1].text === '请选择') {
          this.show = true
          this.Tlists_.splice(1, this.Tlists_.length - 1)
          this.Tlists_[0].text = '请选择'
          this.$toast('请选择完整的资质查询条件')
        } else {
          var strs = ''
          for (var j = 0; j < this.Tlists_.length; j++) {
            if (j === 0) {
              strs += this.Tlists_[j].text
            } else {
              strs += `-${this.Tlists_[j].text}`
            }
          }
          if (this.textvalueper.indexOf(strs) === -1) {
            this.textvalueper.push(strs)
            this.textvaluepers.push(`${this.textvalueper[this.textvalueper.length - 1]}-${this.personcont}`)
            this.Tlists_.splice(1, this.Tlists_.length - 1)
            this.Tlists_[0].text = '请选择'
          } else {
            strs = ''
            this.Tlists_.splice(1, this.Tlists_.length - 1)
            this.Tlists_[0].text = '请选择'
            this.$toast('该条件以存在请从新选择')
          }
        }
      }
    },
    // 取消
    cancel_ () {
      if (this.isquaorper) {
        this.Tlist_.splice(1, this.Tlist_.length - 1)
        this.Tlist_[0].text = '请选择'
      }
      if (this.isquaorper_) {
        this.Tlists_.splice(1, this.Tlists_.length - 1)
        this.Tlists_[0].text = '请选择'
      }
    },
    // 条件框点击
    bottomcomdi (index) {
      if (this.isquaorper) {
        this.columns = this.Tlist_[index]
        this.shows = true
      }
      if (this.isquaorper_) {
        this.columns = this.Tlists_[index]
        this.shows = true
      }
    },
    // 底部条件取消
    onCancel () {},
    // 底部条件确定
    onConfirm (value) {
      if (this.isquaorper) {
        this.Tlist_[value.level - 1].text = value.text
        var len = this.Tlist_.length
        this.Tlist_.splice(value.level, (len - value.level))
        if (value.children) {
          this.Tlist_.push([])
          this.Tlist_[this.Tlist_.length - 1].text = '请选择'
          for (var i = 0; i < value.children.length; i++) {
            this.Tlist_[this.Tlist_.length - 1].push({
              text: value.children[i].name,
              value: value.children[i].id,
              level: value.children[i].level,
              children: value.children[i].children
            })
          }
        }
      }
      if (this.isquaorper_) {
        this.Tlists_[value.level - 1].text = value.text
        var lens = this.Tlists_.length
        this.Tlists_.splice(value.level, (lens - value.level))
        if (value.children) {
          this.Tlists_.push([])
          this.Tlists_[this.Tlists_.length - 1].text = '请选择'
          for (var j = 0; j < value.children.length; j++) {
            this.Tlists_[this.Tlists_.length - 1].push({
              text: value.children[j].name,
              value: value.children[j].id,
              level: value.children[j].level,
              children: value.children[j].children
            })
          }
        }
      }
      this.shows = false
    },
    /**
     * ***************************************业绩**************************************/
    // 中标金额输入框失去焦点
    moneyblur () {
      if (this.wbidmoney) {
        var reg = /^[1-9]\d*(\.\d+)?$/
        if (!reg.test(this.wbidmoney)) {
          this.$toast('请输入正确的数字金额')
          this.wbidmoney = ''
        }
      }
    },
    // 企业数量输入框失去焦点
    seanumblur () {
      if (this.seanum) {
        var reg = /^(10|[1-9])$/
        if (!reg.test(this.seanum)) {
          this.$toast('企业数量要在1-10之间')
          this.seanum = ''
        }
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
    // 开始时间
    sonfocus () {
      if (!this.value3) {
        this.showv = true
        this.isstrorend = 1
      }
    },
    // 结束时间
    eonfocus () {
      if (!this.value3) {
        this.showv = true
        this.isstrorend = 2
      }
    },
    /**
     ********************************************人员*******************/
    // 点击添加人员条件
    addperCondition () {
      this.isquaorper = false
      this.isquaorper_ = true
      if (this.personcont && (this.personcont > 0)) {
        this.show = true
      } else {
        this.$toast('请先填写人数，人数大于0')
      }
    },
    // 清除条件
    cleanprecondition (index) {
      this.textvalueper.splice(index, 1)
      this.textvaluepers.splice(index, 1)
    },
    /**
     * ***************************列表**/
    onLoad () {
      if (this.first === 0) {
        this.shows_ = true
        let param = {
          token: this.token,
          page: 1,
          pagesize: this.pagesize,
          first: this.first,
          province_id: this.value1,
          com_cate: this.textval.join(','),
          user_cate: this.textvaluepers.join(','),
          pro: this.thisyejis,
          com_type: this.type
        }
        searchmultiple(param).then((res) => {
          this.shows_ = false
          if (res.data.code === 2000) {
            this.first = 1
            this.list = res.data.data.data.data
            this.Tlist = res.data.data.com_cate
            this.Tlists = res.data.data.user_cate
            this.Tlist_.push([])
            this.Tlists_.push([])
            this.Tlist_[0].text = '请选择'
            this.Tlists_[0].text = '请选择'
            for (var j = 0; j < this.Tlist.length; j++) {
              this.Tlist_[0].push({
                text: this.Tlist[j].name,
                value: this.Tlist[j].id,
                level: this.Tlist[j].level,
                children: this.Tlist[j].children
              })
            }
            for (var n = 0; n < this.Tlists.length; n++) {
              this.Tlists_[0].push({
                text: this.Tlists[n].name,
                value: this.Tlists[n].id,
                level: this.Tlists[n].level,
                children: this.Tlists[n].children
              })
            }
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
            var per = res.data.data.province_name
            for (var k = 0; k < this.option1.length; k++) {
              if (this.option1[k].text === per) {
                this.value1 = this.option1[k].value
              }
            }
            if (this.list.length >= res.data.data.data.total) {
              this.finished_ = true
              this.loading_ = false
            }
          }
        })
      } else if (this.first === 1) {
        this.page = this.page + 1
        let param = {
          token: this.token,
          page: this.page,
          pagesize: this.pagesize,
          first: this.first,
          province_id: this.value1,
          com_cate: this.textval.join(','),
          user_cate: this.textvaluepers.join(','),
          pro: this.thisyejis,
          com_type: this.type
        }
        searchmultiple(param).then((res) => {
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
      }
    },
    handleScroll () {
      var windowHeight = document.documentElement.clientHeight
      var scrollHeight = document.documentElement.scrollHeight
      this.offset_ = scrollHeight - windowHeight + 1
      if (scrollHeight - windowHeight === 0) {
        this.offset_ = 300
      }
    },
    // 人员数
    personcontblur (e) {
      this.personcont = e.path[0].value
    },
    // 开关
    checkedchange (checked) {
      this.checked = checked
    },
    // 时间选择
    timeconfirm () {
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
      this.showv = false
    },
    // 取消时间选择
    timeoncancel () {
      this.showv = false
    },
    // 业绩清除
    cleanyejicondition (index) {
      this.thisyejis.splice(index, 1)
      this.thisyeji.splice(index, 1)
    },
    // 添加业绩条件
    addyejicondition () {
      if (this.thisyejis.length < 5) {
        if (this.value) {
          if (this.value && this.wbidmoney && this.seanum && this.value4 && this.value5) {
            var por = {
              searchClass: this.value,
              sucMoney: this.wbidmoney,
              projectFrom: this.value2,
              isokenterprise: this.seanum,
              sucTimeStar: this.value4,
              sucTimeEnd: this.value5
            }
            for (var i = 0; i < this.thisyejis.length; i++) {
              if (this.thisyejis[i].searchClass === por.searchClass &&
                this.thisyejis[i].sucMoney === por.sucMoney &&
                this.thisyejis[i].projectFrom === por.projectFrom &&
                this.thisyejis[i].isokenterprise === por.isokenterprise &&
                this.thisyejis[i].sucTimeStar === por.sucTimeStar &&
                this.thisyejis[i].sucTimeEnd === por.sucTimeEnd) {
                this.$toast('该条件已经存在请从新选择')
                this.ishas = true
              }
            }
            if (!this.ishas) {
              this.thisyejis.push(por)
              this.ishas = false
              var str = ''
              for (var key in por) {
                if (key === 'searchClass') {
                  for (var j = 0; j < this.option.length; j++) {
                    if (this.option[j].value === por[key]) {
                      str += `${this.option[j].text}`
                    }
                  }
                } else if (key === 'projectFrom') {
                  for (var k = 0; k < this.option2.length; k++) {
                    if (this.option2[k].value === por[key]) {
                      str += `-${this.option2[k].text}`
                    }
                  }
                } else if (key === 'sucMoney') {
                  str += `-中标金额${por[key]}万元`
                } else if (key === 'isokenterprise') {
                  str += `-符合条件的企业数量${por[key]}`
                } else if (key === 'sucTimeStar') {
                  str += `-开始时间${por[key]}`
                } else if (key === 'sucTimeEnd') {
                  str += `-结束时间${por[key]}`
                }
              }
              this.thisyeji.push(str)
              this.value = ''
              this.wbidmoney = ''
              this.value2 = ''
              this.seanum = ''
              this.value3 = ''
              this.value4 = ''
              this.value5 = ''
            }
          } else {
            this.$toast('"请输入更多业绩查询条件，以获得更准确的结果"')
          }
        } else {
          this.$toast('请添加业绩类型条件')
        }
      } else {
        this.$toast('最多添加5条数据')
      }
    },
    // 详情
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
    }
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
  .banns{
    width: 95%;
    margin: 1rem auto;
    border: 1px solid #dddddd;
    border-radius: 0.5rem;
  }
  .province_{
    width: 50%;
  }
  .province_:after{
    border-width: 0;
  }
  .srarchlist__{
    padding: 0.5rem 1rem;
  }
  .srarchlist__>div{
    border: 1px solid #dddddd;
    border-radius: 0.9rem;
    height: 1.8rem;
  }
  .srarchlist__>h5{
    margin: 0.3rem;
    padding: 0;
  }
  .srarchcondition{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border: 1px solid #dddddd;
    border-radius: 0.3rem;
  }
  .srarchcondition>div{
    width: 100%;
  }
  .srarchcondition>div:first-child>div:last-child{
    padding: 0.1rem 1rem;
    background-color: #0088cd;
    font-size: 0.8rem;
    color: white;
    border-radius: 0.1rem;
  }
  .srarchcondition>div:first-child{
    display: flex;
    flex-direction: row;
    justify-content:space-between ;
    align-items: center;
    padding:0 0 0.4rem;
    border-bottom: 1px solid #dddddd;
  }
  .srarchcon{
    padding: 0.5rem 1rem;
  }
  .srarchcon>h4{
    margin: 0.3rem 0;
  }
  .vandialog>div:first-child{
    padding: 0.5rem 0;
    background-color: #0088cd;
    color: white;
  }
  .qualificate{
    width: 65%;
    margin: 0.5rem auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #dddddd;
    padding: 0.2rem;
    border-radius: 0.1rem;
  }
  .conditions_>div>i{
    display: inline-block;
    padding: 0 0 0 0.5rem;
  }
  .conditions_{
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }
  .conditions_>div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0.3rem 0;
  }
  .conditions_>div:last-child{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .conditions_>div:last-child>span{
    font-size: 0.6rem;
    color: #414141;
  }
  .searchclean{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .searchclean>div{
    display: inline-block;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    color: white;
    border-radius: 0.3rem;
    margin: 0.5rem;
  }
  .searchclean>div:first-child{
    background-color: #0088cd;
  }
  .searchclean>div:last-child{
    background-color: #f61f41;
  }
  /******************************************人员**********************************/
  .percondition{
    padding: 0.5rem 1rem;
  }
  /******************************************业绩**********************************/
  .yeji>div{
    font-size: 0.8rem;
  }
  .yeji>div:first-child{
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
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
  h3{
    margin: 0.3rem 0;
    font-size: 1rem;
    font-weight: lighter;
    color: #0088cd;
  }
  .allbanns{
    margin-bottom: 3.2rem;
  }
  .cont{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .cont>div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 2rem;
  }
  .cont>div>input{
    width: 2rem;
    text-align: center;
    border: 1px solid #dddddd;
    border-radius: 0.3rem;
    font-size: 0.9rem;
  }
  .addcondi{
    padding: 0.5rem 1rem;
    text-align: right;
  }
  .addcondi>div{
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #0088cd;
    font-size: 0.8rem;
    color: white;
    border-radius: 0.3rem;
  }
  .yejicondition_{
    padding: 0.5rem 1rem;
  }
</style>
