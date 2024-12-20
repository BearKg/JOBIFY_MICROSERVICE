import React from 'react'
import { store } from '../store'
import { Form, redirect } from 'react-router-dom'
import { FormInput, FormSelect } from '../components'
const jobStatusList = ['pending', 'interview', 'declined']
const jobTypeList = ['full-time', 'part-time', 'internship']
import { toast } from 'react-toastify'
import { customFetch } from '../utils'

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const dataForm = await request.formData()
    const data = Object.fromEntries(dataForm)
    const job = store.getState().jobState.job
    const user = store.getState().userState.user
    try {
      const response = await customFetch.patch(`/jobs/${job._id}`, data, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      toast.success('Job updated successfully')
      await queryClient.removeQueries({
        queryKey: ['jobs', '', 'all', 'all', 'latest', 1],
        exact: true,
      })
      return redirect('../all-jobs')
    } catch (error) {
      console.log(error)
      const errorMessage =
        error?.response?.data?.msg ||
        'please double check your information'
      toast.error(errorMessage)
      return null
    }
  }

const EditJobForm = () => {
  const job = store.getState().jobState.job
  const { position, company, jobLocation, status, jobType } = job
  return (
    <Form method="POST" className="bg-base-100 my-8 mx-8">
      <h4 className="text-2xl pt-8 pl-8 text-neutral font-medium">Edit Job</h4>
      <div className="py-8 px-8 grid grid-cols-2 lg:grid-cols-3 items-center gap-x-4">
        <FormInput
          label="position"
          name="position"
          type="text"
          size="input-sm"
          defaultValue={position}
        />
        <FormInput
          label="company"
          name="company"
          type="text"
          size="input-sm"
          defaultValue={company}
        />
        <FormInput
          label="job location"
          name="jobLocation"
          type="text"
          size="input-sm"
          defaultValue={jobLocation}
        />
        <FormSelect
          label="status"
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
        <button
          className="btn btn-primary btn-accent text-white btn-sm mt-5"
        >
          Submit
        </button>
      </div>
    </Form>
  )
}

export default EditJobForm
