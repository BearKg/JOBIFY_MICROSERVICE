const mongoose = require('mongoose');

const connectDB = async (url) => {
    await mongoose.connect(url, {
      autoIndex: true,
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
      dbName: process.env.MONGO_DB,
    })
} 

module.exports = connectDB