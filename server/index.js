const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4000

setupServerOptions()

let counter = 0
app.get('/counter', (req, res) => res.json({ counter }))
app.post('/counter', (req, res) => {
  counter = req.body.counter || 0
  res.json({ counter })
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
