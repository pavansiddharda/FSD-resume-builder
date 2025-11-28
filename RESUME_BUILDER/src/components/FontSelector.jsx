import { availableFonts } from '../utils/fontsAndIcons'

const FontSelector = ({ selectedFont, onSelectFont }) => {
  return (
    <div className="card">
      <h2 className="section-title">Resume Font Style</h2>
      <p className="text-sm text-gray-600 mb-4">Choose a font for your entire resume</p>
      <select
        value={selectedFont || 'default'}
        onChange={(e) => onSelectFont(e.target.value)}
        className="input-field"
      >
        {availableFonts.map(font => (
          <option key={font.id} value={font.id}>{font.name}</option>
        ))}
      </select>
    </div>
  )
}

export default FontSelector

