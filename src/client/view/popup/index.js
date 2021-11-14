import { createApp } from 'vue'
import Popup from './Popup.vue'
import I18n from 'shared/services/I18n'
import { PAGE_NAMES } from 'shared/constants'

const { createVuei18n } = new I18n(PAGE_NAMES.POPUP)
const i18n = createVuei18n()

/* eslint-disable no-new */
const app = createApp({
  el: '#root',
  i18n,
  render: h => h(Popup)
})

app.use(i18n)
