import { useState, useEffect } from 'react'
import { FaPlus, FaTimes, FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'
import CustomSectionBuilder from './CustomSectionBuilder'
import RichTextEditor from './RichTextEditor'

const ResumeForm = ({ initialData, onSubmit, loading, submitButtonText, onDataChange }) => {
  const [resumeData, setResumeData] = useState(initialData)
  const [currentSkill, setCurrentSkill] = useState('')
  const [currentEducation, setCurrentEducation] = useState({
    degree: '',
    school: '',
    year: '',
    gpa: ''
  })
  const [currentExperience, setCurrentExperience] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  })
  const [currentProject, setCurrentProject] = useState({
    name: '',
    description: '',
    technologies: '',
    link: '',
    date: ''
  })

  useEffect(() => {
    setResumeData(initialData)
  }, [initialData])

  const updateResumeData = (newData) => {
    setResumeData(newData)
    if (onDataChange) {
      onDataChange(newData)
    }
  }

  const updatePersonalInfo = (field, value) => {
    const newData = {
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value
      }
    }
    updateResumeData(newData)
  }

  const addSkill = () => {
    // Handle both old format (string) and new format (object) for backward compatibility
    const skillText = typeof currentSkill === 'string' ? currentSkill.trim() : currentSkill.text?.trim() || currentSkill
    if (skillText) {
      const newData = {
        ...resumeData,
        skills: [...(resumeData.skills || []), skillText]
      }
      updateResumeData(newData)
      setCurrentSkill('')
      toast.success('Skill added!')
    } else {
      toast.warning('Please enter a skill')
    }
  }

  const removeSkill = (index) => {
    const newData = {
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index)
    }
    updateResumeData(newData)
    toast.info('Skill removed')
  }

  const addEducation = () => {
    if (!currentEducation.degree.trim() || !currentEducation.school.trim()) {
      toast.warning('Please fill in degree and school fields')
      return
    }
    const newData = {
      ...resumeData,
      education: [...(resumeData.education || []), { ...currentEducation }]
    }
    updateResumeData(newData)
    setCurrentEducation({ degree: '', school: '', year: '', gpa: '' })
    toast.success('Education added!')
  }

  const removeEducation = (index) => {
    const newData = {
      ...resumeData,
      education: resumeData.education.filter((_, i) => i !== index)
    }
    updateResumeData(newData)
    toast.info('Education entry removed')
  }

  const addExperience = () => {
    if (!currentExperience.title.trim() || !currentExperience.company.trim()) {
      toast.warning('Please fill in title and company fields')
      return
    }
    const newData = {
      ...resumeData,
      experience: [...(resumeData.experience || []), { ...currentExperience }]
    }
    updateResumeData(newData)
    setCurrentExperience({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    })
    toast.success('Experience added!')
  }

  const removeExperience = (index) => {
    const newData = {
      ...resumeData,
      experience: resumeData.experience.filter((_, i) => i !== index)
    }
    updateResumeData(newData)
    toast.info('Experience entry removed')
  }

  const addProject = () => {
    if (!currentProject.name.trim()) {
      toast.warning('Please fill in project name')
      return
    }
    const newData = {
      ...resumeData,
      projects: [...(resumeData.projects || []), { ...currentProject }]
    }
    updateResumeData(newData)
    setCurrentProject({
      name: '',
      description: '',
      technologies: '',
      link: '',
      date: ''
    })
    toast.success('Project added!')
  }

  const removeProject = (index) => {
    const newData = {
      ...resumeData,
      projects: resumeData.projects.filter((_, i) => i !== index)
    }
    updateResumeData(newData)
    toast.info('Project removed')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!resumeData.personalInfo?.fullName || !resumeData.personalInfo?.email) {
      toast.error('Please fill in at least name and email')
      return
    }

    onSubmit(resumeData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="card">
        <h2 className="section-title">Personal Information</h2>
        
        {/* Photo Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Photo (Optional)
          </label>
          <div className="flex items-center gap-4">
            {resumeData.personalInfo?.photo ? (
              <div className="relative">
                <img 
                  src={resumeData.personalInfo.photo} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary-200"
                />
                <button
                  type="button"
                  onClick={() => updatePersonalInfo('photo', '')}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300">
                <span className="text-gray-400 text-xs text-center px-2">No Photo</span>
              </div>
            )}
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                      updatePersonalInfo('photo', reader.result)
                    }
                    reader.readAsDataURL(file)
                  }
                }}
                className="input-field text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Upload a professional headshot (JPG, PNG)</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={resumeData.personalInfo?.fullName || ''}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              className="input-field"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              value={resumeData.personalInfo?.email || ''}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              className="input-field"
              placeholder="john.doe@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={resumeData.personalInfo?.phone || ''}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              className="input-field"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              value={resumeData.personalInfo?.address || ''}
              onChange={(e) => updatePersonalInfo('address', e.target.value)}
              className="input-field"
              placeholder="City, State"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn
            </label>
            <input
              type="text"
              value={resumeData.personalInfo?.linkedin || ''}
              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              className="input-field"
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website/Portfolio
            </label>
            <input
              type="text"
              value={resumeData.personalInfo?.website || ''}
              onChange={(e) => updatePersonalInfo('website', e.target.value)}
              className="input-field"
              placeholder="www.yourwebsite.com"
            />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="card">
        <h2 className="section-title">Skills</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            className="input-field flex-1"
            placeholder="e.g., JavaScript, Python, React"
          />
          <button
            type="button"
            onClick={addSkill}
            className="btn-primary inline-flex items-center"
          >
            <FaPlus className="mr-2" />
            Add
          </button>
        </div>
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="space-y-1">
            {resumeData.skills.map((skill, index) => {
              const skillText = typeof skill === 'string' ? skill : skill.text || skill
              return (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                  <span className="text-gray-700">{skillText}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Education */}
      <div className="card">
        <h2 className="section-title">Education</h2>
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Degree/Certification *
            </label>
            <input
              type="text"
              value={currentEducation.degree}
              onChange={(e) => setCurrentEducation({ ...currentEducation, degree: e.target.value })}
              className="input-field"
              placeholder="Bachelor of Science in Computer Science"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              School/University *
            </label>
            <input
              type="text"
              value={currentEducation.school}
              onChange={(e) => setCurrentEducation({ ...currentEducation, school: e.target.value })}
              className="input-field"
              placeholder="University Name"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <input
                type="text"
                value={currentEducation.year}
                onChange={(e) => setCurrentEducation({ ...currentEducation, year: e.target.value })}
                className="input-field"
                placeholder="2020-2024"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GPA (Optional)
              </label>
              <input
                type="text"
                value={currentEducation.gpa}
                onChange={(e) => setCurrentEducation({ ...currentEducation, gpa: e.target.value })}
                className="input-field"
                placeholder="3.8"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={addEducation}
            className="btn-primary w-full inline-flex items-center justify-center"
          >
            <FaPlus className="mr-2" />
            Add Education
          </button>
        </div>
        {resumeData.education && resumeData.education.length > 0 && (
          <div className="space-y-3">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="bg-gray-50 border-l-4 border-primary-500 p-4 rounded">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
                    <p className="text-sm text-gray-600">{edu.school}</p>
                    <p className="text-xs text-gray-500">
                      {edu.year && `${edu.year} • `}
                      {edu.gpa && `GPA: ${edu.gpa}`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Experience */}
      <div className="card">
        <h2 className="section-title">Work Experience</h2>
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              value={currentExperience.title}
              onChange={(e) => setCurrentExperience({ ...currentExperience, title: e.target.value })}
              className="input-field"
              placeholder="Software Engineer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company *
            </label>
            <input
              type="text"
              value={currentExperience.company}
              onChange={(e) => setCurrentExperience({ ...currentExperience, company: e.target.value })}
              className="input-field"
              placeholder="Company Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={currentExperience.location}
              onChange={(e) => setCurrentExperience({ ...currentExperience, location: e.target.value })}
              className="input-field"
              placeholder="City, State"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="text"
                value={currentExperience.startDate}
                onChange={(e) => setCurrentExperience({ ...currentExperience, startDate: e.target.value })}
                className="input-field"
                placeholder="Jan 2020"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="text"
                value={currentExperience.endDate}
                onChange={(e) => setCurrentExperience({ ...currentExperience, endDate: e.target.value })}
                className="input-field"
                placeholder="Present"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <RichTextEditor
              value={currentExperience.description}
              onChange={(html) => setCurrentExperience({ ...currentExperience, description: html })}
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
          <button
            type="button"
            onClick={addExperience}
            className="btn-primary w-full inline-flex items-center justify-center"
          >
            <FaPlus className="mr-2" />
            Add Experience
          </button>
        </div>
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="space-y-3">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="bg-gray-50 border-l-4 border-primary-500 p-4 rounded">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{exp.title}</h4>
                    <p className="text-sm text-primary-600">{exp.company}</p>
                    <p className="text-xs text-gray-500">
                      {exp.location && `${exp.location} • `}
                      {exp.startDate && `${exp.startDate} - ${exp.endDate || 'Present'}`}
                    </p>
                    {exp.description && (
                      <div 
                        className="text-sm text-gray-600 mt-2 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: exp.description }}
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Projects */}
      <div className="card">
        <h2 className="section-title">Projects</h2>
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name *
            </label>
            <input
              type="text"
              value={currentProject.name}
              onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
              className="input-field"
              placeholder="E-commerce Website"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <RichTextEditor
              value={currentProject.description}
              onChange={(html) => setCurrentProject({ ...currentProject, description: html })}
              placeholder="Describe your project..."
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies
              </label>
              <input
                type="text"
                value={currentProject.technologies}
                onChange={(e) => setCurrentProject({ ...currentProject, technologies: e.target.value })}
                className="input-field"
                placeholder="React, Node.js, MongoDB"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="text"
                value={currentProject.date}
                onChange={(e) => setCurrentProject({ ...currentProject, date: e.target.value })}
                className="input-field"
                placeholder="2024"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link (Optional)
            </label>
            <input
              type="text"
              value={currentProject.link}
              onChange={(e) => setCurrentProject({ ...currentProject, link: e.target.value })}
              className="input-field"
              placeholder="https://github.com/username/project"
            />
          </div>
          <button
            type="button"
            onClick={addProject}
            className="btn-primary w-full inline-flex items-center justify-center"
          >
            <FaPlus className="mr-2" />
            Add Project
          </button>
        </div>
        {resumeData.projects && resumeData.projects.length > 0 && (
          <div className="space-y-3">
            {resumeData.projects.map((project, index) => (
              <div key={index} className="bg-gray-50 border-l-4 border-primary-500 p-4 rounded">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{project.name}</h4>
                    {project.technologies && (
                      <p className="text-sm text-primary-600">{project.technologies}</p>
                    )}
                    {project.date && (
                      <p className="text-xs text-gray-500">{project.date}</p>
                    )}
                    {project.description && (
                      <div 
                        className="text-sm text-gray-600 mt-2 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: project.description }}
                      />
                    )}
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:underline mt-1 inline-block"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Sections */}
      <CustomSectionBuilder 
        resumeData={resumeData}
        onDataChange={updateResumeData}
      />

      {/* Submit Button */}
      <div className="card">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 text-lg inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Processing...
            </>
          ) : (
            submitButtonText
          )}
        </button>
      </div>
    </form>
  )
}

export default ResumeForm

