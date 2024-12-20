require('dotenv').config()
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const jobRouter = require('./routes/job-router')
const connectDB = require('./connect')
const authenticate = require('./middlewares/authenticate')

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('combined'))

app.use(express.json())

app.use('/jobs',authenticate, jobRouter)

const PORT = process.env.PORT || 5300
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(PORT, () => {
      console.log('Listening on port', PORT)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
