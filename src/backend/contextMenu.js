import messageTypes from 'shared/messageTypes'
import I18n from 'shared/services/I18n'
import { PAGE_NAMES } from 'shared/constants'

const ROOT_MENU_ID = 'ROOT_MENU_ID'

const createSubMenuItem = (id, title, contexts = ['all']) => new Promise(resolve =>
  chrome.contextMenus.create({
    contexts,
    parentId: ROOT_MENU_ID,
    id,
    title
  }, resolve)
)

const createRootMenu = () => new Promise(resolve =>
  chrome.contextMenus.create({
    contexts: ['all'],
    id: ROOT_MENU_ID,
    title: 'My Chrome Extension'
  }, resolve)
)

const { translate } = new I18n(PAGE_NAMES.CONTEXT_MENU)

const createSubMenus = () => Promise.all([
  createSubMenuItem(messageTypes.OPEN_MENU, translate('captureScreenshot'))
])

const clearMenus = () => new Promise((resolve) => chrome.contextMenus.removeAll(resolve))

/**
*  Register a handler for an event dispatched by the menu
*  The messageType is passed via the MENU_ID
*/
export const addListener = (messageType, listener) => {
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === messageType) {
      listener({ ...info, tabId: tab.id })
    }
  })
}

const createMenu = async () => {
  await clearMenus()
  await createRootMenu()
  await createSubMenus()
}

export default createMenu
