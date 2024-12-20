import { useEffect } from 'react'
import { StatItem } from '../components'
import { customFetch } from '../utils'
import { useLoaderData } from 'react-router-dom'
import Charts from '../components/Charts'

export const loader = (store) => async () => {
  const user = store.getState().userState.user
  const response = await customFetch('/jobs/showStats', {
    headers: { Authorization: `Bearer ${user.token}` },
  })
  const formatStats = Object.entries(response.data.formatStats)
  const formatMonthlyApplication = response.data.formatMonthlyApplication
  return { formatStats, formatMonthlyApplication }
}

const Stats = () => {
  const { formatStats, formatMonthlyApplication } = useLoaderData()
  useEffect(() => {
    localStorage.setItem('page', '/dashboard/stats')
  }, [])
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      {formatStats.map((formatStat) => {
        return <StatItem formatStat={formatStat} key={formatStat[0]} />
      })}
      <Charts formatMonthlyApplication={formatMonthlyApplication} />
    </div>
  )
}
export default Stats
