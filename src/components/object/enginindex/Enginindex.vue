<template>
  <div class="cartban">
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <div class="changes">
      <div>
        <div @click="changes_" :class="[year === 1 ? 'clicked_' : '']">今年</div>
        <div @click="changess_" :class="[year === 0 ? 'clicked_' : '']">全部</div>
      </div>
    </div>
    <!--项目看板-->
    <div id="objectban">
      <div>
        <div>项目总数</div>
        <div>
          <span style="color: yellow;font-size: 1.2rem">{{objectcont}}</span>
          <span>个</span>
        </div>
      </div>
      <div>
        <div>项目总额</div>
        <div>
          <span style="color: yellow;font-size: 1.2rem">{{objectmoney}}</span>
          <span>万元</span>
        </div>
      </div>
    </div>
    <!--项目类型-->
    <div id="objectlass"></div>
    <!--项目状态-->
    <div id="objectstatus"></div>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import {enginindexcount} from '../../../api/Api'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/pie')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  name: 'Enginindex',
  components: {NavBar},
  data () {
    return {
      tit: '项目看板',
      token: '',
      year: 1,
      objectcont: 0,
      objectmoney: 0,
      objectclass_: [],
      objectstate: []
    }
  },
  created () {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    this.thisdataall()
  },
  mounted () {
    this.objectclass()
    this.objectstates()
  },
  watch: {
    objectclass_ () {
      this.objectclass()
    },
    objectstate () {
      this.objectstates()
    }
  },
  methods: {
    thisdataall () {
      enginindexcount({token: this.token, year: this.year}).then((res) => {
        if (res.data.code === 2000) {
          this.objectcont = res.data.data.all
          this.objectmoney = res.data.data.money
          this.objectclass_ = res.data.data.type
          this.objectstate = res.data.data.state
        }
      })
    },
    // 项目类型
    objectclass () {
      let myChart = echarts.init(document.getElementById('objectlass'))
      // 绘制
      myChart.setOption({
        title: {
          text: '项目类型',
          x: 'center',
          top: 10,
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          x: 'center',
          y: 'bottom',
          textStyle: {
            fontSize: 12
          }
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: this.objectclass_,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    objectstates () {
      let myChart = echarts.init(document.getElementById('objectstatus'))
      // 绘制
      myChart.setOption({
        title: {
          text: '项目状态',
          x: 'center',
          top: 10,
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          x: 'center',
          y: 'bottom',
          textStyle: {
            fontSize: 12
          }
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: this.objectstate,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    // 今年
    changes_ () {
      this.year = 1
      this.thisdataall()
    },
    changess_ () {
      this.year = 0
      this.thisdataall()
    }
  }
}
</script>

<style scoped>
  .cartban{
    width: 96%;
    margin: 0 auto;
    padding-top:5rem;
    padding-bottom: 3rem;
  }
  #objectban{
    height: 20vh;
    margin: 0.8rem 0;
    background-color: #30b1ff;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  #objectban>div>div{
    text-align: center;
    margin: 1rem 0;
    color: white;
  }
  #objectlass{
    height: 40vh;
    margin: 0.8rem 0;
    border: 0.065rem solid rgba(0, 0, 0, 0.23);
    border-radius: 0.5rem;
  }
  #objectstatus{
    height: 40vh;
    margin: 0.8rem 0;
    border: 0.065rem solid rgba(0, 0, 0, 0.23);
    border-radius: 0.5rem;
  }
  .changes{
    width: 100%;
    background-color: #fff;
    position: fixed;
    top: 2.875rem;
    left:0;
    z-index: 100;
  }
  .changes>div{
    width: 96%;
    height: 2rem;
    margin: 0.2rem auto 0;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border: 0.065rem solid rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
  }
  .changes>div>div{
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 2rem;
  }
  .clicked_{
    background-color: rgba(43, 177, 255, 0.81);
    color: white;
  }
</style>
