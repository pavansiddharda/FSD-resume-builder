import { useState } from 'react'
import { FaCheck, FaPalette } from 'react-icons/fa'
import { templates, getAllCategories, getTemplateById } from '../utils/templates'

const TemplateSelector = ({ selectedTemplate, onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = ['All', ...getAllCategories()]

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory)

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <FaPalette className="text-primary-500 text-xl" />
        <h2 className="section-title mb-0">Choose a Template</h2>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto custom-scrollbar p-2">
        {filteredTemplates.map(template => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={`relative group rounded-lg overflow-hidden border-2 transition-all transform hover:scale-105 text-left ${
              selectedTemplate === template.id
                ? 'border-primary-500 ring-4 ring-primary-200 shadow-xl'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <div className={`${template.preview} h-20 w-full`} />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
              {selectedTemplate === template.id && (
                <div className="bg-primary-500 rounded-full p-2">
                  <FaCheck className="text-white text-sm" />
                </div>
              )}
            </div>
            <div className="p-3 bg-white">
              <p className="text-sm font-semibold text-gray-800 mb-1">{template.name}</p>
              <p className="text-xs text-gray-500 mb-2">{template.category}</p>
              <p className="text-xs text-gray-600 leading-tight">{template.description}</p>
              <div className="mt-2 flex items-center gap-2 text-xs">
                {template.hasPhoto && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Photo</span>
                )}
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded capitalize">{template.layout}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedTemplate && (
        <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-200">
          <p className="text-sm text-primary-800">
            <strong>Selected:</strong> {getTemplateById(selectedTemplate)?.name}
          </p>
        </div>
      )}
    </div>
  )
}

export default TemplateSelector

