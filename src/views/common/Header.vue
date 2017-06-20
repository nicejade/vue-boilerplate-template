<template>
  <header class="header">
    <h1 class="logo">
      <a href="javascript:;">
        <img src="../../assets/images/logo.png" alt="dji">
        <span class="title">{{ $t('projectTitle') }}</span>
      </a>
    </h1>

    <a href="javascript:;" class="menu" @click="onToggleMenuClick" >
      <span></span>
    </a>

    <el-dropdown @command="handleCommand" class="operate" trigger="click">
      <a href="javascript:;" class="account">
        <icon name="account"></icon>
        <span>{{ user.username }}</span>
        <span class="caret"></span>
      </a>
      <el-dropdown-menu slot="dropdown" class="dropmenu">
        <el-dropdown-item  command="Switch">
          <icon class="icons" name="switch"></icon>{{ $t('switchLang') }}
        </el-dropdown-item>
        <el-dropdown-item divided command="Logout">
          <icon class="icons" name="logout"></icon>{{ $t('signOut') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
</template>

<script>
import Vue from 'vue'
import Cookies from 'js-cookie'

export default {
  name: 'header',

  data () {
    return {
      user: {}
    }
  },

  components: {
  },

  computed: {
  },

  methods: {
    handleCommand (item) {
      this[`on${item}Click`]()
    },

    /* ----------------------------On Click Event---------------------------- */
    onToggleMenuClick () {
      let app = document.getElementById('app')
      app.className = !app.className ? 'menu-expand' : ''
    },

    onLogoutClick () {
      this.$apis.user.logout().then(result => {
        Cookies.remove('isLogin')

        this.$store.commit('$vuexSetUserInfo', {})
        this.$router.push('/login')
      }).catch((err) => {
        this.$router.push('/')
        this.$message.error(err.msg)
      })
    },

    onSwitchClick () {
      let targetLang = this.$currentLang === 'zh' ? 'en' : 'zh'
      Cookies.set('lang', targetLang)
      Vue.config.lang = targetLang
    }
  }
}
</script>

<style type="text/css" lang="scss">
@import './../../assets/scss/variables.scss';
@import './../../assets/scss/mixins.scss';

#app .header {
  position: relative;
  z-index: 9;
  height: 60px;
  min-width: 320px;
  background-color: $blue;
  @include clearfix();

  a {
    &:hover, &:focus {
      text-decoration: none;
      span {
        text-decoration: none;
      }
    }
  }
  .logo {
    float: left;
    padding: 10px 0 8px 35px;

    img {
      display: inline-block;
      vertical-align: middle;
      width: 36px;
      height: auto;
      margin-right: 10px;
    }
  }
  .title {
    display: inline-block;
    vertical-align: middle;
    font-size: $font-large;
    color: #fff;
  }
  .menu {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px 15px 10px;
    width: 60px;
    height: 60px;
  }
  .notification {
    float: right;
    padding: 20px;

    &:hover {
      background-color: $dark-blue;
    }
  }
  .operate {
    float: right;
    position: relative;
    &:hover {
      .dropmenu {
        display: block;
        width: 100%;
        min-width: 150px !important;
      }
      > a {
        background-color: $dark-blue;
      }
    }
    > a {
      display: inline-block;
      padding: 20px;
      color: #fff;
    }
    .active {
      background-color: $dark-blue;
    }
    .avatar {
      display: inline-block;
      vertical-align: middle;
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
  }
}

.menu span:after, .menu span:before {
  content: "";
  position: absolute;
  left: 0;
  top: 9px;
}
.menu span:after {
  top: 18px;
}
.menu span {
  position: relative;
  display: block;
}
.menu span, .menu span:after, .menu span:before {
  width: 100%;
  height: 3px;
  background-color: #fff;
  -webkit-transition: all 0.3s;
  backface-visibility: hidden;
}
.menu-expand .menu span {
  background-color: transparent;
}
.menu-expand .menu span:before {
  transform: rotate(45deg) translate(2px, 2px);
}
.menu-expand .menu span:after {
  transform: rotate(-45deg) translate(4px, -5px);
}

@media (max-width:768px) {
  .header {
    .menu {
      display: block;
    }
    .logo {
      padding-left: 75px;
      text-align: center;

      img {
        margin-right: 5px;
      }
    }
    .operate {
      .account {
        max-width: 80px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
}
</style>
