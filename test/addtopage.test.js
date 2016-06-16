import test from 'ava'
import { createImageTag, createScriptTag } from '../src/addtopage'

test('Create a new image element', t => {
  const testSrc = 'junk-here'
  const newElement = createImageTag(testSrc)

  t.true(newElement.nodeName === 'IMAGE' && newElement.src === testSrc)
})

test('Create a new script element', t => {
  const testSrc = 'junk-here'
  const newElement = createScriptTag('junk-here')
  t.true(newElement.nodeName === 'SCRIPT' && newElement.src === testSrc)
})
