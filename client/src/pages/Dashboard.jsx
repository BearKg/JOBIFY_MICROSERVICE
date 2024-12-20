import React, { useEffect, useState } from 'react'
import { InnerNavbar, Navbar, Sidebar } from '../components'
import styled from 'styled-components'

import { MdOutlinePostAdd } from 'react-icons/md'
import { MdOutlineFindInPage } from 'react-icons/md'
import { MdQueryStats } from 'react-icons/md'
import { MdOutlinePerson } from 'react-icons/md'
import { Outlet, redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'
import { useNavigation } from 'react-router-dom'

const sidebarBtn = [
  { icon: <MdOutlinePostAdd />, label: 'Add Job', link: '/dashboard' },
  {
    icon: <MdOutlineFindInPage />,
    label: 'All Job',
    link: '/dashboard/all-jobs',
  },
  { icon: <MdQueryStats />, label: 'Stats', link: '/dashboard/stats' },
  { icon: <MdOutlinePerson />, label: 'Profile', link: '/dashboard/profile' },
]

export const loader = (store) => async () => {
  const user = store.getState().userState.user
  if (!user) {
    toast.warn('You must be logged in')
    return redirect('/login')
  }
  return { user }
}

const Dashboard = () => {
  const navigation = useNavigation()
  const isPageLoading = navigation.state === 'loading'
  return (
    <Wrapper className="relative">
      <Sidebar sidebarBtn={sidebarBtn} />
      <div className="w-10/12 transition-all duration-500 bg-base-200 absolute right-0 page-section">
        <InnerNavbar />
        {isPageLoading ? (
          <Loading />
        ) : (
          <div className="mt-28">
            <Outlet />
          </div>
        )}
      </div>
    </Wrapper>
  )
}

export default Dashboard

const Wrapper = styled.section `
  .page-section {
    min-height: 100vh;
  }
`