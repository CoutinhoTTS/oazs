<template>
  <div style="padding: 0 0 3.125rem">
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <div class="about">
      <img src="../../assets/20190418013715944.png" alt="">
      <div>
        <p>
          成都筑为科技有限公司是一家国内领先的SaaS管理软件与服务平台提供商。
          筑为科技业务范围覆盖信息技术服务（ITO）、解决方案、业务流程外包（BPO）、
          IT基础设施服务（IMS）等，专注于为建筑行业、施工企业、监理企业、造价咨询公司、
          培训机构等行业客户提供包括软件产品、应用开发、管理咨询和系统集成在内的优质服务，
          帮助客户聚焦自身的核心业务发展，提升商业价值
        </p>
        <p>旗下主要产品包括：<span>筑为智慧软件</span>、<span>智慧证书管理系统</span>、<span>筑为网行业大数据平台等</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
export default {
  name: 'about',
  components: {NavBar},
  data () {
    return {
      tit: '关于'
    }
  }
}
</script>

<style scoped>
.about{
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.about>img{
  width: 60%;
  padding-top: 2rem;
}
.about>div{
  font-size: 0.8rem;
}
</style>
