class RedirectionHandler {
  redirectToTab = ({ url }, sender) => {
    chrome.tabs.update(sender.tab.id, { url })
  }
}

export default RedirectionHandler
