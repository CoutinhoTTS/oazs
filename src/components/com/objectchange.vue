<template>
    <div class="ass">
      <div>
        <form action="/">
          <van-search
            v-model="keyword"
            :placeholder="placeholder"
            show-action
            shape="round"
          >
            <div slot="action" @click="onSearch">搜索</div>
          </van-search>
        </form>
      </div>
      <div style="overflow: auto;height: 100%">
        <!--列表-->
        <div  class="objectList_">
          <div class="objectList" >
            <div v-for="(item, index) in list" :key="index" @click="changeok(item)">
              <div><span>项目名称:</span><span>{{item.name}}</span></div>
              <div><span>类型:</span><span>{{item.type}}</span></div>
              <div><span>项目地址:</span><span>{{item.address}}</span></div>
              <div>
                <div><span>计划工期:</span><span>{{item.duration}}</span></div>
                <div><span>工程造价:</span><span>{{item.money}}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <van-pagination
          v-model="page"
          :total-items="totalitems"
          :show-page-size="3"
          force-ellipses
          @change="pagechange"
        />
      </div>
    </div>
</template>
<script>
import {getenginproject} from '../../api/Api'
export default {
  name: 'objectchange',
  components: {
  },
  props: ['token'],
  data () {
    return {
      page: 1,
      pagesize: 10,
      keyword: '',
      totalitems: 1,
      placeholder: '请输入搜索项目',
      value: '',
      list: []
    }
  },
  created () {
    this.searchall()
  },
  methods: {
    onSearch () {
      this.searchall()
    },
    searchall () {
      let param = {
        token: this.token,
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword
      }
      getenginproject(param).then((res) => {
        if (res.data.code === 2000) {
          this.list = res.data.data.data
          this.totalitems = res.data.data.total
        }
      })
    },
    pagechange (value) {
      this.page = value
      this.searchall()
    },
    changeok (item) {
      this.$emit('objectchanges', item)
    }
  }
}
</script>

<style scoped>
.objectList{
  width: 100%;
}
.objectList>div{
  width: 98%;
  border-radius: 0.4rem;
  background-color: rgba(160, 250, 255, 0.41);
  margin: 0.5rem auto;
  font-size: 0.9rem;
}
.objectList>div>div{
  padding: 0.1rem 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
  .ass{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
.ass>div{
  width: 100%;
}
</style>
