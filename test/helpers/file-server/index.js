let server

export function start(port = 3333) {
  const express = require('express')
  const app = express()

  app.use(express.static('helpers/file-server/files'))

  server = app.listen(port)
  return server
}

export function close() {
  server.close()
}

export default { close, start }
