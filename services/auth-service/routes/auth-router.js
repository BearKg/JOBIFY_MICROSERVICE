const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')

const {
  login,
  register,
  updateUser,
} = require('../controllers/auth-controller')

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/updateUser').patch(authenticate,updateUser)

module.exports = router