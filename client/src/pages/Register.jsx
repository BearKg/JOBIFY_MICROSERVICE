import { Form, Link, redirect } from 'react-router-dom'
import { FormInput, Navbar } from '../components'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const dataForm = await request.formData()
  const data = Object.fromEntries(dataForm)
  try {
    const response = await customFetch.post('/auth/register', data)
    console.log(response);
    toast.success('Register successfully')
    return redirect('/register')
  } catch (error) {
    console.log(error);
    const errorMessage =
      error?.response?.data?.msg ||
      "please double check your credentials"
    toast.error(errorMessage)
    return null
  }
}

const Register = () => {
  return (
    <article className="grid h-full w-full justify-center">
      <Form
        method="POST"
        className="py-8 px-10 bg-white shadow-xl border-t-4 border-t-accent my-12 rounded-md w-96"
      >
        <Navbar more="justify-center" />
        <h4 className="text-center text-xl font-md">Register</h4>
        <FormInput label="name" name="name" type="text" size="input-md" />
        <FormInput
          label="last name"
          name="lastName"
          type="text"
          size="input-md"
        />
        <FormInput
          label="location"
          name="location"
          type="text"
          size="input-md"
        />
        <FormInput label="email" name="email" type="email" size="input-md" />
        <FormInput
          label="password"
          name="password"
          type="password"
          size="input-md"
        />
        <button type="submit" className="btn btn-accent w-full btn-sm my-4">
          Submit
        </button>
        <p className="text-center">
          Already a member?{' '}
          <Link to="/login" className="text-accent">
            Login
          </Link>
        </p>
      </Form>
    </article>
  )
}
export default Register
