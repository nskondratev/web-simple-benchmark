const crypto = require('crypto')
const http = require('http')
const url = require('url')
const port = 3000

const requestHandler = (request, response) => {
  if (request.url.startsWith('/json')) {
    response.end(JSON.stringify({ hello: 'world' }))
    return
  } else if (request.url.startsWith('/hash/sha256')) {
    const q = url.parse(request.url, true).query
    response.end(JSON.stringify({ hash: crypto.createHash('sha256').update(q.text).digest('hex') }))
    return
  }
  response.writeHead(404)
  response.end()
}

const server = http.createServer(requestHandler)

server.listen(port, err => {
  if (err) {
    console.log('Can not start server', err)
    process.exit(1)
  }
  console.log(`server is listening on ${port}`)
})
