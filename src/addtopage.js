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
  'iframe',
  'image',
  'link',
  'script',
  'style'
]

function addtopage(resource, { inline = false, type = undefined } = {}) {
  // If not given a type, try to infer it from the file name (esp. the file extension)
  if (!type) {
    const testType = elementTypeTest.find(elementType => elementType.test(resource))

    if (!testType) {
      return
    }

    type = testType.element
  }

  // Correct style and link tags when necessary
  if (!inline && type === 'style') {
    type = 'link'
  } else if (inline && type === 'link') {
    type = 'style'
  }

  // Ensure we are only working with an element we know
  if (!knownElementTypes.includes(type)) {
    return
  }

  // Create the element
  var newElement = document.createElement(type)

  if (!inline && type !== 'link') {
    newElement.src = resource
  } else if (type === 'link') {
    newElement.href = resource
    newElement.rel = 'stylesheet'
  } else {
    // TODO: write logic for inlining resource contents
    return
  }

  return document.body.appendChild(newElement)
}

export default addtopage
