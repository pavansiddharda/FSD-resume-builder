// Section Renderer - Applies different design styles to sections
import { FaGraduationCap, FaBriefcase, FaCode, FaUser } from 'react-icons/fa'

const SectionRenderer = ({ 
  title, 
  children, 
  design, 
  colors,
  icon 
}) => {
  const renderSection = () => {
    switch (design) {
      case 'card-modern':
        return (
          <div className="mb-6 p-6 bg-white rounded-lg shadow-lg border-2" style={{ borderColor: colors.accent }}>
            <h2 className="text-2xl font-bold mb-4 pb-3" style={{ color: colors.primary, borderBottom: `4px solid ${colors.accent}` }}>
              {title}
            </h2>
            <div className="mt-4">
              {children}
            </div>
          </div>
        )
      
      case 'bordered-classic':
        return (
          <div className="mb-6 border-l-4 pl-6 py-4 bg-gray-50 rounded-r-lg" style={{ borderColor: colors.primary, borderWidth: '6px' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
              {title}
            </h2>
            <div className="mt-2">
              {children}
            </div>
          </div>
        )
      
      case 'minimal-clean':
        const hexToRgbaMinimal = (hex, alpha) => {
          const r = parseInt(hex.slice(1, 3), 16)
          const g = parseInt(hex.slice(3, 5), 16)
          const b = parseInt(hex.slice(5, 7), 16)
          return `rgba(${r}, ${g}, ${b}, ${alpha})`
        }
        return (
          <div className="mb-8 pb-6 border-b-2" style={{ borderColor: hexToRgbaMinimal(colors.accent, 0.3) }}>
            <h2 className="text-xl font-light mb-4 uppercase tracking-wide" style={{ color: colors.primary }}>
              {title}
            </h2>
            <div className="mt-3">
              {children}
            </div>
          </div>
        )
      
      case 'gradient-header':
        return (
          <div className="mb-6">
            <div className="p-4 rounded-t-lg text-white mb-4" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` }}>
              <h2 className="text-2xl font-bold">{title}</h2>
            </div>
            <div className="p-4 bg-white rounded-b-lg shadow-md">
              {children}
            </div>
          </div>
        )
      
      case 'icon-accented':
        // Convert hex to rgba for background
        const hexToRgba = (hex, alpha) => {
          const r = parseInt(hex.slice(1, 3), 16)
          const g = parseInt(hex.slice(3, 5), 16)
          const b = parseInt(hex.slice(5, 7), 16)
          return `rgba(${r}, ${g}, ${b}, ${alpha})`
        }
        return (
          <div className="mb-6 p-6 rounded-lg border-2" style={{ borderColor: colors.accent, backgroundColor: hexToRgba(colors.primary, 0.1) }}>
            <div className="flex items-center gap-3 mb-4">
              {icon && <div style={{ color: colors.primary }}>{icon}</div>}
              <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
                {title}
              </h2>
            </div>
            {children}
          </div>
        )
      
      case 'timeline-vertical':
        return (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 pb-2" style={{ color: colors.primary, borderBottom: `2px solid ${colors.accent}` }}>
              {title}
            </h2>
            <div className="relative pl-6 border-l-2 border-dashed" style={{ borderColor: colors.accent }}>
              {children}
            </div>
          </div>
        )
      
      case 'boxed-contained':
        // Convert hex to rgba for background
        const hexToRgbaBox = (hex, alpha) => {
          const r = parseInt(hex.slice(1, 3), 16)
          const g = parseInt(hex.slice(3, 5), 16)
          const b = parseInt(hex.slice(5, 7), 16)
          return `rgba(${r}, ${g}, ${b}, ${alpha})`
        }
        return (
          <div className="mb-6 p-6 border-2 rounded-lg" style={{ borderColor: colors.primary, backgroundColor: hexToRgbaBox(colors.primary, 0.05) }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
              {title}
            </h2>
            {children}
          </div>
        )
      
      case 'underline-modern':
        return (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-4" style={{ color: colors.primary, borderColor: colors.accent }}>
              {title}
            </h2>
            {children}
          </div>
        )
      
      case 'badge-skills':
        return (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 pb-2" style={{ color: colors.primary, borderBottom: `3px solid ${colors.accent}` }}>
              {title}
            </h2>
            {children}
          </div>
        )
      
      case 'glass-morphism':
        const hexToRgbaGlass = (hex, alpha) => {
          const r = parseInt(hex.slice(1, 3), 16)
          const g = parseInt(hex.slice(3, 5), 16)
          const b = parseInt(hex.slice(5, 7), 16)
          return `rgba(${r}, ${g}, ${b}, ${alpha})`
        }
        return (
          <div className="mb-6 p-6 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl" 
               style={{ backgroundColor: hexToRgbaGlass(colors.primary, 0.05) }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
              {title}
            </h2>
            {children}
          </div>
        )
      
      case 'neon-accent':
        return (
          <div className="mb-6 p-6 rounded-xl border-2" style={{ borderColor: colors.accent, boxShadow: `0 0 20px ${colors.accent}40` }}>
            <h2 className="text-2xl font-bold mb-4" style={{ 
              color: colors.primary,
              textShadow: `0 0 10px ${colors.accent}60`
            }}>
              {title}
            </h2>
            {children}
          </div>
        )
      
      case 'diagonal-split':
        const hexToRgbaDiagonal = (hex, alpha) => {
          const r = parseInt(hex.slice(1, 3), 16)
          const g = parseInt(hex.slice(3, 5), 16)
          const b = parseInt(hex.slice(5, 7), 16)
          return `rgba(${r}, ${g}, ${b}, ${alpha})`
        }
        return (
          <div className="mb-6 relative overflow-hidden rounded-xl">
            <div className="absolute inset-0" style={{ 
              background: `linear-gradient(135deg, ${hexToRgbaDiagonal(colors.primary, 0.1)} 0%, ${hexToRgbaDiagonal(colors.secondary, 0.1)} 100%)`,
              clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 100%)'
            }}></div>
            <div className="relative p-6 bg-white/90">
              <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
                {title}
              </h2>
              {children}
            </div>
          </div>
        )
      
      case 'elegant-divider':
        return (
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${colors.accent}, transparent)` }}></div>
              <h2 className="text-2xl font-bold px-4" style={{ color: colors.primary }}>
                {title}
              </h2>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${colors.accent}, transparent)` }}></div>
            </div>
            {children}
          </div>
        )
      
      case 'compact-grid':
        return (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ color: colors.primary, borderColor: colors.accent }}>
              {title}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {children}
            </div>
          </div>
        )
      
      default:
        return (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 pb-2" style={{ color: colors.primary, borderBottom: `2px solid ${colors.accent}` }}>
              {title}
            </h2>
            {children}
          </div>
        )
    }
  }

  return renderSection()
}

export default SectionRenderer

