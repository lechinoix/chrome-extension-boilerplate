class ContentScriptInitiator {
  createRandomId = () => {
    const random = String(Math.random()).slice(2)
    return `root-${random}`
  }

  insertFontInPage = (url) => {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', url)
    document.head.appendChild(link)
  }

  insertRootElement = (rootElementId) => {
    const screenshotElement = document.createElement('div')
    screenshotElement.setAttribute('id', rootElementId)
    document.body.appendChild(screenshotElement)
  }
}

export default ContentScriptInitiator
