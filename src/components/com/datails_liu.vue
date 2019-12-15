<template>
   <div>
     <van-collapse v-model="activeName" accordion>
       <van-collapse-item :title="cont" name="1">
         <div v-for="(item, index) in getreadsandlog.flow_log" :key="index" class="getreadsandlogList">
           <div>
             <div>
               <span :class="[item.name === '编辑' ? 'bg_c':item.name === '提交' ? 'bg_c_':'bg_c__']">{{item.name}}</span>
             </div>
             <div>
               <span>处理人:</span><span v-html="item.checkname"></span>
             </div>
           </div>
           <div>
             <div>
               <span>状态:</span><span v-html="item.statusname"></span>
             </div>
             <div>
               <span>时间:</span><span>{{item.optdt}}</span>
             </div>
           </div>
           <div class="ex">
             <div>
               <span>说明:</span><span>{{item.explain}}</span>
             </div>
           </div>
         </div>
       </van-collapse-item>
       <van-collapse-item title="审核" name="2" :disabled="len">
         <div class="examine">
           <div>
             <div>
               <div>状态:</div><div v-if="isoks" v-html="this.getreadsandlog.auditing.sname"></div>
             </div>
             <div>
               <div>处理流程:</div><div v-if="isoks" v-html="this.getreadsandlog.auditing.handle"></div>
             </div>
           </div>
           <div v-if="isshow_">
             <div>
               <div>当前处理:</div><div v-if="isoks" v-html="this.getreadsandlog.auditing.current_handle"></div>
             </div>
             <div>
               <div><span class="requir">*</span>处理动作:</div>
               <van-radio-group v-model="radio" @change="Onchange" v-if="isshow_3">
                 <van-radio name="1" >同意</van-radio>
                 <van-radio name="0">不同意</van-radio>
               </van-radio-group>
               <van-radio-group v-model="radio" @change="Onchange" v-if="isshow_1">
                 <van-radio name="1" >已完成</van-radio>
                 <van-radio name="0">无法完成</van-radio>
                 <van-radio name="2">执行中</van-radio>
               </van-radio-group>
               <van-radio-group v-model="radio" @change="Onchange" v-if="isshow_2">
                 <van-radio name="1" >面试通过</van-radio>
                 <van-radio name="2">面试失败</van-radio>
                 <van-radio name="3">面试取消</van-radio>
               </van-radio-group>
             </div>
             <div>
               <van-cell-group>
                 <van-field
                   label="说明"
                   type="textarea"
                   placeholder="请输入说明"
                   rows="1"
                   autosize
                   @blur="onblur"
                   :value="value"
                 />
               </van-cell-group>
             </div>
             <div class="btn_">
               <van-button type="info" size="small" @click="btntj">提交处理</van-button>
             </div>
           </div>
         </div>
       </van-collapse-item>
       <van-collapse-item title="查阅记录" name="3">
         <div class="reads">
           <div v-for="(item, index) in getreadsandlog.reads" :key="index">
             <div><span>{{item.realname}}</span><span>共查阅记录(次):{{item.stotal}}</span></div>
             <div><span>最后一次查阅时间:{{item.optdt}}</span></div>
           </div>
         </div>
       </van-collapse-item>
     </van-collapse>
   </div>
</template>

<script>
import {examinebill} from '../../api/Api'
export default {
  name: 'datails_liu',
  data () {
    return {
      getreadsandlog: '',
      activeName: '0',
      cont: '处理记录()',
      len: false,
      message: '',
      radio: '1',
      isshow_: false,
      value: '',
      modenum: '',
      isshow_1: false,
      isshow_2: false,
      isshow_3: true,
      isoks: false,
      token: '',
      mid: '',
      agree: ''
    }
  },
  created () {
  },
  methods: {
    datails_liu (e, mun, id, token) {
      this.modenum = mun
      this.mid = id
      this.token = token
      this.getreadsandlog = e
      this.cont = `处理记录(${this.getreadsandlog.flow_log.length})`
      if (this.getreadsandlog.auditing.length === 0) {
        this.len = true
      }
      if (this.getreadsandlog.auditing.current_handle) {
        this.isshow_ = true
      }
      // if (this.getreadsandlog.auditing.handle) {
      //   this.getreadsandlog.auditing.handle = (((this.getreadsandlog.auditing.handle || '').split('>')[1]) || '').split('<')[0]
      // }
      if ((this.modenum === 'work' || this.modenum === 'bid_work') &&
        (this.getreadsandlog.auditing.status === '3' || this.getreadsandlog.auditing.status === '4')) {
        this.isshow_1 = true
        this.isshow_2 = false
        this.isshow_3 = false
      } else if (this.modenum === 'hrdemintview') {
        this.isshow_1 = false
        this.isshow_2 = true
        this.isshow_3 = false
      } else {
        this.isshow_1 = false
        this.isshow_2 = false
        this.isshow_3 = true
      }
      this.isoks = true
    },
    Onchange (e) {
      this.radio = e
    },
    onblur (value) {
      this.value = value.path[0].value
    },
    btntj () {
      if (this.value) {
        let params = {
          token: this.token,
          mid: this.mid,
          modenum: this.modenum,
          explain: this.value,
          agree: this.radio
        }
        examinebill(params).then((res) => {
          if (res.data.code === 2000) {
            this.$toast('审批完成')
            setTimeout(() => {
              this.$router.go(-1)
            }, 500)
          }
        })
      } else {
        this.$toast('请填写说明')
      }
    }
  }
}
</script>

<style scoped>
.getreadsandlogList{
  color: black;
  padding: 0.5rem;
  background-color: #f5f5f5;
  border-radius: 0.2rem;
  margin: 0.2rem;
}
.getreadsandlogList>div{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  word-wrap:break-word
}
.getreadsandlogList>div>div{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  word-wrap:break-word
}
  .reads{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.5rem;
    background-color: #f5f5f5;
    color: black;
    margin: 0.2rem;
  }
  .reads>div{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
.reads>div>div{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.3rem auto;
}
.reads>div>div>img{
  max-width: 3rem;
}
.ex{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
.ex>div{
  width: 100%
}
.ex>div>span:nth-child(2){
  max-width: 85%;
}
  /*审核流程*/
  .examine{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
  }
.examine>div{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.2rem;
  background-color: #f5f5f5;
  border-radius: 0.2rem;
  padding: 0.5rem;
}
.examine>div:first-child>div{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin:0.4rem;
}
.examine>div:last-child>div:nth-child(1),
.examine>div:last-child>div:nth-child(2){
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin:0.4rem;
}
.examine>div:first-child>div>div:first-child{
  width: 30%;
}
.examine>div:last-child>div:nth-child(1)>div:first-child,
.examine>div:last-child>div:nth-child(2)>div:first-child{
  width: 30%;
}
.examine>div:first-child>div>div:last-child{
  width: 65%;
  text-align: right;
}
.examine>div:last-child>div:nth-child(1)>div:last-child,
.examine>div:last-child>div:nth-child(2)>div:last-child{
  width: 65%;
  text-align: right;
}
.examine>div:last-child>div:nth-child(3){
  width: 100%;
  border-radius: 0.2rem;
}
  .van-radio-group{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  .btn_{
    width: 100%;
    padding: 0.5rem;
    text-align: right;
  }
  .van-radio{
    margin: 0.3rem 0;
  }
</style>
