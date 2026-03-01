import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link to="/forms" className="text-xl font-bold text-blue-500">
        FormBuilder
      </Link>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Halo, {user.name}</span>
        <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar