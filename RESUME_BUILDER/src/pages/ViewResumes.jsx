import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resumeService } from '../services/api'
import { FaEdit, FaTrash, FaEye, FaSpinner, FaFileAlt } from 'react-icons/fa'

const ViewResumes = () => {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      const data = await resumeService.getAll()
      setResumes(data)
    } catch (error) {
      toast.error('Failed to load resumes. Please try again.')
      console.error('Error fetching resumes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) {
      return
    }

    setDeletingId(id)
    try {
      await resumeService.delete(id)
      toast.success('Resume deleted successfully!')
      setResumes(resumes.filter(resume => resume.id !== id))
    } catch (error) {
      toast.error('Failed to delete resume. Please try again.')
      console.error('Error deleting resume:', error)
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <FaSpinner className="animate-spin text-4xl text-white" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Resumes</h1>
          <p className="text-white/90">Manage all your saved resumes</p>
        </div>
        <Link to="/create" className="btn-primary inline-flex items-center">
          <FaFileAlt className="mr-2" />
          Create New Resume
        </Link>
      </div>

      {resumes.length === 0 ? (
        <div className="card text-center py-12">
          <FaFileAlt className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Resumes Yet</h2>
          <p className="text-gray-600 mb-6">Create your first professional resume to get started!</p>
          <Link to="/create" className="btn-primary inline-flex items-center">
            <FaFileAlt className="mr-2" />
            Create Your First Resume
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div key={resume.id} className="card hover:shadow-xl transition-shadow">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {resume.personalInfo?.fullName || 'Untitled Resume'}
                </h3>
                <p className="text-sm text-gray-600">
                  Created: {formatDate(resume.createdAt)}
                </p>
                {resume.updatedAt && resume.updatedAt !== resume.createdAt && (
                  <p className="text-sm text-gray-500">
                    Updated: {formatDate(resume.updatedAt)}
                  </p>
                )}
              </div>
              
              <div className="mb-4 text-sm text-gray-600">
                <p><strong>Email:</strong> {resume.personalInfo?.email || 'N/A'}</p>
                <p><strong>Skills:</strong> {resume.skills?.length || 0}</p>
                <p><strong>Education:</strong> {resume.education?.length || 0}</p>
                <p><strong>Experience:</strong> {resume.experience?.length || 0}</p>
              </div>

              <div className="flex space-x-2 pt-4 border-t">
                <Link
                  to={`/resumes/${resume.id}`}
                  className="flex-1 btn-secondary inline-flex items-center justify-center"
                >
                  <FaEye className="mr-2" />
                  View
                </Link>
                <Link
                  to={`/resumes/${resume.id}/edit`}
                  className="flex-1 btn-primary inline-flex items-center justify-center"
                >
                  <FaEdit className="mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(resume.id)}
                  disabled={deletingId === resume.id}
                  className="btn-danger inline-flex items-center justify-center px-3"
                >
                  {deletingId === resume.id ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaTrash />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewResumes

