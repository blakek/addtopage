export function createImageTag(src) {
  var imageElement = document.createElement('image')
  imageElement.src = src
  return imageElement
}

export function createScriptTag(src) {
  var scriptElement = document.createElement('script')
  scriptElement.src = src
  return scriptElement
}

export function addtopage() {
  return 'this is a work in progress...'
}

export default addtopage
