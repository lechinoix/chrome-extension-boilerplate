import ImageCropper from 'shared/services/ImageCropper'

class ScreenshotFactory {
  createScreenshotFromCropArea = async (cropAreaCoordinates, windowWidth) => {
    const fullPageImageURL = await this.captureScreenshot()
    const imageCropper = new ImageCropper(windowWidth)
    const croppedImageURL = await imageCropper.cropImage(fullPageImageURL, cropAreaCoordinates)

    return croppedImageURL
  }

  captureScreenshot = () => new Promise((resolve, reject) => {
    chrome.tabs.captureVisibleTab(
      null,
      {
        format: 'png',
        quality: 100
      },
      resolve
    )
  })
}

export default ScreenshotFactory
