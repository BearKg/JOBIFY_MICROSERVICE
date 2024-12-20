require('dotenv').config()
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const authRouter = require('./routes/auth-router')
const connectDB = require('./connect')

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('combined'))

app.use(express.json())

app.use('/auth', authRouter)

const PORT = process.env.PORT || 5200
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
