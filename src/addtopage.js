const knownElementTypes = [
  'image',
  'link',
  'script',
  'style'
]

export function addtopage(resource, { type = undefined } = {}) {
  if (!type) {
    return
  }

  if (!knownElementTypes.includes(type)) {
    return
  }

  var newElement = document.createElement(type)
  newElement.src = resource
  return newElement
}

export default addtopage
