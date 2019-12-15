<template>
  <div class="Title_"><span></span><span>{{Tname}}</span><van-icon name="arrow" v-if="isshow" @click.native="openrouter"/></div>
</template>

<script>
export default {
  name: 'Title',
  props: ['Tname', 'isshow', 'num', 'munu'],
  data () {
    return {}
  },
  methods: {
    openrouter () {
      if (this.num && !this.munu) {
        console.log(!this.munu)
        this.$router.push({
          path: `/${this.num}`
        })
      }
      if (this.num && this.munu) {
        this.$router.push({
          path: `/${this.num}`,
          query: {
            modenum: this.munu
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .Title_{
    width: 100vw;
    overflow: hidden;
    border-bottom: 0.065rem solid #f0f0f0;
  }
  .Title_>span:nth-child(1){
    display: inline-block;
    width:0.2rem;
    height: 0.8rem;
    background-color: #2dd5ff;
    float: left;
    margin: 0.75rem 0 0 1rem;
  }
  .Title_>span:nth-child(2){
    display: inline-block;
    font-size: 0.8rem;
    color: black;
    font-weight: bold;
    float: left;
    margin: 0.6rem 0.2rem ;
  }
  .Title_>i:last-child{
    display: inline-block;
    float: right;
    margin: 0.6rem 1rem ;
  }
</style>
