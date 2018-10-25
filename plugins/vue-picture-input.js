import Vue from 'vue'
import PictureInput from 'vue-picture-input'

const vPictureInput = {
  install(Vue) {
    Vue.component('PictureInput', PictureInput)
  }
}
Vue.use(vPictureInput)
