const server = Bun.serve({
    port: 3004,
    fetch(req) {
        const url = new URL(req.url);

        if (url.pathname === '/json') {
            return Response.json({hello: 'world'})
        } else if (url.pathname === '/hash/sha256') {
            return Response.json({hash: new Bun.CryptoHasher("sha256").update(url.searchParams.get('text') ?? '').digest('hex')})
        }

        console.log(`New request is received, method ${req.method}, path ${req.url}`)

        return Response.json({ hello: 'world' })
    },
})

console.log(`Starting server at: ${server.url}`)
