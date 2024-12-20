const Jobs = require('../models/jobSchema')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const mongoose = require('mongoose')
const moment = require('moment')

const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query
  const queryObject = { createdBy: req.user.userId }
  if (search) queryObject.position = { $regex: search, $options: 'i' }
  if (status && status !== 'all') queryObject.status = status
  if (jobType && jobType !== 'all') queryObject.jobType = jobType

  let result = Jobs.find(queryObject)

  if (sort === 'latest') result = result.sort('-createdAt')
  if (sort === 'oldest') result = result.sort('createdAt')
  if (sort === 'a-z') result = result.sort('position')
  if (sort === 'z-a') result = result.sort('-position')

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)

  const jobs = await result
  const totalJobs = await Jobs.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)
  res
    .status(StatusCodes.OK)
    .json({ jobs, meta: { page, numOfPages, totalJobs } })
}

const getJob = async (req, res) => {
  const { id } = req.params
  const { userId } = req.user
  const job = await Jobs.findOne({ _id: id, createdBy: userId })
  if (!job)
    throw new CustomError.NotFoundError('Job not found, please try again!')
  res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
  const { userId } = req.user
  const job = await Jobs.create({ ...req.body, createdBy: userId })
  if (!job)
    throw new CustomError.NotFoundError('Job not found, please try again!')
  res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
  const { id } = req.params
  const { userId } = req.user
  const job = await Jobs.findOneAndUpdate(
    { _id: id, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )
  if (!job)
    throw new CustomError.NotFoundError('Job not found, please try again!')
  res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
  const { id } = req.params
  const { userId } = req.user
  const job = await Jobs.deleteOne({ _id: id, createdBy: userId })
  res.status(StatusCodes.OK).json({ job })
}

const showStats = async (req, res) => {
  const { userId } = req.user
  const stats = await Jobs.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: '$status',
        numOfJobs: {
          $count: {},
        },
      },
    },
  ])
  const formatStat = stats.reduce((stats, stat) => {
    stats[stat._id] = stat.numOfJobs
    return stats
  }, {})
  const formatStats = {
    "pending applications": formatStat.pending || 0,
    "interview scheduled": formatStat.interview || 0,
    "jobs declined": formatStat.declined || 0,
  }

  const monthlyApplication = await Jobs.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        numOfJobs: {
          $count: {},
        },
      },
    },
    {
      $sort: { '_id.year': -1, '_id.month': -1 },
    },
    {
      $limit: 6,
    },
  ])
  const formatMonthlyApplication = monthlyApplication.map((currentValue) => {
    const date = new Date(`${currentValue._id.year}-${currentValue._id.month}`)
    const formatDate = moment(date).format('MMM YY')
    return { date: formatDate, count: currentValue.numOfJobs }
  })

  res.json({ formatMonthlyApplication, formatStats })
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
}
