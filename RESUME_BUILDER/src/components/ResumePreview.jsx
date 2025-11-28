import { getTemplateById } from '../utils/templates'
import { getPaletteById } from '../utils/colorPalettes'
import { getFontById } from '../utils/fontsAndIcons'
import ClassicSidebar from './layouts/ClassicSidebar'
import ModernHeader from './layouts/ModernHeader'
import TwoColumnBalanced from './layouts/TwoColumnBalanced'
import MinimalistClean from './layouts/MinimalistClean'

const ResumePreview = ({ 
  resumeData, 
  templateId = 'classic-sidebar',
  colorPaletteId = 'blue-professional',
  sectionDesignId = 'card-modern',
  fontId = 'default'
}) => {
  const template = getTemplateById(templateId)
  const palette = getPaletteById(colorPaletteId)
  const font = getFontById(fontId || resumeData?.fontId || 'default')
  
  // Use selected palette colors
  const colors = {
    primary: palette.primary,
    secondary: palette.secondary,
    accent: palette.accent,
    text: palette.text,
    background: palette.background
  }

  // Route to appropriate layout component based on template layout type
  const renderLayout = () => {
    switch (template.layout) {
      case 'sidebar':
      case 'sidebar-wide':
      case 'sidebar-compact':
      case 'sidebar-minimal':
      case 'sidebar-large':
        return <ClassicSidebar resumeData={resumeData} colors={colors} sectionDesign={sectionDesignId} />
      
      case 'header':
      case 'split-header':
      case 'header-center':
        return <ModernHeader resumeData={resumeData} colors={colors} sectionDesign={sectionDesignId} />
      
      case 'two-column':
        return <TwoColumnBalanced resumeData={resumeData} colors={colors} sectionDesign={sectionDesignId} />
      
      case 'single-column':
      case 'minimal-no-photo':
        return <MinimalistClean resumeData={resumeData} colors={colors} sectionDesign={sectionDesignId} />
      
      case 'academic':
      case 'academic-detailed':
      case 'academic-pubs':
        return <MinimalistClean resumeData={resumeData} colors={colors} sectionDesign={sectionDesignId} />
      
      case 'functional':
      case 'functional-summary':
      case 'functional-keywords':
        return <MinimalistClean resumeData={resumeData} colors={colors} sectionDesign={sectionDesignId} />
      
      case 'chronological':
      case 'chronological-detailed':
      case 'timeline':
        return <ModernHeader resumeData={resumeData} colors={colors} sectionDesign={sectionDesignId} />
      
      case 'tech':
      case 'tech-grid':
      case 'tech-minimal':
        return <TwoColumnBalanced resumeData={resumeData} colors={colors} sectionDesign={sectionDesignId} />
      
      case 'combination':
      case 'combination-side':
      case 'combination-balanced':
        return <TwoColumnBalanced resumeData={resumeData} colors={colors} sectionDesign={sectionDesignId} />
      
      case 'asymmetric':
      case 'creative-bold':
      case 'portfolio':
        return <ModernHeader resumeData={resumeData} colors={colors} sectionDesign={sectionDesignId} />
      
      case 'full-width':
      case 'modern-split':
        return <ModernHeader resumeData={resumeData} colors={colors} sectionDesign={sectionDesignId} />
      
      case 'executive-top':
      case 'executive-comprehensive':
        return <ModernHeader resumeData={resumeData} colors={colors} sectionDesign={sectionDesignId} />
      
      default:
        return <ClassicSidebar resumeData={resumeData} colors={colors} sectionDesign={sectionDesignId} />
    }
  }

  return (
    <div className="resume-preview-template" style={{ fontFamily: font.value }}>
      {renderLayout()}
    </div>
  )
}

export default ResumePreview
