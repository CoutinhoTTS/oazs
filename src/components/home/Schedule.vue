<template>
    <div class="schedule">
      <Title :Tname="Tname" :isshow="isshow" :num="num" :munu="munu"></Title>
      <!--<van-panel title="2015年5月1日">-->
        <!--<div class="schedule_s">-->
          <!--<div>福IE时软件分类实际付款蓝色飓风破二十几偶尔输入荆防颗粒色见覅偶二色iOS发窘斐林试剂斐林试剂覅偶尔接生婆费劲儿配送费</div>-->
          <!--<span>15:20</span>-->
        <!--</div>-->
      <!--</van-panel>-->
    </div>
</template>

<script>
import Title from '@/components/title/Title'
// import {schedulepage} from '../../api/Api'
export default {
  name: 'Schedule',
  components: {
    Title
  },
  data () {
    return {
      list: [121, 1212, 1212, 1211, 65565],
      Tname: '我的日程',
      isshow: true,
      num: 'schedulepage',
      munu: 'schedulepage'
    }
  },
  created () {
    // let params = {
    //   token: this.token,
    //   page: 1,
    //   pagesize: 5,
    // }
    // schedulepage().then((res) => {})
  }
}
</script>

<style scoped>
.schedule{
  width: 100%;
  background-color: #fff;
  margin-top: 1rem;
  margin-bottom: 10vh;
}

  .van-panel__content{
    padding: 10px 15px;
  }
  .van-panel__header{
    font-size: 0.6rem;
    padding: 1px 15px;
    background-color: #f1f1f1;
  }
  .schedule_s{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
  }
.schedule_s>div{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.schedule_s>span{
  color:#75c2ea;
}
</style>
