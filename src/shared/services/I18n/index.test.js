import I18n, { FALLBACK_LANGUAGE } from '.'
import { compareObjects, mockJestNavigatorLanguage } from 'utils/tests'

const pageName = 'test'
const language = 'fr'

const messages = {
  [pageName]: {
    [language]: {
      message1: 'Bonjour des tests !',
      message2: 'Au revoir des tests !'
    },
    [FALLBACK_LANGUAGE]: {
      message1: 'Hello from test!',
      message2: 'Goodbye from test!'
    }
  }
}

describe('I18n class', () => {
  it('find the locale of the user', () => {
    mockJestNavigatorLanguage('fr-BE')
    const { getLocaleFromNavigator } = new I18n()
    expect(getLocaleFromNavigator()).toBe(language)
  })

  it('fallbacks to english', () => {
    mockJestNavigatorLanguage('nl-BE')
    const { getLocaleFromNavigator } = new I18n()
    expect(getLocaleFromNavigator()).toBe(FALLBACK_LANGUAGE)
  })

  it('should return the page messages', () => {
    const { getMessages } = new I18n(pageName, messages)
    expect(compareObjects(getMessages(), messages[pageName])).toBe(true)
  })

  it('should throw if an unexisting page is provided', () => {
    const { getMessages } = new I18n('someOtherPage', messages)
    expect(getMessages).toThrow()
  })

  it('should return the translation key', () => {
    mockJestNavigatorLanguage(language)
    const { translate } = new I18n(pageName, messages)
    expect(translate('message1')).toBe(messages[pageName][language].message1)
  })
})
