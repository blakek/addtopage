const { JSDOM, window } = require('jsdom')

global.document = new JSDOM('<body></body>').window.document
