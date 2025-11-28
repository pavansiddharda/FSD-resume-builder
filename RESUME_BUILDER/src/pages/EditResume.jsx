import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resumeService } from '../services/api'
import ResumeForm from '../components/ResumeForm'
import TemplateSelector from '../components/TemplateSelector'
import ColorPaletteSelector from '../components/ColorPaletteSelector'
import SectionDesignSelector from '../components/SectionDesignSelector'
import FontSelector from '../components/FontSelector'
import ResumePreview from '../components/ResumePreview'
import { FaSpinner } from 'react-icons/fa'

const EditResume = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [resumeData, setResumeData] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState('classic-sidebar')
  const [selectedColorPalette, setSelectedColorPalette] = useState('blue-professional')
  const [selectedSectionDesign, setSelectedSectionDesign] = useState('card-modern')
  const [selectedFont, setSelectedFont] = useState('default')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const data = await resumeService.getById(id)
        setResumeData(data)
        setSelectedTemplate(data.templateId || 'classic-sidebar')
        setSelectedColorPalette(data.colorPaletteId || 'blue-professional')
        setSelectedSectionDesign(data.sectionDesignId || 'card-modern')
        setSelectedFont(data.fontId || 'default')
      } catch (error) {
        toast.error('Failed to load resume. Please try again.')
        console.error('Error fetching resume:', error)
        navigate('/resumes')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchResume()
    }
  }, [id, navigate])

  const handleSubmit = async (updatedData) => {
    setSaving(true)
    try {
      await resumeService.update(id, {
        ...updatedData,
        templateId: selectedTemplate,
        colorPaletteId: selectedColorPalette,
        sectionDesignId: selectedSectionDesign,
        fontId: selectedFont,
        updatedAt: new Date().toISOString()
      })
      toast.success('Resume updated successfully!')
      navigate(`/resumes/${id}`)
    } catch (error) {
      toast.error('Failed to update resume. Please try again.')
      console.error('Error updating resume:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDataChange = (data) => {
    setResumeData({ ...resumeData, ...data })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <FaSpinner className="animate-spin text-4xl text-white" />
      </div>
    )
  }

  if (!resumeData) {
    return (
      <div className="card text-center">
        <p className="text-gray-600">Resume not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Edit Resume</h1>
        <p className="text-white/90 text-lg">Update your resume information below</p>
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
            loading={saving}
            submitButtonText="Update Resume"
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

export default EditResume

