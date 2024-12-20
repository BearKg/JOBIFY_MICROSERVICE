import React from 'react'
import { Form } from 'react-router-dom'
import { FormInput } from '.'
import { toast } from 'react-toastify'
import { customFetch } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../features/user/userSlice'

export const action =
  (store) =>
  async ({ request }) => {
    const dataForm = await request.formData()
    const data = Object.fromEntries(dataForm)
    const user = store.getState().userState.user
    try {
      const response = await customFetch.patch('/auth/updateUser', data, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      toast.success('User updated successfully')
      console.log(response.data)
      store.dispatch(updateUser(response.data))
      return null
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        'please double check your information'
      toast.error(errorMessage)
      return null
    }
  }

const ProfileForm = () => {
  const { user } = useSelector((store) => store.userState)
  return (
    <Form method="PATCH" className="bg-base-100 my-8 mx-8">
      <h4 className="text-2xl pt-8 pl-8 text-neutral font-medium">Profile</h4>
      <div className="py-8 px-8 grid grid-cols-2 lg:grid-cols-3 items-center gap-x-4">
        <FormInput label="name" name="name" type="text" size="input-sm" defaultValue={user.name}/>
        <FormInput
          label="last name"
          name="lastName"
          type="text"
          size="input-sm"
          defaultValue={user.lastName}
        />
        <FormInput label="email" name="email" type="email" size="input-sm" defaultValue={user.email}/>
        <FormInput
          label="location"
          name="location"
          type="text"
          size="input-sm"
          defaultValue={user.location}
        />
        <button
          type="submit"
          className="btn btn-primary btn-accent text-white btn-sm mt-5"
        >
          Save Changes
        </button>
      </div>
    </Form>
  )
}

export default ProfileForm
