const  CustomError  = require('../errors')
const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  const Authorization = req.headers.authorization
  if (!Authorization || !Authorization.startsWith('Bearer '))
    throw new CustomError.UnauthenticatedError('You must be logged in')
  const token = Authorization.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const testUser =
      payload.userId === '6601878534105e7ef2f019e2' ? true : false
    req.user = { userId: payload.userId, testUser }
    next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = authenticate
