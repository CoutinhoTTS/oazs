<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <div class="srarchlist__">
      <h5>省份:</h5>
      <van-dropdown-menu class="province_">
        <van-dropdown-item v-model="value1" :options="option1" @change="provincechange" />
      </van-dropdown-menu>
      <h5>条件:</h5>
    </div>
    <div class="srarchcon">
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
    <!--搜索，清空-->
    <div class="searchclean">
      <div @click="searchqua">搜索</div>
      <div @click="cleanall">清空</div>
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
    </div>
    <!--弹出框-->
    <van-dialog
      v-model="show"
      title="添加企业筛选条件"
      confirmButtonText="添加"
      show-cancel-button
      @confirm="confirm_"
      @cancel="cancel_"
    >
      <div v-for="(item, index) in Tlist_" class="qualificate" @click="bottomcomdi(index)" :key="index">
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
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import {searchquality} from '../../api/Api'
export default {
  name: 'Searchqualitylist',
  components: {
    NavBar
  },
  data () {
    return {
      token: '',
      tit: '查资质',
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
      qualification: '',
      province_id: 0,
      provincelist: [],
      Tlist: [],
      Tlist_: [],
      type: '',
      show: false,
      shows: false,
      //  条件
      value1: '',
      option1: [
        {
          text: '请选择', value: ''
        }
      ],
      columns: [],
      // 选中项
      defaultindex: '',
      // 当前选中值
      textvalue: [],
      textval: [],
      // 开关状态
      checked: false,
      isshowchecked: false,
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
    onLoad () {
      if (this.first === 1) {
        this.page = this.page + 1
        let params = {
          token: this.token,
          page: this.page,
          pagesize: this.pagesize,
          first: this.first,
          qualification: this.qualification,
          province_id: this.province_id,
          type: this.type
        }
        searchquality(params).then((res) => {
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
      } else {
        this.shows_ = true
        this.page = this.page + 1
        this.option1 = [
          {
            text: '请选择', value: ''
          }
        ]
        let params = {
          token: this.token,
          page: this.page,
          pagesize: this.pagesize,
          first: this.first,
          qualification: this.qualification,
          province_id: this.province_id,
          type: this.type
        }
        searchquality(params).then((res) => {
          this.shows_ = false
          if (res.data.code === 2000) {
            this.first = 1
            this.list = [...this.list, ...res.data.data.data.data]
            this.provincelist = res.data.data.areas
            this.Tlist = res.data.data.qualifi_cate
            this.Tlist_.push([])
            this.Tlist_[0].text = '请选择'
            for (var j = 0; j < this.Tlist.length; j++) {
              this.Tlist_[0].push({
                text: this.Tlist[j].name,
                value: this.Tlist[j].id,
                level: this.Tlist[j].level,
                children: this.Tlist[j].children
              })
            }
            for (var i = 0; i < this.provincelist.length; i++) {
              this.option1.push({
                text: this.provincelist[i].name,
                value: this.provincelist[i].id
              })
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
    // 取消
    onCancel () {
      this.shows = false
    },
    // 确定
    onConfirm (value) {
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
      this.shows = false
    },
    // 条件
    bottomcomdi (index) {
      this.columns = this.Tlist_[index]
      this.shows = true
    },
    // 添加
    confirm_ () {
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
    },
    // 取消添加
    cancel_ () {
      this.Tlist_.splice(1, this.Tlist_.length - 1)
      this.Tlist_[0].text = '请选择'
    },
    // 点击添加条件
    addCondition () {
      this.show = true
    },
    // 清除条件
    cleancondition (index) {
      this.textvalue.splice(index, 1)
      this.textval.splice(index, 1)
      if (this.textvalue.length === 0) {
        this.isshowchecked = false
      }
    },
    // 搜索
    searchqua () {
      this.page = 1
      this.shows_ = true
      this.qualification = this.textval.join(',')
      if (this.checked === false) {
        this.type = 2
      } else {
        this.type = 1
      }
      let params = {
        token: this.token,
        page: this.page,
        pagesize: this.pagesize,
        first: this.first,
        qualification: this.qualification,
        province_id: this.province_id,
        type: this.type
      }
      searchquality(params).then((res) => {
        if (res.data.code === 2000) {
          this.list = res.data.data.data.data
          this.shows_ = false
          this.loading_ = false
          if (this.list.length >= res.data.data.data.total) {
            this.finished_ = true
          } else {
            this.finished_ = false
          }
        } else {
          this.shows_ = false
          this.$toast('搜索发生错误')
        }
      })
    },
    // 清空所有
    cleanall () {
      this.textvalue.splice(0, this.textvalue.length)
      this.textval.splice(0, this.textval.length)
      this.isshowchecked = false
    },
    // 条件的具备
    checkedchange (checked) {
      this.checked = checked
    },
    // 省
    provincechange (value) {
      this.province_id = value
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
  border-radius: 1rem;
  height: 2rem;
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

  .bgcs{
    background-color: transparent;
  }
</style>
