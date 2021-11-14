import uuidv4 from 'uuid/v4'

const STORAGE_TYPES = {
  LOCAL: 'local',
  SYNC: 'sync'
}

class Storage {
  static onChange = (callback) => chrome.storage.onChanged.addListener(callback)

  constructor (storageKey, storageType = STORAGE_TYPES.LOCAL, customStorage) {
    if (!storageKey) {
      throw new Error('You need to define the Storage key of your store')
    }
    this.STORAGE_KEY = storageKey

    switch (storageType) {
      case STORAGE_TYPES.LOCAL:
        this.storage = chrome.storage.local
        break
      case STORAGE_TYPES.SYNC:
        this.storage = chrome.storage.sync
        break
      default:
        throw new Error('Invalid storage type provided')
    }
  }

  indexById = (value, id = uuidv4()) => ({
    [id]: {
      ...value,
      id
    }
  })

  getAll = () => {
    return new Promise((resolve, reject) => {
      this.storage.get(this.STORAGE_KEY, (data) => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError)
        }
        resolve(data[this.STORAGE_KEY])
      })
    })
  }

  getListValues = async () => {
    const value = await this.getAll()
    if (typeof value === 'undefined') return []
    if (typeof value !== 'object') throw new Error('getListValues can only be called on dict values')
    return Object.values(value)
  }

  getByKey = async (key) => {
    const allItems = await this.getAll()
    if (typeof allItems === 'undefined') return undefined
    if (typeof allItems !== 'object') throw new Error('getByKey can only be called on dict values')
    return allItems[key]
  }

  setValue = (value) => {
    this.storage.set({
      [this.STORAGE_KEY]: value
    })
  }

  updateValue = async (value) => {
    const currentValue = await this.getAll()
    this.storage.set({
      [this.STORAGE_KEY]: {
        ...currentValue,
        ...value
      }
    })
  }

  deleteValueById = async (id) => {
    const currentValue = await this.getAll()
    delete currentValue[id]
    this.setValue(currentValue)
  }

  clearStorage = () => {
    this.storage.clear()
  }
}

export default Storage
