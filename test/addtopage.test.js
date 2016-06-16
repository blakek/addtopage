import test from 'ava'
import { addtopage, createImageTag, createScriptTag } from '../src/addtopage'

/*
 * I can add images
 */
test.todo('Creates a new image element, inferring from file extension (png, jpg, tiff, svg, etc.)')
test.todo('Creates a new image element using data URI, inferring from file extension')
test.todo('Creates a new image element without inferring from file extension')
test.todo('Creates a new image element using data URI without inferring from file extension')

/*
 * I can add scripts
 */
test.todo('Creates a new script element when given, inferring from file extension')
test.todo('Creates a new inline script element when given, inferring from file extension')
test.todo('Creates a new script element when given without inferring from file extension')
test.todo('Creates a new inline script element when given without inferring from file extension')

/*
 * I can add styles
 */
test.todo('Creates a new style link element when given, inferring from file extension')
test.todo('Creates a new inline style element when given, inferring from file extension')
test.todo('Creates a new style link when given without inferring from file extension')
test.todo('Creates a new inline style element when given without inferring from file extension')
