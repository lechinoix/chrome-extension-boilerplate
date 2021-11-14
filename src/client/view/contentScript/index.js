import { createApp } from 'vue'
import Component from './index.vue'
import ContentScriptService from './ContentScriptInitiator'
import I18n from 'shared/services/I18n'
import { PAGE_NAMES } from 'shared/constants'

const { createVuei18n } = new I18n(PAGE_NAMES.CONTENT_SCRIPT)
const i18n = createVuei18n()

const ContentScriptInitiator = new ContentScriptService()
const rootElementId = ContentScriptInitiator.createRandomId()
ContentScriptInitiator.insertRootElement(rootElementId)
ContentScriptInitiator.insertFontInPage('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons')

/* eslint-disable no-new */
const app = createApp({
  el: `#${rootElementId}`,
  i18n,
  render: h => h(Component)
})

app.use(i18n)
