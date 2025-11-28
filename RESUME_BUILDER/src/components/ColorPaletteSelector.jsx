import { useState } from 'react'
import { FaPalette, FaCheck } from 'react-icons/fa'
import { colorPalettes, getAllPaletteCategories, getPaletteById } from '../utils/colorPalettes'

const ColorPaletteSelector = ({ selectedPalette, onSelectPalette }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = ['All', ...getAllPaletteCategories()]

  const filteredPalettes = selectedCategory === 'All' 
    ? colorPalettes 
    : colorPalettes.filter(p => p.category === selectedCategory)

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <FaPalette className="text-primary-500 text-xl" />
        <h2 className="section-title mb-0">Choose Color Palette</h2>
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

      {/* Palette Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto custom-scrollbar p-2">
        {filteredPalettes.map(palette => (
          <button
            key={palette.id}
            onClick={() => onSelectPalette(palette.id)}
            className={`relative group rounded-lg overflow-hidden border-2 transition-all transform hover:scale-105 ${
              selectedPalette === palette.id
                ? 'border-primary-500 ring-4 ring-primary-200 shadow-xl'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            {/* Color Preview */}
            <div className="h-20 flex">
              <div className="flex-1" style={{ backgroundColor: palette.primary }} />
              <div className="flex-1" style={{ backgroundColor: palette.secondary }} />
              <div className="flex-1" style={{ backgroundColor: palette.accent }} />
            </div>
            
            {/* Selected Indicator */}
            {selectedPalette === palette.id && (
              <div className="absolute top-2 right-2 bg-primary-500 rounded-full p-1">
                <FaCheck className="text-white text-xs" />
              </div>
            )}
            
            {/* Palette Info */}
            <div className="p-3 bg-white">
              <p className="text-sm font-semibold text-gray-800">{palette.name}</p>
              <p className="text-xs text-gray-500">{palette.category}</p>
            </div>
          </button>
        ))}
      </div>

      {selectedPalette && (
        <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-200">
          <p className="text-sm text-primary-800 mb-2">
            <strong>Selected:</strong> {getPaletteById(selectedPalette)?.name}
          </p>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: getPaletteById(selectedPalette)?.primary }} />
              <span className="text-xs text-gray-600">Primary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: getPaletteById(selectedPalette)?.secondary }} />
              <span className="text-xs text-gray-600">Secondary</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: getPaletteById(selectedPalette)?.accent }} />
              <span className="text-xs text-gray-600">Accent</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorPaletteSelector

