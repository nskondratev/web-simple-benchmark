// Require the framework and instantiate it
const crypto = require('crypto')
const fastify = require('fastify')({ logger: false })
const port = 3001

// Declare a route
fastify.get('/json', (request, reply) => {
    reply.send({ hello: 'world' })
})

fastify.get('/hash/sha256', (request, reply) => {
    reply.send({ hash: crypto.createHash('sha256').update(request.query.text).digest('hex') })
})

// Run the server!
fastify.listen(port, (err, address) => {
    if (err) throw err
    console.log(`fastify server listening on ${address}`)
})