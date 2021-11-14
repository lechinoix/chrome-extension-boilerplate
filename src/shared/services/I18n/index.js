import VueI18n from 'vue-i18n'
import messages from './messages'

export const AVAILABLE_LANGUAGES = ['fr', 'en']
export const FALLBACK_LANGUAGE = 'en'

class I18n {
  constructor (pageName, messagesByPage = messages) {
    this.locale = this.getLocaleFromNavigator()
    this.pageName = pageName
    this.messages = messagesByPage
  }

  getMessages = () => {
    if (this.messages.hasOwnProperty(this.pageName)) {
      return this.messages[this.pageName]
    }
    throw new Error('Invalid pageName provided to I18n')
  }

  getLocaleFromNavigator = () => {
    const language = navigator.language.slice(0, 2)
    return AVAILABLE_LANGUAGES.includes(language)
      ? language
      : FALLBACK_LANGUAGE
  }

  createVuei18n = () => (
    new VueI18n({
      locale: this.locale,
      messages: this.getMessages(this.pageName)
    })
  )

  translate = (key) => this.messages[this.pageName][this.locale][key]
}

export default I18n
