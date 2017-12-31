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
              <label>登入此APP帳號</label>
              <b-form-group id="exampleInputGroup3"
                            class="input-box"
                            description="">
                <b-form-input id="inputFormatter3"
                              type="text"
                              v-model="signin.username"
                              v-bind:class="{ 'error-box': nameHasError }"
                              required
                              placeholder="Enter your Name"
                              :formatter="format"></b-form-input>
              </b-form-group>
              <!-- <p>Value: {{ signin.username }}</p> -->

              <b-form-group id="exampleInputGroup1"
                            class="input-box"
                            description="">
                <b-form-input id="inputFormatter"
                              type="email"
                              v-model="signin.email"
                              required
                              placeholder="Enter your email(option)"
                              :formatter="format"></b-form-input>
              </b-form-group>
              <!-- <p>Value: {{ signin.email }}</p> -->

              <b-form-group id="exampleInputGroup2"
                            class="input-box"
                            description="">
                <b-form-input id="inputLazy"
                              v-bind:class="{ 'error-box': passwordHasError }"
                              v-model="signin.password"
                              type="password"
                              placeholder="Enter your Password"
                              :formatter="format"
                              lazy-formatter></b-form-input>
              </b-form-group>
              <!-- <p>Value: {{ signin.password }}</p> -->

            </div>
            <p class="error">{{ errors }}</p>
            <b-button class="logn-btn" size="sm" variant="success" @click="login">登入</b-button>
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
import Vue from 'vue'
import { FormGroup, FormInput, Button } from 'bootstrap-vue/es/components'
import {axios} from '@/lib'
// import axios from 'axios'
// import VueLocalStorage from 'vue-localstorage'

Vue.use(FormGroup)
Vue.use(FormInput)
Vue.use(Button)
// Vue.use(VueLocalStorage)

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
      profile: '',
      signin: {
        username: '',
        email: '',
        password: ''
      },
      errors: '',
      nameHasError: false,
      passwordHasError: false,
      allHasError: false
    }
  },
  methods: {
    format (value, event) {
      return value.toLowerCase()
    },
    getProfile () {
      // let profile = {}
      if (this.signin.username.length && this.signin.password.length) {
        axios({
          method: 'post',
          url: '/api/login/',
          data: this.signin
        })
        .then(response => {
          // JSON responses are automatically parsed.
          this.profile = response.data.user
          console.log(this.profile)
          Vue.localStorage.set('profile', JSON.stringify(this.profile))
          // let p = JSON.parse(Vue.localStorage.get('profile'))
          // console.log(p)

          this.$bus.$emit('profile', {profile: this.profile})
          this.$bus.$emit('loginSuccess', { success: true })
        })
        .catch(e => {
          this.errors = e
          console.log(this.errors)
          this.$bus.$emit('loginSuccess', { success: false })
          this.errors = '錯誤請再輸入一次'
          this.signin.username = ''
          this.signin.email = ''
          this.signin.password = ''
        })
      } else if (this.signin.username.length && !this.signin.password.length) {
        this.passwordHasError = true
        this.nameHasError = false
      } else if (!this.signin.username.length && this.signin.password.length) {
        this.nameHasError = true
        this.passwordHasError = false
      } else {
        this.nameHasError = true
        this.passwordHasError = true
      }
    },
    login () {
      // errors = ''
      // profile
      this.getProfile()
    }
  }
}
</script>

<style lang="scss" scoped>
.log-box {
//   display: flex;
//   flex-direction: column;
  margin: 0 auto;
  width: 70%;
}
.logn-btn {
  width: 70%;
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
