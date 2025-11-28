import { useState, useEffect } from 'react'
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa'
import { resumeService } from '../services/api'

const ServerStatus = () => {
  const [isOnline, setIsOnline] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkServer = async () => {
      try {
        await resumeService.getAll()
        setIsOnline(true)
      } catch (error) {
        setIsOnline(false)
      } finally {
        setChecking(false)
      }
    }

    checkServer()
    // Check every 5 seconds
    const interval = setInterval(checkServer, 5000)
    return () => clearInterval(interval)
  }, [])

  if (checking) {
    return null
  }

  if (!isOnline) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
        <div className="flex items-center">
          <FaExclamationTriangle className="text-red-500 text-xl mr-3" />
          <div className="flex-1">
            <h3 className="text-red-800 font-bold mb-1">JSON-Server Not Running</h3>
            <p className="text-red-700 text-sm mb-2">
              The backend server is not running. Please start it to create and save resumes.
            </p>
            <div className="bg-red-100 p-3 rounded text-sm text-red-800">
              <p className="font-semibold mb-1">To start the server:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Open a new terminal/command prompt</li>
                <li>Navigate to the project directory: <code className="bg-red-200 px-1 rounded">cd resume_builder</code></li>
                <li>Run: <code className="bg-red-200 px-1 rounded">npm run server</code></li>
                <li>Or use: <code className="bg-red-200 px-1 rounded">npm run dev:all</code> to run both frontend and backend</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-6 rounded">
      <div className="flex items-center">
        <FaCheckCircle className="text-green-500 text-lg mr-2" />
        <span className="text-green-800 text-sm font-medium">Server is running</span>
      </div>
    </div>
  )
}

export default ServerStatus

