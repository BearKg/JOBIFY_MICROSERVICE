import { Link } from 'react-router-dom'
import { Navbar } from '../components'
import img from '../assets/images/undraw_exploring_re_grb8.svg'
const Landing = () => {
  return (
    <article>
      <Navbar more="py-8"/>
      <div className="flex mx-14 justify-center py-14">
        <div className="flex flex-col justify-center gap-8 mr-40">
          <h4 className="text-6xl font-bold text-accent-content">
            Job <span className="text-accent">Tracking</span> App
          </h4>
          <p>
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <div className="flex justify-start gap-4">
            <Link className="btn btn-accent text-slate-50" to="/register">
              Register
            </Link>
            <Link className="btn btn-accent text-slate-50" to="/login">
              Login / Demo User
            </Link>
          </div>
        </div>
        <img className="w-96" src={img} alt="landing image" />
      </div>
    </article>
  )
}
export default Landing
