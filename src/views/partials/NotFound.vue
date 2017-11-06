<template>
  <div class="error-404">
    <div class="error-404-body">
      <el-card>
        <div class="error-404-body-title">4<span><icon class="zero-icon" name="zero"></icon></span>4</div>
        <p class="error-404-body-message">YOU&nbsp;&nbsp;LOOK&nbsp;&nbsp;LOST</p>
        <div class="error-404-btns">
          <el-button @click="onGoHomeClick" :plain="true" size="large" type="info">返回首页</el-button>
          <el-button @click="onBackPageClick" :plain="true" size="large" ttype="info">返回上一页</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',

  methods: {
    onBackPageClick() {
      this.$router.go(-1)
    },
    onGoHomeClick() {
      this.$router.push('/')
    }
  }
}
</script>

<style type="text/css" lang="scss">
@keyframes error-404-animation {
  0% {
    transform: rotateZ(0deg);
  }
  20% {
    transform: rotateZ(-60deg);
  }
  40% {
    transform: rotateZ(-10deg);
  }
  60% {
    transform: rotateZ(50deg);
  }
  80% {
    transform: rotateZ(-20deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
.error-404-body {
  width: 100%;
  max-width: 600px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  padding: 20px 0;
  margin-bottom: 40px;
  .error-404-body-title{
    text-align: center;
    font-size: 8rem;
    font-weight: 700;
    color: #2d8cf0;
    height: 13rem;
    line-height: 13rem;
    span{
      display: inline-block;
      color: #19be6b;
      font-size: 8rem;
      animation: error-404-animation 3s ease 0s infinite alternate;
    }
    .zero-icon{
      width: 7rem;
      height: 7rem;
    }
  }
  .error-404-body-message {
    display: block;
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 12px;
    color: #dddde2;
  }
}
</style>
