<template lang="html">
  <transition name="modal">
    <div class="modal-mask" >
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="close" @click="$emit('close')">x</div>
          <div class="modal-header" >
            <slot name="header"></slot>
            <b-form-select v-model="selectedCap" class="mb-3 search-box" :options="insCap">
              <template slot="first">
                <!-- this slot appears above the options from 'options' prop -->
                <option :value="null" disabled>--Select Cap--</option>
              </template>
            </b-form-select>
            <!-- {{selectedCap}} -->
          </div>
          <div class="modal-body">
            <!-- <slot name="body"></slot> -->
            <b-form-group id="exampleInputGroup"
                          class="input-box"
                          description="">
              <b-form-input id="inputFormatter"
                            v-model="title"
                            type="text"
                            placeholder="Enter your title"
                            required
                            :formatter="format"></b-form-input>
            </b-form-group>
            <div>
               <b-form-textarea id="textarea1"
                                v-model="text"
                                placeholder="Enter something"
                                :rows="3"
                                :max-rows="6">
               </b-form-textarea>
               <!-- <pre class="mt-3">{{ text }}</pre> -->
             </div>
          </div>
          <div class="modal-footer">
            <slot name="footer">
            </slot>
            <b-button class="submit-btn" @click="comment">提交</b-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import { FormTextarea, FormGroup, FormInput, Button } from 'bootstrap-vue/es/components'
import {axios} from '@/lib'

Vue.use(FormGroup)
Vue.use(FormInput)
Vue.use(Button)
Vue.use(FormTextarea)

export default {
  data () {
    return {
      text: '',
      title: '',
      profile: {},
      errors: [],
      infn: [],
      selectedCap: ''
    }
  },
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
    },
    insCap: {
      type: Array,
      required: true
    }
  },
  created () {
    this.$bus.$on('profile', event => {
      this.profile = event.profile
      // console.log(event.profile)
      // console.log(event)
    })
  },
  methods: {
    comment () {
      console.log(this.userPk)
      if (this.text && this.title) {
        axios({
          method: 'post',
          url: `/api/add-comment/${this.selectedCap}/`,
          data: {
            com_con: this.text,
            com_title: this.title,
            mem: this.profile,
            ins: this.selectedCap
          }
        })
        .then(response => {
          // JSON responses are automatically parsed.
          this.info = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
    }
  },
  beforeDestroy () {
    // this.$bus.$off('profile')
  }
}
</script>

<style lang="scss" scoped>
// #textarea1 {
//   width: 300px;
// }
.subnit-btn {
  background-color: RGBA(71, 183, 132, 1.00);
  border-radius: 10%;
  border: none;
  &:hover {
    background-color: RGBA(100, 200, 150, 1.00);
  }
  &:active {
    background-color: RGBA(55, 71, 87, 1.00);
  }
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
    // .log-box .input-box {
    //   margin-bottom: 15px;
    // }
  }

  .modal-default-button {
    float: right;
  }
}

@media(max-width: 768px) {
  .modal-container {
    width: 300px;
  }
  // .log-box {
  //   width: 100%;
  // }
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
