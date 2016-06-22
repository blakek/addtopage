// Tie element types to a test using the file name
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

// All element types we know
const knownElementTypes = [
  'image',
  'link',
  'script',
  'style'
]

export function addtopage(resource, { type = undefined } = {}) {
  // If not given a type, try to infer it from the file name (esp. the file extension)
  if (!type) {
    const testType = elementTypeTest.find(elementType => elementType.test(resource))

    if (!testType) {
      return
    }

    type = testType.element
  }

  // Ensure we are only working with an element we know
  if (!knownElementTypes.includes(type)) {
    return
  }

  // Create the element
  var newElement = document.createElement(type)
  newElement.src = resource
  return newElement
}

export default addtopage
