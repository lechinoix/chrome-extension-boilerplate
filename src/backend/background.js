import createMenu from './contextMenu'
import addListeners from './listeners'
import setupBrowserAction from './browserAction'

(function () {
  createMenu()
  addListeners()
  setupBrowserAction()
})()
