const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    minlength: 3,
    required: [true, 'Please provide username'],
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email address',
    },
  },
  password: {
    type: String,
    minlength: 6,
    require: [true, 'Please provide password'],
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'lastName',
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'my city',
  },
})


UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.createJWT = function () {
  return token = jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
}


UserSchema.methods.comparePassword = function (plaintextPassword) {
  return bcrypt.compare(plaintextPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)