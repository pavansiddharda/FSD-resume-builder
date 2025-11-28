import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resumeService } from '../services/api'
import ResumeForm from '../components/ResumeForm'
import TemplateSelector from '../components/TemplateSelector'
import ColorPaletteSelector from '../components/ColorPaletteSelector'
import SectionDesignSelector from '../components/SectionDesignSelector'
import FontSelector from '../components/FontSelector'
import CustomSectionBuilder from '../components/CustomSectionBuilder'
import ResumePreview from '../components/ResumePreview'

const CreateResume = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('classic-sidebar')
  const [selectedColorPalette, setSelectedColorPalette] = useState('blue-professional')
  const [selectedSectionDesign, setSelectedSectionDesign] = useState('card-modern')
  const [selectedFont, setSelectedFont] = useState('default')
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: '',
      photo: ''
    },
    skills: [],
    education: [],
    experience: [],
    projects: []
  })

  const handleSubmit = async (formData) => {
    setLoading(true)
    try {
      const newResume = await resumeService.create({
        ...formData,
        templateId: selectedTemplate,
        colorPaletteId: selectedColorPalette,
        sectionDesignId: selectedSectionDesign,
        fontId: selectedFont,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      toast.success('Resume created successfully!')
      navigate(`/resumes/${newResume.id}`)
    } catch (error) {
      let errorMessage = 'Failed to create resume. Please try again.'
      
      if (error.message && error.message.includes('Cannot connect to server')) {
        errorMessage = 'Cannot connect to server. Please make sure JSON-Server is running. Run "npm run server" in a separate terminal.'
      } else if (error.response) {
        errorMessage = `Server error: ${error.response.status} - ${error.response.statusText}`
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`
      }
      
      toast.error(errorMessage)
      console.error('Error creating resume:', error)
      if (error.response) {
        console.error('Response data:', error.response.data)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDataChange = (data) => {
    setResumeData(data)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Create New Resume</h1>
        <p className="text-white/90 text-lg">Fill in the form below to create your professional resume</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Forms */}
        <div className="space-y-6">
          <TemplateSelector 
            selectedTemplate={selectedTemplate}
            onSelectTemplate={setSelectedTemplate}
          />
          <ColorPaletteSelector 
            selectedPalette={selectedColorPalette}
            onSelectPalette={setSelectedColorPalette}
          />
          <SectionDesignSelector 
            selectedDesign={selectedSectionDesign}
            onSelectDesign={setSelectedSectionDesign}
          />
          <FontSelector 
            selectedFont={selectedFont}
            onSelectFont={setSelectedFont}
          />
          <ResumeForm 
            initialData={resumeData} 
            onSubmit={handleSubmit} 
            loading={loading}
            submitButtonText="Create Resume"
            onDataChange={handleDataChange}
          />
        </div>

        {/* Right Column - Preview */}
        <div className="lg:sticky lg:top-6 h-fit">
          <div className="card mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Live Preview</h3>
            <p className="text-sm text-gray-600">See how your resume looks in real-time</p>
          </div>
          <div className="card p-0 overflow-hidden shadow-2xl">
            <ResumePreview 
              resumeData={resumeData} 
              templateId={selectedTemplate}
              colorPaletteId={selectedColorPalette}
              sectionDesignId={selectedSectionDesign}
              fontId={selectedFont}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateResume