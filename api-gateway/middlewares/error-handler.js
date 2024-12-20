const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
  const formattedError = {
    statusCode: err.statusCode || 500,
    msg: err.message || 'Something went wrong! Try again later.',
  }
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  if (err.kind === 'ObjectId') {
    formattedError.statusCode = StatusCodes.NOT_FOUND
    formattedError.msg = `Not found with id: ${err.value}`
  }
  if (err.code === 11000) {
    formattedError.statusCode = StatusCodes.BAD_REQUEST
    formattedError.msg = 'Email is already existing'
  }
  return res.status(formattedError.statusCode).json({ msg: formattedError.msg })
}

module.exports = errorHandlerMiddleware
