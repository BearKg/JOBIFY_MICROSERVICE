const CustomAPIError = require('../errors')

const testUser = (req, res, next) => {
    if(req.user.testUser) 
        throw new CustomAPIError.UnauthenticatedError("Test user Read Only!")
    next()
}

module.exports = testUser