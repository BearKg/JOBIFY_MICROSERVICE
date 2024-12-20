import { Link } from 'react-router-dom'
import { useGlobalContext } from './context'
import { useEffect } from 'react'

const Sidebar = ({ sidebarBtn }) => {
  const { currentPage, setCurrentPage, handleCurrentPage } = useGlobalContext()
  useEffect(() => {
    setCurrentPage(localStorage.getItem('page'))
  }, [])
  return (
    <nav className="sidebar w-2/12 transition-all duration-500 fixed h-screen top-0 left-0 z-10 bg-base-100 overflow-hidden">
      <div className="py-5 transition-all duration-500">
        <a className="text-accent text-3xl font-bold flex gap-1 pl-10 h-12 items-center">
          <h4 className="text-4xl font-extrabold bg-accent text-slate-50 rounded-lg w-12 h-12 text-center">
            J
          </h4>
          Jobify
        </a>
      </div>
      <ul className="pt-8 transition-all duration-500">
        {sidebarBtn.map((item) => {
          return (
            <li
              key={item.label}
              className="py-4 pl-10 hover:pl-12 transition-all hover:duration-500 duration-500 "
            >
              <Link
                to={item.link}
                className={`flex flex-row w-full ${
                  currentPage === item.link ? 'text-accent' : 'text-slate-500'
                } leading-8`}
                onClick={() => handleCurrentPage(item.link)}
              >
                <i className="text-3xl mr-4">{item.icon}</i>
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
export default Sidebar
