class TabManager {
  static URLS = {
    MY_TAB: 'pages/myTab.html'
  }

  static getActiveTab = () => new Promise(resolve => chrome.tabs.getSelected(null, resolve))

  static openNewTab = (url) => new Promise(resolve => chrome.tabs.create({ url }, resolve))

  static openOrFocusTab = (url) => new Promise(resolve => {
    if (!Object.values(TabManager.URLS).includes(url)) {
      throw new Error('Invalid tab provided to openOrFocusTab')
    }

    const URLRegex = new RegExp(url + '$')
    const isOpenedTab = (tab) => URLRegex.test(tab.url)

    chrome.tabs.getAllInWindow(null, async (tabs) => {
      const [openedTab] = tabs.filter(isOpenedTab) || []
      if (openedTab) {
        await TabManager.focusTab(openedTab.id)
      } else {
        await TabManager.openNewTab(url)
      }
      resolve()
    })
  })

  static focusTab = (tabId) => {
    chrome.tabs.update(tabId, { active: true })
  }

  static openMyTab = () => TabManager.openOrFocusTab(TabManager.URLS.MY_TAB)
}

export default TabManager
