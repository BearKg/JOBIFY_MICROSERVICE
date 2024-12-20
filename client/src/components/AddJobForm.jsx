import React from 'react'
import { Form } from 'react-router-dom'
import { FormInput } from '../components'
import FormSelect from './FormSelect'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'

const jobStatusList = ['pending', 'interview', 'declined']
const jobTypeList = ['full-time', 'part-time', 'internship']

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const dataForm = await request.formData()
    const data = Object.fromEntries(dataForm)
    const user = store.getState().userState.user

    try {
      const response = await customFetch.post('/jobs', data, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      toast.success('Job created successfully')
      await queryClient.removeQueries({
        queryKey: ['jobs', '', 'all', 'all', 'latest', 1],
        exact: true,
      })
      return null
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error.message ||
        "please double check job's information"
      toast.error(errorMessage)
      return null
    }
  }

const AddJobForm = () => {
  return (
    <Form method="POST" className="bg-base-100 my-8 mx-8">
      <h4 className="text-2xl pt-8 pl-8 text-neutral font-medium">Add Job</h4>
      <div className="py-8 px-8 grid grid-cols-2 lg:grid-cols-3 items-center gap-x-4">
        <FormInput
          label="position"
          name="position"
          type="text"
          size="input-sm"
        />
        <FormInput label="company" name="company" type="text" size="input-sm" />
        <FormInput
          label="job location"
          name="jobLocation"
          type="text"
          size="input-sm"
        />
        <FormSelect
          label="status"
          name="status"
          defaultValue="pending"
          size="select-sm"
          list={jobStatusList}
        />
        <FormSelect
          label="job type"
          name="jobType"
          defaultValue="full-time"
          size="select-sm"
          list={jobTypeList}
        />
        <button className="btn btn-primary btn-accent text-white btn-sm mt-5">
          Submit
        </button>
      </div>
    </Form>
  )
}

export default AddJobForm
