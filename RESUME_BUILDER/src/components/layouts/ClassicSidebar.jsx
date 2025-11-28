import SectionRenderer from '../sections/SectionRenderer'
import { FaGraduationCap, FaBriefcase, FaCode, FaProjectDiagram } from 'react-icons/fa'

const ClassicSidebar = ({ resumeData, colors, sectionDesign }) => {
  return (
    <div className="flex min-h-screen bg-white print:min-h-0">
      {/* Left Sidebar */}
      <div className="w-1/3 text-white p-6 overflow-hidden" style={{ background: `linear-gradient(to bottom, ${colors.primary}, ${colors.secondary})` }}>
        {/* Photo */}
        {resumeData.personalInfo?.photo && (
          <div className="mb-6">
            <img 
              src={resumeData.personalInfo.photo} 
              alt="Profile" 
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
            />
          </div>
        )}
        
        {/* Name */}
        <h1 className="text-2xl font-bold mb-4 text-center">
          {resumeData.personalInfo?.fullName || 'Your Name'}
        </h1>
        
        {/* Contact Info */}
        <div className="space-y-2 text-sm mb-6">
          {resumeData.personalInfo?.email && (
            <div className="break-all overflow-hidden">{resumeData.personalInfo.email}</div>
          )}
          {resumeData.personalInfo?.phone && (
            <div className="break-words overflow-hidden">{resumeData.personalInfo.phone}</div>
          )}
          {resumeData.personalInfo?.address && (
            <div className="break-words overflow-hidden">{resumeData.personalInfo.address}</div>
          )}
          {resumeData.personalInfo?.linkedin && (
            <div className="break-all overflow-hidden">{resumeData.personalInfo.linkedin}</div>
          )}
          {resumeData.personalInfo?.website && (
            <div className="break-all overflow-hidden">{resumeData.personalInfo.website}</div>
          )}
        </div>
        
        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 border-b border-white/30 pb-2">Skills</h2>
            <div className="space-y-1">
              {resumeData.skills.map((skill, index) => {
                const skillText = typeof skill === 'string' ? skill : skill.text || skill
                return (
                  <div key={index} className="text-sm text-white/90">
                    {skillText}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="w-2/3 p-8">
        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <SectionRenderer 
            title="Education" 
            design={sectionDesign}
            colors={colors}
            icon={<FaGraduationCap className="text-xl" />}
          >
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                <p className="font-medium" style={{ color: colors.primary }}>{edu.school}</p>
                <p className="text-sm text-gray-600">{edu.year} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
              </div>
            ))}
          </SectionRenderer>
        )}
        
        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <SectionRenderer 
            title="Experience" 
            design={sectionDesign}
            colors={colors}
            icon={<FaBriefcase className="text-xl" />}
          >
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3>
                <p className="font-medium" style={{ color: colors.primary }}>{exp.company} {exp.location && `• ${exp.location}`}</p>
                <p className="text-sm text-gray-600 mb-2">{exp.startDate} - {exp.endDate || 'Present'}</p>
                {exp.description && (
                  <div 
                    className="text-gray-700 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  />
                )}
              </div>
            ))}
          </SectionRenderer>
        )}
        
        {/* Projects */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <SectionRenderer 
            title="Projects" 
            design={sectionDesign}
            colors={colors}
            icon={<FaProjectDiagram className="text-xl" />}
          >
            {resumeData.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                {project.technologies && (
                  <p className="font-medium text-sm mb-1" style={{ color: colors.accent }}>{project.technologies}</p>
                )}
                {project.date && (
                  <p className="text-sm text-gray-600 mb-1">{project.date}</p>
                )}
                {project.description && (
                  <div 
                    className="text-gray-700 text-sm prose prose-sm max-w-none mb-2"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                )}
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                    style={{ color: colors.primary }}
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </SectionRenderer>
        )}
        
        {/* Custom Sections */}
        {resumeData.customSections && resumeData.customSections.length > 0 && (
          <>
            {resumeData.customSections.map((section, index) => (
              <SectionRenderer 
                key={index}
                title={section.title} 
                design={sectionDesign}
                colors={colors}
              >
                {section.content && (
                  <div 
                    className="text-gray-700 prose prose-sm max-w-none mb-3"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                )}
                {section.items && section.items.length > 0 && (
                  <div className="space-y-1">
                    {section.items.map((item, itemIndex) => {
                      const itemText = typeof item === 'string' ? item : item.text || item
                      return (
                        <div key={itemIndex} className="text-sm text-gray-700">
                          {itemText}
                        </div>
                      )
                    })}
                  </div>
                )}
              </SectionRenderer>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default ClassicSidebar

