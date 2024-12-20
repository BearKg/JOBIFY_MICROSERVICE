import React from 'react'
import { MdLuggage, MdOutlinePendingActions, MdBugReport } from 'react-icons/md'


const StatItem = ({ formatStat }) => {
  if (formatStat[0].includes('pending')) {
    return (
      <div className={`bg-base-100 mb-4 mx-4 border-b-4 border-yellow-500`}>
        <div className={`flex justify-between px-8 pt-9 pb-3`}>
          <h1 className={`text-5xl font-semibold  text-yellow-500`}>
            {formatStat[1]}
          </h1>
          <div
            className={`text-4xl text-yellow-500 px-4 py-3 bg-yellow-100 rounded-lg`}
          >
            <MdOutlinePendingActions />
          </div>
        </div>
        <div className="text-xl text-base-content px-8 pb-7 capitalize">
          {formatStat[0]}
        </div>
      </div>
    )
  } else if (formatStat[0].includes('interview')) {
    return (
      <div className={`bg-base-100 mb-4 mx-4 border-b-4 border-blue-500`}>
        <div className={`flex justify-between px-8 pt-9 pb-3`}>
          <h1 className={`text-5xl font-semibold  text-blue-500`}>
            {formatStat[1]}
          </h1>
          <div
            className={`text-4xl text-blue-500 px-4 py-3 bg-blue-100 rounded-lg`}
          >
            <MdLuggage />
          </div>
        </div>
        <div className="text-xl text-base-content px-8 pb-7 capitalize">
          {formatStat[0]}
        </div>
      </div>
    )
  } else {
    return (
      <div className={`bg-base-100 mb-4 mx-4 border-b-4 border-red-500`}>
        <div className={`flex justify-between px-8 pt-9 pb-3`}>
          <h1 className={`text-5xl font-semibold  text-red-500`}>
            {formatStat[1]}
          </h1>
          <div
            className={`text-4xl text-red-500 px-4 py-3 bg-red-100 rounded-lg`}
          >
            <MdBugReport />
          </div>
        </div>
        <div className="text-xl text-base-content px-8 pb-7 capitalize">
          {formatStat[0]}
        </div>
      </div>
    )
  }
}

export default StatItem
