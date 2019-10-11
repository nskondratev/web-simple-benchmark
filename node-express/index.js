const crypto = require('crypto')
const app = require('express')()
const port = 3002

app.get('/json', (req, res) => {
    res.json({ hello: 'world' })
})

app.get('/hash/sha256', (req, res) => {
    res.json({ hash: crypto.createHash('sha256').update(req.query.text).digest('hex') })
})

app.listen(port, () => {
    console.log(`Express app listening on port ${port}!`)
})
