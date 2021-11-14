import Storage from '..'
import { compareObjects } from 'utils/tests'

const storageKey = 'storageKey'
const notObjectKey = 'notObjectKey'

const mockStorage = {
  [storageKey]: {
    key1: {
      id: 'key1',
      imageURL: 'data:qwerty'
    },
    key2: {
      id: 'key2',
      imageURL: 'data:azerty'
    }
  },
  [notObjectKey]: 'notObject'
}

global.chrome = {
  storage: {
    local: {
      get: (key, callback) => callback({ [key]: mockStorage[key] })
    }
  },
  runtime: {}
}

describe('Storage constructor', () => {
  it('uses the correct Storage key', () => {
    const storage = new Storage(storageKey)
    expect(storage.STORAGE_KEY).toBe(storageKey)
  })

  it('throws error when no storage key is provided Storage key', () => {
    const createStorageWithNoKey = () => new Storage(null)
    expect(createStorageWithNoKey).toThrow()
  })

  it('selects the local storage when no storage type is provided', () => {
    const storage = new Storage(storageKey)
    expect(storage.storage).toBe(global.chrome.storage.local)
  })

  it('throws error when invalid storageType is provided', () => {
    const createStorageWithInvalidType = () => new Storage(storageKey, 'shiny')
    expect(createStorageWithInvalidType).toThrow()
  })
})

describe('Storage methods', () => {
  it('gets all items', async () => {
    const storage = new Storage(storageKey)
    const allItems = await storage.getAll()
    expect(allItems).toBe(mockStorage[storageKey])
  })

  it('gets all items as list', async () => {
    const storage = new Storage(storageKey)
    const allItems = await storage.getListValues()
    expect(compareObjects(allItems, Object.values(mockStorage[storageKey]))).toBe(true)
  })

  it('throws when getListValues is called on non objects', () => {
    const storage = new Storage(notObjectKey)
    expect(storage.getListValues()).rejects.toThrow()
  })

  it('returns empty array when called on undefined value', async () => {
    const storage = new Storage('someOtherKey')
    const otherValue = await storage.getListValues()
    expect(otherValue.length).toBe(0)
  })
})
