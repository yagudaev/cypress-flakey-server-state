const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4000

setupServerOptions()

let counter = 0
app.get('/counter', (req, res) => res.json({ counter }))
app.post('/counter', (req, res) => {
  const input = req.body.counter
  const randomWait = input % 2 === 0 && input !== 0 ? 1000 : 0
  console.log('planning on changing value to', input)

  setTimeout(() => {
    counter = input || 0
    console.log('changed value to', counter)
    res.json({ counter })
  }, randomWait)
})

app.listen(port, () => console.log(`Server listening on port ${port}!`))

// private
function setupServerOptions() {
  app.use(bodyParser.json())
  enableCORS()
}

function enableCORS() {
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  })
}
