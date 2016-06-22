const elementTypeTest = [
  {
    element: 'image',
    test: (filename) => /\.(gif|jp[e]?g|png|svg)$/.test(filename)
  },
  {
    element: 'script',
    test: (filename) => /js[x]?$/.test(filename)
  },
  {
    element: 'style',
    test: (filename) => /css$/.test(filename)
  }
]

const knownElementTypes = [
  'image',
  'link',
  'script',
  'style'
]

export function addtopage(resource, { type = undefined } = {}) {
  if (!type) {
    const testType = elementTypeTest.find(elementType => elementType.test(resource))

    if (!testType) {
      return
    }

    type = testType.element
  }

  if (!knownElementTypes.includes(type)) {
    return
  }

  var newElement = document.createElement(type)
  newElement.src = resource
  return newElement
}

export default addtopage
