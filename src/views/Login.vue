<template>
  <div class="login-wrap">
    <div class="login-box">
      <img src="../assets/images/logo.png" alt="">
      <h1 class="heading">{{ $t('projectTitle') }}</h1>
      <el-form :model="account" :rules="rules" ref="validateForm">
        <el-form-item prop="username">
          <el-input v-model="account.username" :placeholder="$t('username')"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="account.password" type="password"
            :placeholder="$t('password')" @keydown.enter.native="onLoginClick">
          </el-input>
        </el-form-item>
        <el-button type="primary" size="large"
          :loading="isLoading"
          @click="onLoginClick">{{ $t('signIn') }}
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        isLoading: false,
        account: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {
              required: true,
              message: this.$t('pleaseEnter') + this.$t('username'),
              trigger: 'change,blur'
            }
          ],
          password: [
            {
              required: true,
              message: this.$t('pleaseEnter') + this.$t('password'),
              trigger: 'change,blur'
            }
          ]
        }
      }
    },

    mounted () {
    },

    components: {
    },

    computed: {
    },

    methods: {
      onLoginClick () {
        this.$refs['validateForm'].validate((valid) => {
          if (valid) {
            let postData = this.account
            this.isLoading = true
            this.$apis.user.login(postData).then((result) => {
              // Here U can Call the method to get updated to your user information
              // this.$store.commit('$vuexSetUserInfo')
              this.$router.push('/')
            }).catch((err) => {
              this.$router.push('/demo/form')
              this.$message.error(err.msg)
            }).fin(() => {
              this.isLoading = false
            })
          } else {
            this.$router.push('/demo/form')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/mixins.scss";

.login-wrap {
  width: 520px;
  margin: 0 auto;
  padding-top: 150px;
  min-height: 400px;
  position: relative;
}
.login-box {
  width: 520px;
  padding: 30px;
  height: 100%;
  background-color: #fff;
  clear: both;
  display: table;
  border-radius: 3px;
  border: 1px solid #d7dce5;
  .heading{
    text-align: center;
    margin-bottom: 30px;
    font-size: 24px;
    color: #707473;
  }
  img{
    display: block;
    width: 80px;
    margin: 0 auto 20px;
  }
  .el-form-item{
    margin-bottom: 30px;
  }
  .el-button--primary{
    display: block;
    width: 100%;
    margin: 0 auto;
  }
}

@media (max-width: 667px) {
  .login-wrap {
    margin-top: 0;
    width: 350px ;
  }
  .login-box {
    width: 350px;
  }
}

@media (max-width:320px) {
  .login-wrap {
    width: 100%;
    padding-top: 60px;
  }
  .login-box {
    width: 100%;
    border: 0 none;
  }
}
</style>
