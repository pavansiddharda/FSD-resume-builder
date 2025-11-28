import { useState, useEffect } from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import RichTextEditor from './RichTextEditor'

const CustomSectionBuilder = ({ resumeData, onDataChange }) => {
  const [customSections, setCustomSections] = useState(resumeData?.customSections || [])
  const [currentSection, setCurrentSection] = useState({
    title: '',
    content: '',
    items: []
  })
  const [currentItem, setCurrentItem] = useState('')
  
  // Sync with resumeData changes
  useEffect(() => {
    if (resumeData?.customSections) {
      setCustomSections(resumeData.customSections)
    }
  }, [resumeData?.customSections])

  const addCustomSection = () => {
    if (!currentSection.title.trim()) {
      toast.warning('Please enter a section title')
      return
    }
    
    const newSections = [...customSections, { ...currentSection }]
    setCustomSections(newSections)
    updateResumeData({ ...resumeData, customSections: newSections })
    setCurrentSection({ title: '', content: '', items: [] })
    toast.success('Custom section added!')
  }

  const removeCustomSection = (index) => {
    const newSections = customSections.filter((_, i) => i !== index)
    setCustomSections(newSections)
    updateResumeData({ ...resumeData, customSections: newSections })
    toast.info('Custom section removed')
  }

  const addItemToSection = (sectionIndex) => {
    const itemText = typeof currentItem === 'string' ? currentItem.trim() : currentItem.text?.trim() || currentItem
    if (!itemText) {
      toast.warning('Please enter an item')
      return
    }
    
    const newSections = [...customSections]
    newSections[sectionIndex].items = [...(newSections[sectionIndex].items || []), itemText]
    setCustomSections(newSections)
    updateResumeData({ ...resumeData, customSections: newSections })
    setCurrentItem('')
    toast.success('Item added!')
  }

  const removeItemFromSection = (sectionIndex, itemIndex) => {
    const newSections = [...customSections]
    newSections[sectionIndex].items = newSections[sectionIndex].items.filter((_, i) => i !== itemIndex)
    setCustomSections(newSections)
    updateResumeData({ ...resumeData, customSections: newSections })
    toast.info('Item removed')
  }

  const updateResumeData = (newData) => {
    if (onDataChange) {
      onDataChange(newData)
    }
  }

  return (
    <div className="card">
      <h2 className="section-title">Custom Sections</h2>
      <p className="text-sm text-gray-600 mb-4">Add additional sections like Certifications, Awards, Languages, etc.</p>
      
      {/* Add New Section Form */}
      <div className="space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section Title *
          </label>
          <input
            type="text"
            value={currentSection.title}
            onChange={(e) => setCurrentSection({ ...currentSection, title: e.target.value })}
            className="input-field"
            placeholder="e.g., Certifications, Awards, Languages"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section Content (Optional)
          </label>
          <RichTextEditor
            value={currentSection.content}
            onChange={(html) => setCurrentSection({ ...currentSection, content: html })}
            placeholder="General description or content for this section..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Items (Optional)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={currentItem}
              onChange={(e) => setCurrentItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && currentSection.title && addItemToSection(customSections.length)}
              className="input-field flex-1"
              placeholder="e.g., AWS Certified, Google Analytics"
            />
            <button
              type="button"
              onClick={() => {
                if (currentSection.title && currentItem.trim()) {
                  const tempSection = { ...currentSection }
                  tempSection.items = [...(tempSection.items || []), currentItem.trim()]
                  setCurrentSection(tempSection)
                  setCurrentItem('')
                }
              }}
              className="btn-primary inline-flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Item
            </button>
          </div>
          {currentSection.items && currentSection.items.length > 0 && (
            <div className="space-y-1 mt-2">
              {currentSection.items.map((item, index) => {
                const itemText = typeof item === 'string' ? item : item.text || item
                return (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                    <span className="text-gray-700">{itemText}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newItems = currentSection.items.filter((_, i) => i !== index)
                        setCurrentSection({ ...currentSection, items: newItems })
                      }}
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
        <button
          type="button"
          onClick={addCustomSection}
          className="btn-primary w-full inline-flex items-center justify-center"
        >
          <FaPlus className="mr-2" />
          Add Custom Section
        </button>
      </div>

      {/* Existing Custom Sections */}
      {customSections.length > 0 && (
        <div className="space-y-3">
          {customSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-gray-50 border-l-4 border-primary-500 p-4 rounded">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-lg">{section.title}</h4>
                  {section.content && (
                    <div 
                      className="text-sm text-gray-600 mt-1 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  )}
                  {section.items && section.items.length > 0 && (
                    <div className="space-y-1 mt-2">
                      {section.items.map((item, itemIndex) => {
                        const itemText = typeof item === 'string' ? item : item.text || item
                        return (
                          <div key={itemIndex} className="flex items-center justify-between py-1">
                            <span className="text-gray-700">{itemText}</span>
                            <button
                              type="button"
                              onClick={() => removeItemFromSection(sectionIndex, itemIndex)}
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
                <button
                  type="button"
                  onClick={() => removeCustomSection(sectionIndex)}
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
  )
}

export default CustomSectionBuilder

