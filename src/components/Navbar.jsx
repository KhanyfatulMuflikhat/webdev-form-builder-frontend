import { Link } from 'react-router-dom'
import { dummyUser } from '../data/dummyData'

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link to="/forms" className="text-xl font-bold text-blue-500">
        FormBuilder
      </Link>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Halo, {dummyUser.name}</span>
        <Link to="/login">
          <button className="text-sm text-red-500 hover:underline">Logout</button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar