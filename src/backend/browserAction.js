import I18n from 'shared/services/I18n'
import { PAGE_NAMES } from 'shared/constants'

const { translate } = new I18n(PAGE_NAMES.BROWSER_ACTION)

const setupBrowserAction = () => {
  chrome.browserAction.setTitle({ title: translate('title') })
}

export default setupBrowserAction
