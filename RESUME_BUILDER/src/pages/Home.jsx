import { Link } from 'react-router-dom'
import { FaPlus, FaList, FaFileAlt, FaDownload, FaEdit, FaEye } from 'react-icons/fa'

const Home = () => {
  return (
    <div className="text-center">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          📄 Resume Builder
        </h1>
        <p className="text-xl text-white/90 mb-8">
          Create professional resumes in minutes. No design skills required.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="card text-center">
          <div className="text-4xl mb-4 text-primary-500">
            <FaPlus />
          </div>
          <h3 className="text-xl font-semibold mb-2">Create Resume</h3>
          <p className="text-gray-600 mb-4">
            Start building your professional resume with our easy-to-use form.
          </p>
          <Link to="/create" className="btn-primary inline-flex items-center">
            <FaPlus className="mr-2" />
            Create New Resume
          </Link>
        </div>

        <div className="card text-center">
          <div className="text-4xl mb-4 text-primary-500">
            <FaList />
          </div>
          <h3 className="text-xl font-semibold mb-2">View Resumes</h3>
          <p className="text-gray-600 mb-4">
            Manage and view all your saved resumes in one place.
          </p>
          <Link to="/resumes" className="btn-primary inline-flex items-center">
            <FaList className="mr-2" />
            View All Resumes
          </Link>
        </div>

        <div className="card text-center">
          <div className="text-4xl mb-4 text-primary-500">
            <FaFileAlt />
          </div>
          <h3 className="text-xl font-semibold mb-2">Features</h3>
          <ul className="text-gray-600 text-left space-y-2 mb-4">
            <li className="flex items-center">
              <FaEdit className="mr-2 text-primary-500" />
              Easy editing
            </li>
            <li className="flex items-center">
              <FaEye className="mr-2 text-primary-500" />
              Real-time preview
            </li>
            <li className="flex items-center">
              <FaDownload className="mr-2 text-primary-500" />
              PDF export
            </li>
          </ul>
        </div>
      </div>

      <div className="card max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div>
            <div className="text-3xl font-bold text-primary-500 mb-2">1</div>
            <h4 className="font-semibold mb-2">Fill in Your Details</h4>
            <p className="text-gray-600 text-sm">
              Enter your personal information, skills, education, and work experience.
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-500 mb-2">2</div>
            <h4 className="font-semibold mb-2">Preview & Edit</h4>
            <p className="text-gray-600 text-sm">
              See your resume update in real-time and make adjustments as needed.
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-500 mb-2">3</div>
            <h4 className="font-semibold mb-2">Save & Download</h4>
            <p className="text-gray-600 text-sm">
              Save your resume and download it as a professional PDF document.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

