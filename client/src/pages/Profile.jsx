import { useEffect } from 'react'
import ProfileForm from '../components/ProfileForm'

const Profile = () => {
  useEffect(() => {
    localStorage.setItem('page', '/dashboard/profile')
  }, [])
  return (
    <div className="h-screen">
      <ProfileForm />
    </div>
  )
}
export default Profile
