import { Link } from 'react-router-dom'

const Navbar = ({ more }) => {
  return (
    <nav className={`navbar px-14 ${more}`}>
      <a className="btn p-0 btn-ghost text-accent text-3xl font-bold h-full">
        <h4 className="px-5 py-2 text-4xl font-extrabold bg-accent text-slate-50 rounded-lg">
          J
        </h4>
        Jobify
      </a>
    </nav>
  )
}
export default Navbar
