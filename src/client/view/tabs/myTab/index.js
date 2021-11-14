import { createApp } from 'vue'
import MyTab from './MyTab.vue'
import I18n from 'shared/services/I18n'
import { PAGE_NAMES } from 'shared/constants'

const { createVuei18n } = new I18n(PAGE_NAMES.MY_TAB)
const i18n = createVuei18n()

/* eslint-disable no-new */
createApp(MyTab)
  .use(i18n)
  .mount('#root')
