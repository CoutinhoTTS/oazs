<template>
  <div>
    <van-collapse  v-model="activeName" accordion >
      <van-collapse-item  v-for="(item, index) in datas" :key="index" :name="(index + 1)">
        <div slot="title">{{item.name}}</div>
        <div class="dealwithban" >
          <ul>
            <li v-for="(items, indexs) in item.child" :key="indexs" :data-id="items.id"><i class="fa fa-angle-double-right"></i>{{items.name}}</li>
          </ul>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
export default {
  name: 'Dealwithban',
  data () {
    return {
      activeName: '1',
      datas: [
        {
          id: 1,
          name: '投标信息',
          child: [
            {
              id: 101,
              name: '金佛二手房果然是开发了司法局'
            },
            {
              id: 102,
              name: '金佛二手房果然是开发了司法局'
            },
            {
              id: 103,
              name: '金佛二手房果然是开发了司法局'
            }
          ]

        },
        {
          id: 1,
          name: '投标信息',
          child: [
            {
              id: 101,
              name: '金佛二手房果然是开发了司法局'
            },
            {
              id: 102,
              name: '金佛二手房果然是开发了司法局'
            },
            {
              id: 103,
              name: '金佛二手房果然是开发了司法局'
            }
          ]

        },
        {
          id: 1,
          name: '投标信息',
          child: [
            {
              id: 101,
              name: '金佛二手房果然是开发了司法局'
            },
            {
              id: 102,
              name: '金佛二手房果然是开发了司法局'
            },
            {
              id: 103,
              name: '金佛二手房果然是开发了司法局'
            }
          ]

        }
      ]
    }
  }
}
</script>

<style scoped>
.dealwithban{
  width: 90%;
  margin: 0 auto;
  border: none;
  border-radius: 0.6rem;
  background-color: rgba(135, 215, 255, 0.46);
  padding: 0.5rem;
}
.dealwithban>ul>li{
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #f0f0f0;
  color: #008ddd;
}
.dealwithban>ul>li>i{
  margin-right: 0.2rem;
}
</style>
