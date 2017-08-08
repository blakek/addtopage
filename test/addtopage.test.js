import test from 'ava'
import staticServer from './helpers/file-server'
import axios from 'axios'
import { rasterImageExtensions } from './helpers/file-extensions'
import addtopage from '../src/addtopage'

/*
 * I can add images
 */
test.before(() => staticServer.start())
test.after.always(() => staticServer.close())

test('Creates a new image element, inferring from file extension (raster files)', t => {
  t.plan(rasterImageExtensions.length * 2)
  const testImages = rasterImageExtensions.map(ext => `http://localhost:3333/image.${ext}`)
  const newElements = testImages.map(img => addtopage(img))

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
  if (!newElement) t.fail('Did not create an element!')

  // test if the element is an image element and has the correct source
  t.is(newElement.nodeName, 'IMAGE')
  t.is(newElement.src, testSrc)
})

test.skip('Creates a new image element using data URI, inferring from file extension', t => {
  const testImages = rasterImageExtensions.map(ext => `http://localhost:3333/image.${ext}`)
  const newElements = testImages.map(img => addtopage(img, { inline: true }))

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
  if (!newElement) t.fail('Did not create an element!')

  // test if the element is an image element and has the correct source
  t.is(newElement.nodeName, 'IMAGE')
  t.is(newElement.src, testSrc)
})

test.skip('Creates a new image element using data URI without inferring from file extension', t => {
  const testSrc = 'http://localhost:3333/image.bogus-extension'
  const newElement = addtopage(testSrc, { inline: true, type: 'image' })
  if (!newElement) t.fail('Did not create an element!')

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
  if (!newElement) t.fail('Did not create an element!')

  // test if the element is an script element and has the correct source
  t.is(newElement.nodeName, 'SCRIPT')
  t.is(newElement.src, testSrc)
})

test('Creates a new script element without inferring from file extension', t => {
  const testSrc = 'http://localhost:3333/hello.bogus-extension'
  const newElement = addtopage(testSrc, { type: 'script' })
  if (!newElement) t.fail('Did not create an element!')

  // test if the element is an script element and has the correct source
  t.is(newElement.nodeName, 'SCRIPT')
  t.is(newElement.src, testSrc)
})

test.skip('Creates a new inline script element, inferring from file extension', async t => {
  const testSrc = 'http://localhost:3333/hello.js'
  const scriptContents = (await axios.get(testSrc)).data
  const newElement = addtopage(testSrc, { inline: true })
  if (!newElement) t.fail('Did not create an element!')

  // test if the element is an script element and contains the same text as what's on the server
  t.is(newElement.nodeName, 'SCRIPT')
  t.is(newElement.innerHTML, scriptContents)
})

test.skip('Creates a new inline script element without inferring from file extension', async t => {
  const testSrc = 'http://localhost:3333/hello.bogus-extension'
  const scriptContents = (await axios.get(testSrc)).data
  const newElement = addtopage(testSrc, { inline: true, type: 'script' })
  if (!newElement) t.fail('Did not create an element!')

  // test if the element is an script element and contains the same text as what's on the server
  t.is(newElement.nodeName, 'SCRIPT')
  t.is(newElement.innerHTML, scriptContents)
})

/*
 * I can add styles
 */
test('Creates a new style link element, inferring from file extension', t => {
  const testSrc = 'http://localhost:3333/style.css'
  const newElement = addtopage(testSrc)
  if (!newElement) t.fail('Did not create an element!')

  // test if the element is an script element and has the correct source
  t.is(newElement.nodeName, 'LINK')
  t.is(newElement.href, testSrc)
  t.is(newElement.rel.toLowerCase(), 'stylesheet')
})

test('Creates a new style link without inferring from file extension', t => {
  const testSrc = 'http://localhost:3333/style.bogus-extension'
  const newElement = addtopage(testSrc, { type: 'link' })
  if (!newElement) t.fail('Did not create an element!')

  // test if the element is an script element and has the correct source
  t.is(newElement.nodeName, 'LINK')
  t.is(newElement.href, testSrc)
  t.is(newElement.rel.toLowerCase(), 'stylesheet')
})

test('Creates a new style link without inferring from file extension, using type: "style"', t => {
  const testSrc = 'http://localhost:3333/style.bogus-extension'
  const newElement = addtopage(testSrc, { type: 'style' })
  if (!newElement) t.fail('Did not create an element!')

  // test if the element is an script element and has the correct source
  t.is(newElement.nodeName, 'LINK')
  t.is(newElement.href, testSrc)
  t.is(newElement.rel.toLowerCase(), 'stylesheet')
})

test.skip('Creates a new inline style element, inferring from file extension', async t => {
  const fileSrc = 'http://localhost:3333/style.css'
  const fileContents = (await axios.get(fileSrc)).data
  const newElement = addtopage(fileSrc, { inline: true })
  if (!newElement) t.fail('Did not create an element!')

  // test if the element is an script element and contains the same text as what's on the server
  t.is(newElement.nodeName, 'STYLE')
  t.is(newElement.innerHTML, fileContents)
})

test.skip('Creates a new inline style element without inferring from file extension', async t => {
  const fileSrc = 'http://localhost:3333/style.bogus-extension'
  const fileContents = (await axios.get(fileSrc)).data
  const newElement = addtopage(fileSrc, { inline: true, type: 'style' })
  if (!newElement) t.fail('Did not create an element!')

  // test if the element is an script element and contains the same text as what's on the server
  t.is(newElement.nodeName, 'STYLE')
  t.is(newElement.innerHTML, fileContents)
})

/*
 * I can add iframes
 */
test('Creates a new iframe with a given src', t => {
  const iframeSrc = 'https://www.youtube.com/embed/C0DPdy98e4c'
  const newElement = addtopage(iframeSrc, { type: 'iframe' })

  if (!newElement) t.fail('Did not create any elements!')

  // test if the element is an iframe and has the correct source
  t.is(newElement.nodeName, 'IFRAME')
  t.is(newElement.src, iframeSrc)
})

/*
 * Throws errors properly
 */
test('Throws an error when trying to add an unknown element', t => {
  const error = t.throws(() => {
    addtopage('garbage', { type: 'garbage' })
  })

  t.is(error.message, 'Cannot create element of unknown type: garbage')
})

test('Throws an error when trying to add an unknown element', t => {
  const error = t.throws(() => {
    addtopage('test.garbage')
  })

  t.is(error.message, 'Cannot guess element needed for unknown file type: test.garbage')
})
