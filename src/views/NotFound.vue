<template>
  <div class="page-error">
    <div class="box">
      <div class="pic">
        <img src="../assets/images/404.png" alt=""></div>
      <div class="info">
        <h1>404</h1>
        <h4>返回首页</h4>
        <el-button type="primary" @click.native="back">抱歉，该页面不存在</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  name: 'not-found',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    back () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss">
.page-error {
  color: #707473;
  text-align: center;
  .box{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 360px;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .pic{
    float: left;
  }
  .info{
    float: right;
  }
  img{
    width: 157px;
  }
  h1 {
    font-size: 64px;
  }
  h4 {
    font-size: 16px;
    margin-bottom: 20px;
  }
}
</style>
