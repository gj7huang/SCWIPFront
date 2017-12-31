
<template lang="html">
  <transition name="modal">
    <div class="modal-mask" >
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="close" @click="$emit('close')">x</div>
          <div class="modal-header" >
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <!-- <slot name="body"></slot> -->
            <div class="log-box">
              <label>註冊此APP帳號</label>
              <b-form-group id="exampleInputGroup1"
                            class="input-box"
                            description="">
                <b-form-input id="inputFormatterN"
                              type="text"
                              v-model="signout.username"
                              v-bind:class="{ 'error-box': nameHasError }"
                              required
                              placeholder="Enter your Name"
                              :formatter="format"></b-form-input>
              </b-form-group>
              <!-- <p>Value: {{ signout.signupName }}</p> -->
              <b-form-group id="exampleInputGroup2"
                            class="input-box"
                            description="">
                <b-form-input id="inputFormatterE"
                              type="email"
                              v-bind:class="{ 'error-box': emailHasError }"
                              v-model="signout.email"
                              required
                              placeholder="Enter your Email"
                              :formatter="format"></b-form-input>
              </b-form-group>
              <!-- <p>Value: {{ signout.signupEmail }}</p> -->

              <b-form-group id="exampleInputGroup3"
                            class="input-box"
                            description="">
                <b-form-input id="inputLazy1"
                              type="password"
                              v-bind:class="{ 'error-box': pwd1HasError }"
                              v-model="signout.password1"
                              required
                              placeholder="Enter your Password"
                              :formatter="format"></b-form-input>
              </b-form-group>
              <!-- <p>Value: {{ signout.signupPassword }}</p> -->
              <b-form-group id="exampleInputGroup4"
                            class="input-box"
                            description=""
                            invalid-feedback="inCheckPwdAg"
                            valid-feedback="checkPwdAg">
                <b-form-input id="inputLazy2"
                              type="password"
                              v-bind:class="{ 'error-box': pwd2HasError }"
                              v-model="signout.password2"
                              required
                              placeholder="Enter your Password Again"
                              :formatter="format"></b-form-input>
              </b-form-group>
              <!-- <p>Value: {{ signupPasswordAg }}</p> -->
              <p class="error">{{ errors }}</p>
              <b-button @click="register" class="sign-btn" size="sm" variant="success">註冊</b-button>
            </div>
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// import FbLogin from '@/components/FbLogin'
// import Vue from 'vue'
// import FBSignInButton from 'vue-facebook-signin-button'

// Vue.use(FBSignInButton)
import Vue from 'vue'
import {axios} from '@/lib'
import { FormGroup, FormInput, Button } from 'bootstrap-vue/es/components'

Vue.use(FormGroup)
Vue.use(FormInput)
Vue.use(Button)

export default {
  props: {
    header: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: 'Default body'
    },
    footer: {
      type: String,
      default: 'Default footer'
    }
  },
  data () {
    return {
      // type: [ email, password ],
      signout: {
        username: '',
        email: '',
        password1: '',
        password2: ''
      },
      errors: '',
      profile: {},
      nameHasError: false,
      emailHasError: false,
      pwd1HasError: false,
      pwd2HasError: false
    }
  },
  methods: {
    format (value, event) {
      return value.toLowerCase()
    },
    register () {
      // axios
      // let profile = {}
      if (!(this.signout.username && this.signout.email && this.signout.password1 && this.signout.password2)) {
        if (!this.signout.username) {
          this.nameHasError = true
        }
        if (!this.signout.email) {
          this.emailHasError = true
        }
        if (!this.signout.password1) {
          this.pwd1HasError = true
        }
        if (!this.signout.password2) {
          this.pwd2HasError = true
        }
        this.errors = '欄位不得為空'
      } else if (!(this.signout.password1.length > 7) && (this.signout.password2.length > 7)) {
        this.pwd1HasError = true
        this.pwd2HasError = true
        this.errors = '密碼長度大於8字元'
      } else if (this.signout.password1 !== this.signout.password2) {
        this.pwd1HasError = true
        this.pwd2HasError = true
        this.errors = '2組密碼不合'
      } else {
        axios({
          method: 'post',
          url: '/api/register/',
          data: this.signout
        })
        .then(response => {
          // JSON responses are automatically parsed.
          this.profile = response.data
          this.$bus.$emit('profile', this.profile)
          this.login()
          // this.$bus.$emit('registerSuccess', { success: true })
          this.pwd1HasError = false
          this.pwd2HasError = false
          this.emailHasError = false
          this.nameHasError = false
        })
        .catch(e => {
          console.log(e)
          this.errors = '錯誤請從新輸入'
          this.signout.username = ''
          this.signout.email = ''
          this.signout.password1 = ''
          this.signout.password2 = ''
          // this.$bus.$emit('registerSuccess', { success: false })
        })
      }
    },
    login () {
      axios({
        method: 'post',
        url: '/api/login/',
        data: {
          username: this.signout.username,
          email: this.signout.email,
          password: this.signout.password1
        }
      })
      .then(response => {
        // JSON responses are automatically parsed.
        this.profile = response.data.user
        console.log(this.profile)
        this.$bus.$emit('profile', {profile: this.profile})
        this.$bus.$emit('registerSuccess', { success: true })
        // this.$bus.$emit('loginSuccess', { success: true })
      })
      .catch(e => {
        this.errors = e
        console.log(this.errors)
        this.$bus.$emit('registerSuccess', { success: true })
      })
    },
    checkPwdAg () {
      if (this.signupPasswordAg === this.signout.signupPasswordAg) {
        return ''
      }
    },
    inCheckPwdAg () {
      if (this.signupPasswordAg !== this.signout.signupPasswordAg) {
        return 'Enter again'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.log-box {
  // display: flex;
  // flex-direction: column;
  margin: 0 auto;
  width: 70%;
}
.sign-btn {
  width: 100%;
}
.error {
  font-size: 12px;
  color: red;
}
.error-box {
  border-color: red;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  display: flex;
  flex-direction: column;
  width: 500px;
  margin: 0px auto;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }
  .close {
    align-self: flex-end;
  }
  .modal-body {
    margin: 20px 0;
    .log-box .input-box {
      margin-bottom: 15px;
    }
  }

  .modal-default-button {
    float: right;
  }
}

@media(max-width: 768px) {
  .modal-container {
    width: 300px;
  }
  .log-box {
    width: 100%;
  }
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
