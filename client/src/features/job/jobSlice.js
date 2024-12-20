import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const getJobFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('job')) || null
}

const defaultValue = {
  job: getJobFromLocalStorage(),
}

const jobSlice = createSlice({
  name: 'job',
  initialState: defaultValue,
  reducers: {
    editJob: (state, action) => {
      const job = { ...action.payload }
      state.job = job
      localStorage.setItem('job', JSON.stringify(job))
    },
    clearJob: (state) => {
      state.job = null
      localStorage.removeItem('job')
    },
  },
})

export const { editJob, clearJob } = jobSlice.actions
export default jobSlice.reducer
