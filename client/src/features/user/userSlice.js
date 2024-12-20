import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null
}

const defaultValue = {
  user: getUserFromLocalStorage(),
}

const userSlice = createSlice({
  name: 'user',
  initialState: defaultValue,
  reducers: {
    updateUser: (state, action) => {
      const user = {...state.user, ...action.payload.user}
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.token }
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logoutUser: (state) => {
      state.user = null // clear user property in slice
      localStorage.removeItem('user') // remove user item in local storage (or cookie in backend)
      toast.success('Logged out successfully')
    },
  },
})

export const { loginUser, logoutUser, updateUser } = userSlice.actions
export default userSlice.reducer
