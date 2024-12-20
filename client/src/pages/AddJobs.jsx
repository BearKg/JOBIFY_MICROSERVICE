import { AddJobForm } from "../components"
import { useEffect } from "react"
import {toast} from "react-toastify"

export const loader = (store) => () => {
  const user = store.getState().userState.user
  if (!user) {
    toast.warn('You must be logged in to checkout')
  
  }
  return null
}

const AddJobs = () => {
  useEffect(() => {
    localStorage.setItem('page', '/dashboard')
  }, [])
  return (
    <div className="h-screen">
      <AddJobForm />
    </div>
  )
}
export default AddJobs