import ImageHandler from 'shared/services/ImageHandler'
import ScreenshotFactory from './ScreenshotFactory'

class CropAreaHandler {
  searchWithScreenshot = async ({ cropAreaCoordinates, windowWidth }) => {
    const { createScreenshotFromCropArea } = new ScreenshotFactory()
    const croppedImageURL = await createScreenshotFromCropArea(cropAreaCoordinates, windowWidth)
    ImageHandler.searchWithImage(croppedImageURL)
  }

  addToMoodboard = async ({ cropAreaCoordinates, windowWidth }) => {
    const { createScreenshotFromCropArea } = new ScreenshotFactory()
    const croppedImageURL = await createScreenshotFromCropArea(cropAreaCoordinates, windowWidth)
    ImageHandler.addToMoodboard(croppedImageURL)
  }
}

export default CropAreaHandler
