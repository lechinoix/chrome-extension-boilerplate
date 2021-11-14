export const createImageElementFromURL = (imageURL) => new Promise((resolve, reject) => {
  const imageElement = new Image()
  imageElement.onload = (e) => resolve(e.currentTarget)
  imageElement.src = imageURL
  imageElement.onerror = reject
})

export const getImageProportions = (image) => image.width / image.height
