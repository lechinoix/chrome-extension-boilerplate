// Without Scrollbar
export const getWindowInnerDimensions = () => ({
  width: document.documentElement.clientWidth || document.body.clientWidth,
  height: document.documentElement.clientHeight || document.body.clientHeight
})

// With Scrollbar
export const getWindowFullDimensions = () => ({
  width: window.innerWidth,
  height: window.innerHeight
})
