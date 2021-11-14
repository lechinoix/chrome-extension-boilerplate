import { createImageElementFromURL } from './image'

export const getMimeTypeFromDataURL = (dataURL) => {
  const DataURLParts = dataURL.split(',')
  const mime = DataURLParts[0].match(/:(.*?);/)[1]
  return mime
}

export const getFileExtensionFromDataURL = (dataURL) => {
  const mime = getMimeTypeFromDataURL(dataURL)
  return mime.split('/')[1]
}

export const getContentFromDataURL = (dataURL) =>
  dataURL.split(',')[1]

export const getBlobFromDataURL = (dataURL) => {
  const DataURLContent = getContentFromDataURL(dataURL)
  const mime = getMimeTypeFromDataURL(dataURL)
  const byteString = atob(DataURLContent)
  const dataLength = byteString.length
  const buffer = new Uint8Array(dataLength)
  for (var i = 0; i < dataLength; i++) {
    buffer[i] = byteString.charCodeAt(i)
  }
  return new Blob([buffer], {type: mime})
}

export const createBlobURL = (dataURL) => {
  const blob = getBlobFromDataURL(dataURL)
  return URL.createObjectURL(blob)
}

export const createDataURLFromImageURL = async (imageURL) => {
  const image = await createImageElementFromURL(imageURL)
  const canvas = document.createElement('canvas')
  canvas.height = image.height
  canvas.width = image.width
  canvas.getContext('2d').drawImage(image, 0, 0)
  return canvas.toDataURL()
}
