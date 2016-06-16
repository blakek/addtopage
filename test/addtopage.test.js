import test from 'ava'
import staticServer from './helpers/file-server'
import { addtopage } from '../src/addtopage'

/*
 * I can add images
 */
const rasterImageExtensions = [
  'gif',
  'jpeg',
  'jpg',
  'png',
  'tif',
  'tiff'
]
test.before(() => staticServer.start())
test.after.always(() => staticServer.close())

test('Creates a new image element, inferring from file extension (raster files)', t => {
  t.plan(rasterImageExtensions.length * 2)
  const testImages = rasterImageExtensions.map(ext => `http://localhost:3333/image.${ext}`)
  const newElements = testImages.forEach(img => addtopage(img))

  if (!newElements) t.fail('Did not create any elements!')

  // test if the element is an image element and has a source
  newElements.forEach(elem => {
    t.is(elem.nodeName, 'IMAGE')
    t.true(elem.src.includes('http://localhost:3333/image'))
  })
})

test('Creates a new image element, inferring from file extension (SVG)', t => {
  const testSrc = 'example-image-name.svg'
  const newElement = addtopage(testSrc)

  // test if the element is an image element and has the correct source
  t.is(newElement.nodeName, 'IMAGE')
  t.is(newElement.src, testSrc)
})

test('Creates a new image element using data URI, inferring from file extension', t => {
  const testImages = rasterImageExtensions.map(ext => `http://localhost:3333/image.${ext}`)
  const newElements = testImages.forEach(img => addtopage(img, { inline: true }))

  if (!newElements) t.fail('Did not create any elements!')

  // test if the element is an image element and a data URL source
  newElements.forEach(elem => {
    t.is(elem.nodeName, 'IMAGE')
    t.true(elem.src.includes('data:'))
  })
})

test('Creates a new image element without inferring from file extension', t => {
  const testSrc = 'http://localhost:3333/image.bogus-extension'
  const newElement = addtopage(testSrc, { type: 'image' })

  // test if the element is an image element and has the correct source
  t.is(newElement.nodeName, 'IMAGE')
  t.is(newElement.src, testSrc)
})

test('Creates a new image element using data URI without inferring from file extension', t => {
  const testSrc = 'http://localhost:3333/image.bogus-extension'
  const newElement = addtopage(testSrc, { inline: true, type: 'image' })

  // test if the element is an image element and has the correct source
  t.is(newElement.nodeName, 'IMAGE')
  t.true(newElement.src.includes('data:'))
})


/*
 * I can add scripts
 */
test('Creates a new script element, inferring from file extension', t => {
  const testSrc = 'http://localhost:3333/hello.js'
  const newElement = addtopage(testSrc)

  // test if the element is an script element and has the correct source
  t.is(newElement.nodeName, 'SCRIPT')
  t.is(newElement.src, testSrc)
})

test('Creates a new script element without inferring from file extension', t => {
  const testSrc = 'http://localhost:3333/hello.bogus-extension'
  const newElement = addtopage(testSrc, { type: 'script' })

  // test if the element is an script element and has the correct source
  t.is(newElement.nodeName, 'SCRIPT')
  t.is(newElement.src, testSrc)
})

test.todo('Creates a new inline script element when given, inferring from file extension')
test.todo('Creates a new inline script element when given without inferring from file extension')


/*
 * I can add styles
 */
test('Creates a new style link element, inferring from file extension', t => {
  const testSrc = 'example-style.css'
  const newElement = addtopage(testSrc)

  // test if the element is an script element and has the correct source
  t.is(newElement.nodeName, 'LINK')
  t.is(newElement.src, testSrc)
})

test('Creates a new style link without inferring from file extension', t => {
  const testSrc = 'example-style.bogus-extension'
  const newElement = addtopage(testSrc, { type: 'link' })

  // test if the element is an script element and has the correct source
  t.is(newElement.nodeName, 'LINK')
  t.is(newElement.src, testSrc)
})

test.todo('Creates a new inline style element, inferring from file extension')
test.todo('Creates a new inline style element without inferring from file extension')
