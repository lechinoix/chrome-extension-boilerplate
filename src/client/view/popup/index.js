import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Popup from './Popup.vue'
import 'vue-material/dist/vue-material.min.css'
import 'shared/style/vue-style.scss'
import I18n from 'shared/services/I18n'
import { PAGE_NAMES } from 'shared/constants'

Vue.config.productionTip = false

Vue.use(VueI18n)

const { createVuei18n } = new I18n(PAGE_NAMES.POPUP)
const i18n = createVuei18n()

/* eslint-disable no-new */
new Vue({
  el: '#root',
  i18n,
  render: h => h(Popup)
})
