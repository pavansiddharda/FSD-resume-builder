import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CreateResume from './pages/CreateResume'
import EditResume from './pages/EditResume'
import ViewResumes from './pages/ViewResumes'
import ViewResume from './pages/ViewResume'
import Login from './pages/Login'
import { authService } from './services/api'
import AIPage from './pages/AIPage'

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const user = authService.getCurrentUser()
  return user ? children : <Navigate to="/login" replace />
}
/*module react router dym is used for dynamic routing as react cant give dynamic routing*/
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/create" element={<ProtectedRoute><CreateResume /></ProtectedRoute>} />
              <Route path="/resumes" element={<ProtectedRoute><ViewResumes /></ProtectedRoute>} />
              <Route path="/resumes/:id" element={<ProtectedRoute><ViewResume /></ProtectedRoute>} />
              <Route path="/resumes/:id/edit" element={<ProtectedRoute><EditResume /></ProtectedRoute>} />
              <Route path="/ai" element={<ProtectedRoute><AIPage /></ProtectedRoute>} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  )
}

export default App
