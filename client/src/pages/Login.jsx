import { Form, Link, redirect, useNavigate } from 'react-router-dom'
import { Navbar, FormInput } from '../components'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'
import { loginUser } from '../features/user/userSlice'
import { useDispatch } from 'react-redux'

export const action = (store) => async ({ request }) => {
  const dataForm = await request.formData()
  const data = Object.fromEntries(dataForm)
  try {
    const response = await customFetch.post('/auth/login', data)
    store.dispatch(loginUser(response.data))
    toast.success('Successfully logged in')
    return redirect('/dashboard')
  } catch (error) {
    const errorMessage =
      error?.response?.data?.msg ||
      'please double check your email and password'
    toast.error(errorMessage)
    return null
  }
}
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: 'password',
    }
    try {
      const response = await customFetch.post('/auth/login', data)
      toast.success('Testing user logged in')
      dispatch(loginUser(response.data))
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  }
  return (
    <article className="grid h-full w-full justify-center">
      <Form
        method="POST"
        className="py-8 px-10 bg-white shadow-xl border-t-4 border-t-accent my-12 rounded-md w-96"
      >
        <Navbar more="justify-center" />
        <h4 className="text-center text-xl font-md">Login</h4>
        <FormInput label="email" name="email" type="email" size="input-md" />
        <FormInput
          label="password"
          name="password"
          type="password"
          size="input-md"
        />
        <button type="submit" className="btn btn-accent w-full btn-sm mt-4">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-accent w-full btn-sm my-4"
          onClick={loginDemoUser}
        >
          Demo User
        </button>
        <p className="text-center">
          Not a member yet?{' '}
          <Link to="/register" className="text-accent">
            Register
          </Link>
        </p>
      </Form>
    </article>
  )
}
export default Login
