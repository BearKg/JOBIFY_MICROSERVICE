require('dotenv').config()
const connectDB = require('./connect')
const Job = require('./models/jobSchema')
const mockData = require('./MOCK_DATA.json')

const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URL)
    await Job.create(mockData)
    console.log('Success!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
