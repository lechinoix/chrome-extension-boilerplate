export const compareObjects = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2)

export const mockJestNavigatorLanguage = (language) => {
  navigator.__defineGetter__('language', () => language)
}
