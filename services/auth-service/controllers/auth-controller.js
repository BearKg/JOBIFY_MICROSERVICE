const Users = require('../models/userSchema')
const CustomError = require('../errors')
const {StatusCodes} = require('http-status-codes')

const register = async (req, res) => {
  const user = await Users.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new CustomError.BadRequestError(
      'Please provide email and password!'
    )
  }

  const user = await Users.findOne({ email })
  if (!user) throw new CustomError.NotFoundError('Not found user!')
  const validatePassword = await user.comparePassword(password)
  if (!validatePassword)
    throw new CustomError.UnauthenticatedError(
      'Password is incorrect!'
    )
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
  })
}

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body
  if (!email || !name || !lastName || !location) {
    throw new CustomError.BadRequestError(
      'Please provide email, name, lastName and location!'
    )
  }
  console.log(req.user);
  const user = await Users.findOne({ _id: req.user.userId })
  if (!user) throw new CustomError.NotFoundError('Not found user!')
  user.email = email
  user.name = name
  user.lastName = lastName
  user.location = location
  await user.save()
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
  })
}

module.exports = {
  login,
  register,
  updateUser,
}
