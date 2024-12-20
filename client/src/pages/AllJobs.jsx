import { useLoaderData } from 'react-router-dom'
import { SearchForm } from '../components'
import JobList from '../components/JobList'
import { customFetch } from '../utils'
import PaginationContainer from '../components/PaginationContainer'
import { useEffect } from 'react'

const url = '/jobs'
export const allJobsQuery = (params, user) => {
  const { search, status, jobType, sort, page } = params
  return {
    queryKey: [
      'jobs',
      search ?? '',
      status ?? 'all',
      jobType ?? 'all',
      sort ?? '',
      page ?? 1,
    ],
    staleTime: 0,
    keepPreviousData: true,
    queryFn: () =>
      customFetch(url, {
        params,
        headers: { Authorization: `Bearer ${user.token}` },
      }),
  }
}

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])
    const user = store.getState().userState.user
    const response = await queryClient.ensureQueryData(
      allJobsQuery(params, user)
    )
    const jobList = response.data.jobs
    const meta = response.data.meta
    return { jobList, meta, params }
  }

const AllJobs = () => {
  const { jobList, meta } = useLoaderData()
  useEffect(() => {
    localStorage.setItem('page', '/dashboard/all-jobs')
  }, [])
  return (
    <div>
      <SearchForm />
      <JobList jobList={jobList} meta={meta} />
      <PaginationContainer />
    </div>
  )
}
export default AllJobs
