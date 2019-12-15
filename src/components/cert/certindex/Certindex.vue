<template>
  <div class="cartban">
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <!--证书概览-->
    <div id="cartall"></div>
    <!--证书分类-->
    <div id="certclass"></div>
    <!--人员-->
    <div id="certperson"></div>
    <!--证书预警-->
    <div id="certyujing"></div>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import {certindex} from '../../../api/Api'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  name: 'Certindex',
  components: {NavBar},
  data () {
    return {
      tit: '证书首页',
      token: '',
      // 证书首页
      // 证书概览
      certall: '',
      gailanname: [],
      gailanvalue: [],
      // 证书分类
      cert_classname: [],
      cert_classvalue: [],
      // 人员
      person: [],
      // 证书预警
      expire: []
    }
  },
  created () {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    certindex({token: this.token}).then((res) => {
      if (res.data.code === 2000) {
        this.certall = res.data.data.certall
        this.gailanname = res.data.data.gailan.name
        this.gailanvalue = res.data.data.gailan.value
        this.cert_classname = res.data.data.cert_class.name
        this.cert_classvalue = res.data.data.cert_class.value
        this.person = res.data.data.person
        this.expire = res.data.data.expire
      }
    })
  },
  mounted () {
    this.cartsall()
    this.cartsclass()
    this.cartsperson()
    this.cartexpire()
  },
  watch: {
    gailanname () {
      this.cartsall()
    },
    certall () {
      this.cartsall()
    },
    cert_classname () {
      this.cartsclass()
    },
    cert_classvalue () {
      this.cartsclass()
    },
    person () {
      this.cartsperson()
    },
    expire () {
      this.cartexpire()
    }
  },
  methods: {
    cartsall () {
      let myChart = echarts.init(document.getElementById('cartall'))
      let gailan = this.gailanname
      let gailanval = this.gailanvalue
      // 绘制
      myChart.setOption({
        title: {text: `证书概览(${this.certall}本)`, top: 10, x: 'center', textStyle: {fontSize: 14}},
        grid: {x: 40},
        tooltip: {},
        xAxis: {
          // data: odataArr
          data: gailan,
          axisLabel: {
            interval: 0,
            rotate: 20
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {formatter: '{value}本'}
        },
        series: [{
          name: '销量',
          // 折线图 可以自定义bar柱状图
          data: gailanval,
          barWidth: '40%',
          type: 'bar',
          itemStyle: {
            normal: {
              // 随机显示
              color: function (d) {
                return '#' + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16)
              },
              label: {
                show: true, // 开启显示
                position: 'top', // 在上方显示
                textStyle: { // 数值样式
                  color: 'black',
                  fontSize: 12
                }
              }
            }
          }
        }]
      })
    },
    cartsclass () {
      let myChart = echarts.init(document.getElementById('certclass'))
      // 绘制
      myChart.setOption({
        title: {text: `证书分类`, top: 10, x: 'center', textStyle: {fontSize: 14}},
        grid: {x: 60},
        tooltip: {},
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            interval: 0,
            rotate: 20
          },
          data: this.cert_classname
        },
        yAxis: {
          type: 'value',
          axisLabel: {formatter: '{value}本'}
        },
        series: [{
          data: this.cert_classvalue,
          type: 'line',
          areaStyle: {
            color: ['rgba(48, 177, 255, 0.5)']
          },
          label: {
            show: true, // 开启显示
            position: 'top', // 在上方显示
            textStyle: { // 数值样式
              color: 'black',
              fontSize: 12
            }
          }
        }]
      })
    },
    cartsperson () {
      let myChart = echarts.init(document.getElementById('certperson'))
      console.log(this.person)
      // 绘制
      myChart.setOption({
        title: {
          text: '人员统计',
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
            name: '人员统计',
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: this.person,
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
    cartexpire () {
      let myChart = echarts.init(document.getElementById('certyujing'))
      // 绘制
      myChart.setOption({
        title: {
          text: '证书预警',
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
            name: '人员统计',
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: this.expire,
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
    }
  }
}
</script>

<style scoped>
.cartban{
  width: 96%;
  margin: 0 auto;
  padding-top:3rem;
  padding-bottom: 3.25rem;
}
#cartall{
  height: 40vh;
  /*background-color: rgba(158, 250, 255, 0.19);*/
  border: 0.065rem solid rgba(0, 0, 0, 0.23);
  border-radius: 0.5rem;
}
#certclass{
  height: 40vh;
  margin: 0.8rem 0;
  /*background-color: rgba(158, 250, 255, 0.19);*/
  border: 0.065rem solid rgba(0, 0, 0, 0.23);
  border-radius: 0.5rem;
}
  #certperson{
    height: 40vh;
    margin: 0.8rem 0;
    /*background-color: rgba(26, 255, 0, 0.31);*/
    border: 0.065rem solid rgba(0, 0, 0, 0.23);
    border-radius: 0.5rem;
  }
  #certyujing{
    height: 40vh;
    margin: 0.8rem 0;
    /*background-color: rgba(255, 250, 187, 0.33);*/
    border: 0.065rem solid rgba(0, 0, 0, 0.23);
    border-radius: 0.5rem;
  }
</style>
