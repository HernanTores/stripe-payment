require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const stripeController = require('./controllers/stripeController')

const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

app.use(express.json())
app.use(express.static('./public'))

app.post('/stripe', stripeController)
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    app.listen(port, console.log(`Server listening on port: ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()