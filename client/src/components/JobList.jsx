import React from 'react'
import { SingleJob } from './index'

const JobList = ({ jobList, meta }) => {
  return (
    <div className="my-8 mx-8">
      <h4 className='font-bold text-xl'>{meta.totalJobs} Jobs Found</h4>
      <div className='grid grid-cols-2 gap-7 mt-2'>
        {jobList.map((job) => {
          return <SingleJob job={job} key={job._id} />
        })}
      </div>
    </div>
  )
}

export default JobList
