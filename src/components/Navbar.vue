<template lang="html">
  <b-navbar toggleable="md" type="light" fixed="top" variant="light" class="navbar">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand :to="{ name: 'IndexPage' }">
      <!-- <img class="logo-img" src="https://placekitten.com/g/30/30">  -->
      Logo.svg
    </b-navbar-brand>
    <b-collapse class="menu-group" is-nav id="nav_collapse">
      <b-navbar-nav>
        <router-link v-for="(link, index) in links" :to="{ name: link.name }" tag="li" :key="index">
          <b-nav-item>{{link.text}}</b-nav-item>
        </router-link>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto menu" v-show="!isLogin">
        <b-nav-item class="login" @click="login">{{ signInUp[0].signName }}</b-nav-item>
        <b-nav-item class="logup" @click="signup">{{ signInUp[1].signName }}</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto loginFont" v-show="isLogin">
        <router-link :to="{ name: 'Profile'}" tag="li">
          <b-nav-item class="proflie-box">
            {{profile.username}}
          </b-nav-item>
        </router-link>
        <b-nav-item @click="logout" class="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>

    <LoginModal v-if="showInModal" @close="showInModal = false">
      <h3 slot="header">{{signInUp[0].signAlias}}</h3>
      <div class="body" slot="body">
        <!-- <button type="button" class="fb-signin-button" @click="login">使用 Facebook 帳號登入</button> -->
      </div>
      <div class="footer" slot="footer">
        {{signInUp[0].message}}
        <a class="changeModal" @click="showInModal = false, showUpModal = true">{{signInUp[1].signName}}</a>
      </div>
    </LoginModal>

    <SignupModal v-if="showUpModal" @close="showUpModal = false">
      <h3 slot="header">{{signInUp[1].signAlias}}</h3>
      <div class="body" slot="body">
        <!-- <button type="button" class="fb-signin-button" @click="login">使用 Facebook 帳號註冊</button> -->
      </div>
      <div class="footer" slot="footer">
        {{signInUp[1].message}}
        <a class="changeModal" @click="showUpModal = false, showInModal = true">{{signInUp[0].signName}}</a>
      </div>
    </SignupModal>
  </b-navbar>

</template>

<script>
import Vue from 'vue'
import { Navbar } from 'bootstrap-vue/es/components'
import LoginModal from '@/components/LoginModal'
import SignupModal from '@/components/SignupModal'
// import '../assets/btn.js'

Vue.use(Navbar)

export default {
  data () {
    return {
      links: [
        {
          name: 'IndexPage',
          text: '首頁'
        },
        {
          name: 'TopInsPage',
          text: 'Top 熱門好去處'
        }
      ],
      signInUp: [
        {
          signName: '登入',
          signAlias: 'Login',
          message: '沒有帳號嗎？'
        },
        {
          signName: '註冊',
          signAlias: 'Sign Up',
          message: '已經有帳號嗎？'
        }
      ],
      showInModal: false,
      showUpModal: false,
      isLogin: false,
      profile: {}
    }
  },
  components: {
    LoginModal, SignupModal
  },
  created () {
    // 找 profile
    // let vm = this
    // this.isLogin = Object.keys(vm.profile).length
    this.$bus.$on('loginSuccess', event => {
      if (event.success) {
        console.log('登入成功')
      }
      this.isLogin = event.success
      this.showInModal = !event.success
    })

    this.$bus.$on('registerSuccess', event => {
      this.isLogin = event.success
      this.showUpModal = !event.success
      console.log('註冊成功')
    })

    this.$bus.$on('profile', event => {
      this.profile = event.profile
      // console.log('ccccccc')
      // console.log(event)
      console.log(this.profile)
    })
  },
  methods: {
    login () {
      this.$router.push('/profile')
      this.showInModal = true
    },
    signup () {
      this.$router.push('/profile')
      this.showUpModal = true
    },
    logout () {
      // let vm = this
      // vm.profile = {}
      // location.reload()
      this.isLogin = false
      this.$bus.$off('profile')
      this.$localStorage.remove('profile')
      this.profile = {}
      console.log('logup')
      this.$router.push({ path: '/' })
    }
  },
  beforeDestroy () {
    // [銷毀監聽事件]
    // 最好在组件銷毀前，清除所有監聽
    // 如果要指定哪個監聽對應方法，就需要傳入第二個參數(對應$on設定的方法)
    // this.$bus.$off('profile')
    this.$bus.$off('loginSuccess')
    this.$bus.$off('registerSuccess')
  }
}
</script>

<style lang="scss" scoped>

// .fb-signin-button {
//   /* This is where you control how the button looks. Be creative! */
//   display: inline-block;
//   padding: 4px 8px;
//   border-radius: 3px;
//   background-color: #4267b2;
//   color: #fff;
//   outline: none;
//   cursor: pointer;
//   &:hover {
//     background-color: RGBA(50, 80, 150, 1.00);
//   }
// }
// .profile-picture {
//   border-radius: 50%;
//   height: 20px;
//   width: 20px;
//   background-image: url('../assets/user.svg');
//   background-repeat: no-repeat;
//   background-position: center;
// }
.logo-img {
  border-radius: 50%;
}
.menu-group {
  font-size: 18px;

  .menu {
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 14px;
    .login, .logup, .logout {
      padding: 0 2px;
    }
  }
  .loginFont {
    font-size: 14px;
    .proflie-box {
      display: flex;

    }
  }
}
.changeModal {
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: RGBA(71, 183, 132, 1.00);
  }
}
.changeModal:hover {
  color: RGBA(71, 183, 132, 1.00);
}

</style>
