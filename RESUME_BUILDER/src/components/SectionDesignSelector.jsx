import { useState } from 'react'
import { FaLayerGroup, FaCheck } from 'react-icons/fa'
import { sectionDesigns, getAllSectionCategories, getSectionDesignById } from '../utils/sectionDesigns'

const SectionDesignSelector = ({ selectedDesign, onSelectDesign }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = ['All', ...getAllSectionCategories()]

  const filteredDesigns = selectedCategory === 'All' 
    ? sectionDesigns 
    : sectionDesigns.filter(d => d.category === selectedCategory)

  const getDesignPreview = (designId) => {
    const previews = {
      'card-modern': 'bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-300 rounded-lg shadow-md',
      'bordered-classic': 'bg-white border-l-4 border-blue-500',
      'minimal-clean': 'bg-gray-50 border-b border-gray-200',
      'gradient-header': 'bg-gradient-to-r from-blue-500 to-purple-500',
      'icon-accented': 'bg-blue-50 border border-blue-200 rounded',
      'timeline-vertical': 'bg-white border-l-2 border-dashed border-blue-400',
      'boxed-contained': 'bg-white border-2 border-gray-300 rounded-lg',
      'underline-modern': 'bg-white border-b-2 border-blue-500',
      'badge-skills': 'bg-blue-100 rounded-full',
      'split-color': 'bg-gradient-to-r from-blue-50 to-purple-50'
    }
    return previews[designId] || previews['card-modern']
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <FaLayerGroup className="text-primary-500 text-xl" />
        <h2 className="section-title mb-0">Choose Section Design</h2>
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

      {/* Design Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto custom-scrollbar p-2">
        {filteredDesigns.map(design => (
          <button
            key={design.id}
            onClick={() => onSelectDesign(design.id)}
            className={`relative group rounded-lg overflow-hidden border-2 transition-all transform hover:scale-105 text-left ${
              selectedDesign === design.id
                ? 'border-primary-500 ring-4 ring-primary-200 shadow-xl'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            {/* Design Preview */}
            <div className={`${getDesignPreview(design.id)} h-16 w-full mb-2`} />
            
            {/* Selected Indicator */}
            {selectedDesign === design.id && (
              <div className="absolute top-2 right-2 bg-primary-500 rounded-full p-1">
                <FaCheck className="text-white text-xs" />
              </div>
            )}
            
            {/* Design Info */}
            <div className="p-3 bg-white">
              <p className="text-sm font-semibold text-gray-800 mb-1">{design.name}</p>
              <p className="text-xs text-gray-500 mb-2">{design.category}</p>
              <p className="text-xs text-gray-600 leading-tight">{design.description}</p>
            </div>
          </button>
        ))}
      </div>

      {selectedDesign && (
        <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-200">
          <p className="text-sm text-primary-800">
            <strong>Selected:</strong> {getSectionDesignById(selectedDesign)?.name}
          </p>
        </div>
      )}
    </div>
  )
}

export default SectionDesignSelector

