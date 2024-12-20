import React from 'react'
import { FaLocationArrow, FaCalendarAlt, FaBriefcase } from 'react-icons/fa'
import moment from 'moment'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'
import { store } from '../store'
import { redirect, useLocation, useNavigate } from 'react-router-dom'
import { editJob } from '../features/job/jobSlice'

const editJobData = async (job, store, navigate) => {
  store.dispatch(editJob(job))
  navigate('../edit-job')
}

const deleteJob = async (jobId) => {
  const user = store.getState().userState.user
  try {
    await customFetch.delete(`jobs/${jobId}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    toast.success('Delete job successfully')
    return null 
  } catch (error) {
    console.log(error)
    const errorMessage =
      error?.response?.data?.msg || "please double check your job's id"
    toast.error(errorMessage)
    return null
  }
}

const SingleJob = ({ job }) => {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const { position, company, jobLocation, status, jobType, createdAt } = job
  const date = moment(new Date(createdAt)).format('MMM Do, YYYY')
  return (
    <div className="flex bg-base-100 flex-col p-4 rounded-lg shadow-md">
      <div className="flex flex-row gap-7">
        {/* AVATAR */}
        <div className="avatar placeholder">
          <div className="bg-accent text-neutral-content rounded-md w-14">
            <span className="text-white font-bold text-xl">{company[0]}</span>
          </div>
        </div>
        {/* COMPANY AND POSITION */}
        <div>
          <h4 className="text-xl tracking-wide">{position}</h4>
          <h3 className="text-base text-slate-500 font-normal">{company}</h3>
        </div>
      </div>
      {/* JOB INFO */}
      <div className="mt-8">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <li className="flex flex-row items-center gap-3">
            <FaLocationArrow className="text-slate-500" />
            <p>{jobLocation}</p>
          </li>
          <li className="flex flex-row items-center gap-3">
            <FaCalendarAlt className="text-slate-500" />
            <p>{date}</p>
          </li>
          <li className="flex flex-row items-center gap-3">
            <FaBriefcase className="text-slate-500" />
            <p>{jobType}</p>
          </li>
          <li>
            <div className="badge badge-primary rounded-md bg-primary-content border-transparent text-info text-base h-8">
              {status}
            </div>
          </li>
        </ul>
      </div>
      {/* BUTTON */}
      <div className="mt-5">
        <button
          onClick={() => editJobData(job, store, navigate)}
          className="btn btn-primary btn-accent text-white btn-sm"
        >
          Edit
        </button>
        <button
          onClick={() => {
            deleteJob(job._id, navigate)
            navigate('/dashboard/all-jobs')
          }}
          className="btn btn-primary btn-accent text-white ml-2 btn-sm"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default SingleJob
