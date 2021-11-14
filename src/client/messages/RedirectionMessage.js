import messageTypes from 'shared/messageTypes'
import ChromeMessageEventManager from 'shared/ChromeMessageEventManager'

class RedirectionMessage {
  redirectToTab = (url) => {
    const chromeMessageEventManager = new ChromeMessageEventManager()
    chromeMessageEventManager.sendMessageToBackground(messageTypes.REDIRECT_TO_TAB, { url })
  }
}

export default RedirectionMessage
