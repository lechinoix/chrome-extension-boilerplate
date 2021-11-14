class ChromeMessageEventManager {
  sendMessageToBackground = (messageType, payload) => {
    chrome.runtime.sendMessage({ type: messageType, payload })
  }

  sendMessageToTab = (tabId, messageType, payload) => {
    chrome.tabs.sendMessage(tabId, { type: messageType, payload })
  }

  addListener = (messageType, listener) => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type === messageType) listener(request.payload, sender)
    })
  }
}

export default ChromeMessageEventManager
