import React, { useEffect, useState } from 'react'
import { FiAlignLeft } from 'react-icons/fi'
import { FaMoon } from 'react-icons/fa'
import { FaSun } from 'react-icons/fa'
import { FaUserCircle } from 'react-icons/fa'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useGlobalContext } from './context'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { clearJob } from '../features/job/jobSlice'
import { queryClient } from '../App'

const InnerNavbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(store => store.userState)
  const [openSidebar, setOpenSidebar] = useState(true)
  
  const closeSidebar = (e) => {
    const sidebar = document.querySelector('.sidebar')
    sidebar.childNodes[0].classList.toggle('-translate-x-60')
    sidebar.childNodes[1].classList.toggle('-translate-x-60')
    
    sidebar.parentNode.childNodes[1].classList.toggle('w-screen')
    
    let innerNavbar = e.target
    do {
      innerNavbar = innerNavbar.parentNode
    } while (!innerNavbar.classList.contains('navbar'))
    
    if(openSidebar) {
      sidebar.classList.replace('w-2/12', 'w-0')
      innerNavbar.parentNode.classList.replace('left-52', 'left-0')
      setOpenSidebar(false)
    } else {
      sidebar.classList.replace('w-0', 'w-2/12')
      innerNavbar.parentNode.classList.replace('left-0', 'left-52')
      setOpenSidebar(true)
    }
    innerNavbar.classList.toggle('w-10/12')
  }

  const { theme, setTheme } = useGlobalContext()

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dracula') : setTheme('light')
    localStorage.setItem('theme', theme)
  }

  useEffect(() => {
    const themeBtn = document.querySelector('.theme-btn')
    const currentTheme = localStorage.getItem('theme') || 'light'
    currentTheme === 'light'
      ? (themeBtn.checked = true)
      : (themeBtn.checked = false)
    const htmlElement = document.documentElement
    htmlElement.setAttribute('data-theme', currentTheme)
  }, [theme])

  const handleLogout = async () => {
    queryClient.removeQueries({
        queryKey: ['jobs'],
      })
    dispatch(logoutUser())
    dispatch(clearJob())
    navigate('/')
  }
  return (
    <div className="navbar bg-base-100 px-14 py-5 fixed transition-all duration-500 top-0 right-0 w-10/12 z-10">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" onClick={(e) => closeSidebar(e)}>
          <FiAlignLeft className="text-4xl text-accent" />
        </a>
      </div>
      <div className="flex-none gap-2">
        {/* Swap */}
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" onChange={toggleTheme} className="theme-btn"/>

          {/* sun icon */}
          <FaSun className="swap-on fill-current w-4 h-4" />

          {/* moon icon */}
          <FaMoon className="swap-off fill-current w-4 h-4" />
        </label>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost h-5">
            <div className="flex flex-row gap-2 leading-4 capitalize">
              <FaUserCircle className="w-5 h-5" />
              {user.name}
              <IoMdArrowDropdown className="w-5 h-5" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40"
          >
            <li onClick={handleLogout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default InnerNavbar
