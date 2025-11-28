import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaHome, FaPlus, FaList, FaFileAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { authService } from '../services/api'
import { useEffect, useState } from 'react'

const Layout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
  }, [])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-purple-700">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center space-x-2 px-4 py-2 text-primary-600 font-bold text-xl">
                <FaFileAlt />
                <span>Resume Builder</span>
              </Link>
            </div>
            <div className="flex items-center space-x-1">
              <Link
                to="/"
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive('/') 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FaHome className="mr-2" />
                Home
              </Link>
              <Link
                to="/create"
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive('/create') 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FaPlus className="mr-2" />
                Create
              </Link>
              <Link
                to="/resumes"
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isActive('/resumes') 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FaList className="mr-2" />
                My Resumes
              </Link>
              {user && (
                <div className="flex items-center ml-4 pl-4 border-l border-gray-300">
                  <div className="flex items-center mr-4 text-gray-700">
                    <FaUser className="mr-2" />
                    <span className="font-medium">{user.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

export default Layout

