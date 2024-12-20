import React from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import { FormInput, FormSelect } from '../components'

const jobStatusList = ['all', 'pending', 'interview', 'declined']
const jobTypeList = ['all', 'full-time', 'part-time', 'internship']
const sortList = ['latest', 'oldest', 'a-z', 'z-a']


const SearchForm = () => {
  const {params} = useLoaderData()
  const {search, status, jobType, sort} = params
  return (
    <Form className="bg-base-100 my-8 mx-8">
      <h4 className="text-2xl pt-8 pl-8 text-neutral font-medium">
        Search Form
      </h4>
      <div className="py-8 px-8 grid grid-cols-2 lg:grid-cols-3 items-center gap-x-4">
        <FormInput label="search" name="search" type="text" size="input-sm" defaultValue={search}/>
        <FormSelect
          label="job status"
          name="status"
          defaultValue={status}
          size="select-sm"
          list={jobStatusList}
        />
        <FormSelect
          label="job type"
          name="jobType"
          defaultValue={jobType}
          size="select-sm"
          list={jobTypeList}
        />
        <FormSelect
          label="sort"
          name="sort"
          defaultValue={sort}
          size="select-sm"
          list={sortList}
        />
        <button type="submit" className="btn btn-primary btn-accent text-white btn-sm mt-5">Filter Jobs</button>
      </div>
    </Form>
  )
}

export default SearchForm
