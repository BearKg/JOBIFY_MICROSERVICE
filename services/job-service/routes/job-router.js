const express = require('express')
const router = express.Router()

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} = require('../controllers/job-controller')

const testUser = require('../middlewares/testUser')

router.route('/').get(getAllJobs).post(testUser, createJob)
router.route('/showStats').get(showStats)
router.route('/:id').get(getJob).patch(testUser, updateJob).delete( testUser, deleteJob)

module.exports = router